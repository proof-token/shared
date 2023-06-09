"use strict";
var _a;
exports.__esModule = true;
var Chain_1 = require("@shared/Chain");
var Status_1 = require("@shared/Status");
var dynamoose_1 = require("dynamoose");
var uuid_1 = require("uuid");
var blockchainSubSchema = {
    type: Object,
    schema: {
        enabled: {
            type: Boolean,
            "default": false
        },
        address: {
            type: String,
            "default": ''
        },
        status: {
            type: [Status_1["default"].PENDING, Status_1["default"].PROCESSING, Status_1["default"].FAILED, Status_1["default"].SUCCESS],
            "default": Status_1["default"].PENDING
        },
        tx: {
            type: String,
            "default": ''
        }
    },
    required: true
};
var ContractSchema = new dynamoose_1["default"].Schema({
    id: {
        type: String,
        "default": uuid_1.v4,
        hashKey: true
    },
    name: String,
    symbol: String,
    userId: String,
    uriId: String,
    groupId: String,
    tokenIds: {
        type: Set,
        schema: [String]
    },
    max: [Number, 'infinite'],
    chains: {
        type: Object,
        schema: (_a = {},
            _a[Chain_1["default"].ETHEREUM_MAINNET] = blockchainSubSchema,
            _a[Chain_1["default"].ETHEREUM_RINKBY] = blockchainSubSchema,
            _a[Chain_1["default"].ETHEREUM_GOERLI] = blockchainSubSchema,
            _a[Chain_1["default"].ETHEREUM_SEPOLIA] = blockchainSubSchema,
            _a)
    },
    archived: {
        type: Boolean,
        "default": false
    }
}, { timestamps: true });
exports["default"] = ContractSchema;
