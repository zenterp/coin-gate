var path = require('path')

module.exports = function(gatewayd) {

  var incomingProcess = require(path.join(process.env.GATEWAYD_PATH, 'processes/incoming'))
  incomingProcess(gatewayd)
}

