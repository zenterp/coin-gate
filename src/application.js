var fs                 = require('fs');
var path               = require('path');
var BridgesApplication = require('bridges-application');

var gatewayd;

if (fs.existsSync(process.env.GATEWAYD_PATH)) {
  gatewayd = require(process.env.GATEWAYD_PATH);
} else {
  throw new Error('invalid path to gatewayd as GATEWAYD_PATH environment variable');
}

var application = new BridgesApplication({
  root: __dirname,
  controllers: {
    inject: [gatewayd]
  }
})

module.exports = application

