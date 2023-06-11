"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultTo_1 = __importDefault(require("lodash/defaultTo"));
const isNil_1 = __importDefault(require("lodash/isNil"));
const HttpError_1 = __importDefault(require("../http/HttpError"));
const HttpStatus_1 = require("../http/HttpStatus");
class ContractFactory {
    constructor(contract) {
        this.id = undefined;
        this.name = undefined;
        this.symbol = undefined;
        this.userId = undefined;
        this.uriId = undefined;
        this.groupId = undefined;
        this.tokenIds = new Set();
        this.max = 'infinite';
        this.chains = {};
        this.archived = false;
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.id = (0, defaultTo_1.default)(contract.id, this.id);
        this.name = contract.name;
        this.symbol = contract.symbol;
        this.userId = contract.userId;
        this.uriId = contract.uriId;
        this.tokenIds = (0, defaultTo_1.default)(contract.tokenIds, this.tokenIds);
        this.max = (0, defaultTo_1.default)(contract.max, this.max);
        this.chains = (0, defaultTo_1.default)(contract.chains, this.chains);
        this.archived = (0, defaultTo_1.default)(contract.archived, this.archived);
        this.createdAt = (0, defaultTo_1.default)(contract.createdAt, this.createdAt);
        this.updatedAt = (0, defaultTo_1.default)(contract.updatedAt, this.updatedAt);
    }
    validate() {
        if ((0, isNil_1.default)(this.userId)) {
            throw new HttpError_1.default('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1.default)(this.name)) {
            throw new HttpError_1.default('Missing contract name', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1.default)(this.symbol)) {
            throw new HttpError_1.default('Missing contract symbol', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1.default)(this.uriId)) {
            throw new HttpError_1.default('Missing contract uri', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    }
    build() {
        return Object.assign({}, this);
    }
}
exports.default = ContractFactory;
