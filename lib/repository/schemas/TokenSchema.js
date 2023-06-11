"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const uuid_1 = require("uuid");
const Chain_1 = __importDefault(require("../../types/Chain"));
const Status_1 = __importDefault(require("../../types/Status"));
const TokenSchema = new dynamoose_1.default.Schema({
    id: {
        type: String,
        default: uuid_1.v4,
        hashKey: true
    },
    userId: String,
    chain: [
        Chain_1.default.ETHEREUM_MAINNET,
        Chain_1.default.ETHEREUM_GOERLI,
        Chain_1.default.ETHEREUM_RINKBY,
        Chain_1.default.ETHEREUM_SEPOLIA
    ],
    address: String,
    amount: Number,
    status: {
        type: [Status_1.default.PENDING, Status_1.default.PROCESSING, Status_1.default.FAILED, Status_1.default.SUCCESS],
        default: Status_1.default.PENDING
    },
    tx: String,
    contractId: String
}, { timestamps: true });
exports.default = TokenSchema;
