"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const ContractSchema_1 = __importDefault(require("../schemas/ContractSchema"));
const ContractModel = dynamoose_1.default.model('Contract', ContractSchema_1.default);
exports.default = ContractModel;
