"use strict";
exports.__esModule = true;
var Chain_1 = require("@shared/Chain");
var Status_1 = require("@shared/Status");
var dynamoose_1 = require("dynamoose");
var uuid_1 = require("uuid");
var TokenSchema = new dynamoose_1["default"].Schema({
    id: {
        type: String,
        "default": uuid_1.v4,
        hashKey: true
    },
    userId: String,
    chain: [
        Chain_1["default"].ETHEREUM_MAINNET,
        Chain_1["default"].ETHEREUM_GOERLI,
        Chain_1["default"].ETHEREUM_RINKBY,
        Chain_1["default"].ETHEREUM_SEPOLIA
    ],
    address: String,
    amount: Number,
    status: {
        type: [Status_1["default"].PENDING, Status_1["default"].PROCESSING, Status_1["default"].FAILED, Status_1["default"].SUCCESS],
        "default": Status_1["default"].PENDING
    },
    tx: String,
    contractId: String
}, { timestamps: true });
exports["default"] = TokenSchema;
