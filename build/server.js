"use strict";

var path = require("path");
var app = require(path.join(__dirname, "application"));

var port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("listening on port", port);
});