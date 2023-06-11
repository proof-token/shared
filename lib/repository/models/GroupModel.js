"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoose_1 = __importDefault(require("dynamoose"));
const GroupSchema_1 = __importDefault(require("../schemas/GroupSchema"));
const GroupModel = dynamoose_1.default.model('Group', GroupSchema_1.default);
exports.default = GroupModel;
