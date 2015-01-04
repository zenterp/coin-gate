module.exports = function(gatewayd, models) {
  return {
    create: function(req, res, next) {
      var gatewayTransactionParams = {
        direction: 'from-ripple',
        state    : 'invoice',
        ripple: {
          source_address       : req.params.source.split(':')[1],
          source_currency      : req.params.source_currency,
          source_amount        : req.params.destination_amount,
          destination_currency : req.params.destination_currency,
          destination_amount   : req.params.destination_amount
        },
        external: {
          source_address       : 'coinbase:coin-gate.com',
          source_amount        : Number(req.params.destination_amount),
          source_currency      : req.params.destination_currency,
          destination_address  : req.params.destination,
          destination_amount   : Number(req.params.destination_amount),
          destination_currency : req.params.destination_currency
        }
      }
      res.status(200).send({
        success     : true,
        quote       : gatewayTransactionParams
      })
    }
  }
}
