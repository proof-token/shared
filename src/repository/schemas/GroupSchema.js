"use strict";
exports.__esModule = true;
var dynamoose_1 = require("dynamoose");
var uuid_1 = require("uuid");
var GroupSchema = new dynamoose_1["default"].Schema({
    id: {
        type: String,
        "default": uuid_1.v4,
        hashKey: true
    },
    name: String,
    userId: String,
    contractIds: {
        type: Set,
        schema: [String]
    }
}, { timestamps: true });
exports["default"] = GroupSchema;
