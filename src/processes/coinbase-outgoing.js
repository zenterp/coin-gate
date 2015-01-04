var Worker = require('sql-mq-worker')

module.exports = function(gatewayd) {

  gatewayd.data.models.externalAccounts.findOrCreate({
    address : 'coin-gate.com',
    type    : 'coinbase'
  })
  .then(function(externalAccount) {

    new Worker({
      Class: gatewayd.data.models.externalTransactions,
      predicate: {
        where               : {
          deposit           : false,
          status            : 'outgoing',
          source_account_id : externalAccount.id
        }
      },
      job: function(payment, next) {
        
      }
    }).start();

    console.log('worker started : coinbase outgoing')
  })
}

