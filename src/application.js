var fs                = require('fs');
var express           = require('express');
var app               = express();
var path              = require('path');
var BridgesRoutes     = require('bridges-routes');
var BridgesController = require('bridges-controller');
var gatewayd;

if (fs.existsSync(process.env.GATEWAYD_PATH)) {
  gatewayd = require(process.env.GATEWAYD_PATH);
} else {
  throw new Error('invalid path to gatewayd as GATEWAYD_PATH environment variable');
}

var controllers = BridgesController.load({
  directory : path.join(__dirname, '/controllers'),
  inject    : [gatewayd]
})

app.use('/v1', BridgesRoutes.draw({
  controllers : controllers,
  path        : path.join(__dirname, 'config/routes')
}))

app.use(function(error, req, res, next) {
  if (error) {
    res.status(500).send({
      success: false,
      error  : error.message
    })
  } else {
    next()
  }
})

module.exports = app

