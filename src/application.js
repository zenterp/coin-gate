var express           = require('express');
var app               = express();
var path              = require('path');
var BridgesRoutes     = require('bridges-routes');
var BridgesController = require(path.join(__dirname, '/lib/bridges_controller'))
var gatewayd          = require('gatewayd');

/*
var controllers = BridgesController.load({
  directory: path.join(__dirname, '/controllers'),
  inject: [gatewayd]
})
*/

var controllers = {
  bridgePayments: {
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
      res.status(200).send({
        success        : true,
        bridge_payment : {
          id           : req.params.id
        }
      })
    }
  },
  bridgeQuotes: {
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

app.use('/v1', BridgesRoutes.draw({
  controllers : controllers,
  path        : path.join(__dirname, 'config/routes')
}))

app.use(function(error, req, res, next) {
  if (error) {
    res.status(500).send({ error: error.message })
  } else {
    next()
  }
})

module.exports = app

