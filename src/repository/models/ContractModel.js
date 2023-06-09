"use strict";
exports.__esModule = true;
var dynamoose_1 = require("dynamoose");
var ContractSchema_1 = require("../schemas/ContractSchema");
var ContractModel = dynamoose_1["default"].model('Contract', ContractSchema_1["default"]);
exports["default"] = ContractModel;
