"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const TokenSchema_1 = __importDefault(require("../schemas/TokenSchema"));
const TokenModel = dynamoose_1.default.model('Token', TokenSchema_1.default);
exports.default = TokenModel;
