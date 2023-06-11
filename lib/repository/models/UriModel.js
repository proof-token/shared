"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const UriSchema_1 = __importDefault(require("../schemas/UriSchema"));
const UriModel = dynamoose_1.default.model('Uri', UriSchema_1.default);
exports.default = UriModel;
