"use strict";
exports.__esModule = true;
var dynamoose_1 = require("dynamoose");
var UriSchema_1 = require("../schemas/UriSchema");
var UriModel = dynamoose_1["default"].model('Uri', UriSchema_1["default"]);
exports["default"] = UriModel;
