"use strict";
exports.__esModule = true;
var dynamoose_1 = require("dynamoose");
var GroupSchema_1 = require("../schemas/GroupSchema");
var GroupModel = dynamoose_1["default"].model('Group', GroupSchema_1["default"]);
exports["default"] = GroupModel;
