var path               = require('path')
var BridgesApplication = require('bridges-application')
var fs                 = require('fs')
var gatewayd

if (fs.existsSync(process.env.GATEWAYD_PATH)) {
  gatewayd = require(process.env.GATEWAYD_PATH)
} else {
  throw new Error('invalid path to gatewayd as GATEWAYD_PATH environment variable')
}

var application = new BridgesApplication({
  directory   : __dirname,
  processes   : {
    inject    : [gatewayd]
  }
})

application.supervisor.start().then(function() {

  console.log('started bridges application supervisor')
})

