var express = require('express')

class BridgesRoutes {

  static draw(options) {
    var router = new express.Router()
    var routes = require(options.path || './config/routes')
    routes(router, options.controllers)
    return router
  }
}

module.exports = BridgesRoutes

