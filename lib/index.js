"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ContractService_1 = __importDefault(require("./services/ContractService"));
const GroupService_1 = __importDefault(require("./services/GroupService"));
const TokenService_1 = __importDefault(require("./services/TokenService"));
const UriService_1 = __importDefault(require("./services/UriService"));
exports.default = {
    ContractService: ContractService_1.default,
    GroupService: GroupService_1.default,
    TokenService: TokenService_1.default,
    UriService: UriService_1.default
};
