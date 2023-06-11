"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const uuid_1 = require("uuid");
const GroupSchema = new dynamoose_1.default.Schema({
    id: {
        type: String,
        default: uuid_1.v4,
        hashKey: true
    },
    name: String,
    userId: String,
    contractIds: {
        type: Set,
        schema: [String]
    }
}, { timestamps: true });
exports.default = GroupSchema;
