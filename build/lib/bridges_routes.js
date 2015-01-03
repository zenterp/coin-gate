"use strict";

var express = require("express");

var BridgesRoutes = function BridgesRoutes() {};

BridgesRoutes.draw = function (options) {
  var router = new express.Router();
  var routes = require(options.path || "./config/routes");
  routes(router, options.controllers);
  return router;
};

module.exports = BridgesRoutes;