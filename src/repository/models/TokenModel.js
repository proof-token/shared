"use strict";
exports.__esModule = true;
var dynamoose_1 = require("dynamoose");
var TokenSchema_1 = require("../schemas/TokenSchema");
var TokenModel = dynamoose_1["default"].model('Token', TokenSchema_1["default"]);
exports["default"] = TokenModel;
