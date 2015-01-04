var Worker = require('sql-mq-worker')

module.exports = function(gatewayd) {

  new Worker({
    Class : gatewayd.data.models.rippleTransactions,
    predicate: {
      where: {
        state: 'incoming'
      }
    },
    job: function(payment, next) {
      payment.getToAddress().then(function(address) {
        ExternalAccount.find(address.tag)
          .then(function(account) {
            if (!account) {
              throw new Error('destination account not found')
            }
            if (account.type === 'coinbase') {
              if (payment.to_currency === 'BTC') {
                return gatewayd.api.createExternalPayment({
                  state                : 'outgoing',
                  destination_amount   : payment.to_amount,
                  destination_currency : payment.to_currency,
                  source_currency      : 'BTC',
                  source_amount        : 'BTC',
                  destination_address  : 'coinbase:'+account.address,
                  source_address       : 'coinbase:coin-gate.com'
                })
                .then(function() {
                  return payment.updateAttributes({
                    state: 'completed'
                  })
                })
              } else {
                throw new Error('destination currency must be BTC');
              }
            } else {
              throw new Error('account type must be coinbase');
            }
          })
          .then(next)
          .error(function(error) {
            return payment.updateAttributes({
              state: 'failed',
              error: error.message
            })
            .then(next)
            .error(next)
          })
      })
    }
  }).start()

  console.log('worker started : gateway transactions from ripple')

}

