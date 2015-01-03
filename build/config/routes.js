"use strict";

module.exports = function (router, controllers) {
  router.get("/bridge_payments/:source/:source_currency/:destination/:destination_amount/:destination_currency", controllers.bridgeQuotes.create);

  router.post("/bridge_payments/:source/:source_currency/:destination/:destination_amount/:destination_currency", controllers.bridgePayments.create);

  router.get("/bridge_payments/:id", controllers.bridgePayments.show);
};