"use strict";
exports.__esModule = true;
var Status_1 = require("@shared/Status");
var dynamoose_1 = require("dynamoose");
var uuid_1 = require("uuid");
var UriSchema = new dynamoose_1["default"].Schema({
    id: {
        type: String,
        "default": uuid_1.v4,
        hashKey: true
    },
    uri: String,
    s3: Boolean,
    s3Uri: {
        type: String,
        required: false
    },
    ipfs: Boolean,
    ipfsUri: {
        type: String,
        required: false
    },
    userId: String,
    contractIds: {
        type: Set,
        schema: [String]
    },
    status: {
        type: [Status_1["default"].PENDING, Status_1["default"].PROCESSING, Status_1["default"].FAILED, Status_1["default"].SUCCESS],
        "default": Status_1["default"].PENDING
    }
}, { timestamps: true });
exports["default"] = UriSchema;
