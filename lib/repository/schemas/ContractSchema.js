"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const uuid_1 = require("uuid");
const Chain_1 = __importDefault(require("../../types/Chain"));
const Status_1 = __importDefault(require("../../types/Status"));
const blockchainSubSchema = {
    type: Object,
    schema: {
        enabled: {
            type: Boolean,
            default: false
        },
        address: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            enum: [Status_1.default.PENDING, Status_1.default.PROCESSING, Status_1.default.FAILED, Status_1.default.SUCCESS],
            default: Status_1.default.PENDING
        },
        tx: {
            type: String,
            default: ''
        }
    },
    required: true
};
const ContractSchema = new dynamoose_1.default.Schema({
    id: {
        type: String,
        default: uuid_1.v4,
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
    max: {
        type: Number,
        default: -1
    },
    chains: {
        type: Object,
        schema: {
            [Chain_1.default.ETHEREUM_MAINNET]: blockchainSubSchema,
            [Chain_1.default.ETHEREUM_RINKBY]: blockchainSubSchema,
            [Chain_1.default.ETHEREUM_GOERLI]: blockchainSubSchema,
            [Chain_1.default.ETHEREUM_SEPOLIA]: blockchainSubSchema
        }
    },
    archived: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });
exports.default = ContractSchema;
