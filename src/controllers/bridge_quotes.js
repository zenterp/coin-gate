module.exports = function(gatewayd, models) {
  return {
    create: function(req, res, next) {
      res.status(200).send({
        success     : true,
        source      : {
          address   : req.params.source,
          currency  : req.params.source_currency
        },
        destination : {
          address   : req.params.destination,
          currency  : req.params.destination_currency,
          amount    : Number(req.params.destination_amount)
        }
      })
    }
  }
}
