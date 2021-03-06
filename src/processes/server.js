var path           = require('path')
var BridgesExpress = require('bridges-express')
var port           = process.env.PORT || 5000

module.exports = function(gatewayd) {

  var server = new BridgesExpress({
    directory: path.join(__dirname, '..'),
    controllers: {
      inject: [gatewayd]
    }
  })

  server.listen(port, function() {
    console.log('listening on port', port)
  })
}

