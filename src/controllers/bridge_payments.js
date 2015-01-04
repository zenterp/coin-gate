module.exports = function(dependencies) {
  var gatewayd = dependencies[0];

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
    },

    show: function(req, res, next) {
      gatewayd.data.models.gatewayTransactions.find({
        where: { uid: req.params.id }
      })
      .then(function(gatewayTransaction) {
        if (gatewayTransaction) {
          var json = gatewayTransaction.toJSON();
          json.id = json.uid;
          delete json.uid
          res.status(200).send({
            success        : true,
            bridge_payment : json
          })
        } else {
          next(new Error('bridge payment not found'))
        }
      })
    }
  }
}

