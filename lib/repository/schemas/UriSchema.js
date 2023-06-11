"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const uuid_1 = require("uuid");
const Status_1 = __importDefault(require("../../types/Status"));
const UriSchema = new dynamoose_1.default.Schema({
    id: {
        type: String,
        default: uuid_1.v4,
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
        type: String,
        enum: [Status_1.default.PENDING, Status_1.default.PROCESSING, Status_1.default.FAILED, Status_1.default.SUCCESS],
        default: Status_1.default.PENDING
    }
}, { timestamps: true });
exports.default = UriSchema;
