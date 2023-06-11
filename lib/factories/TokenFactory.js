"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultTo_1 = __importDefault(require("lodash/defaultTo"));
const isNil_1 = __importDefault(require("lodash/isNil"));
const HttpError_1 = __importDefault(require("../http/HttpError"));
const HttpStatus_1 = require("../http/HttpStatus");
const Status_1 = __importDefault(require("../types/Status"));
class TokenFactory {
    constructor(token) {
        this.id = undefined;
        this.userId = undefined;
        this.chain = undefined;
        this.address = undefined;
        this.amount = 0;
        this.status = Status_1.default.PENDING;
        this.tx = undefined;
        this.contractId = undefined;
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.id = (0, defaultTo_1.default)(token.id, this.id);
        this.userId = token.userId;
        this.chain = token.chain;
        this.address = token.address;
        this.status = (0, defaultTo_1.default)(token.status, this.status);
        this.tx = (0, defaultTo_1.default)(token.tx, this.tx);
        this.contractId = token.contractId;
        this.createdAt = (0, defaultTo_1.default)(token.createdAt, this.createdAt);
        this.updatedAt = (0, defaultTo_1.default)(token.updatedAt, this.updatedAt);
    }
    validate() {
        if ((0, isNil_1.default)(this.userId)) {
            throw new HttpError_1.default('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1.default)(this.chain)) {
            throw new HttpError_1.default('Missing chain', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1.default)(this.address)) {
            throw new HttpError_1.default('Missing address', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1.default)(this.contractId)) {
            throw new HttpError_1.default('Missing contract id', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    }
    build() {
        return Object.assign({}, this);
    }
}
exports.default = TokenFactory;
