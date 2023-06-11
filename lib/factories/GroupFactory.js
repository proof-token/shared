"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const defaultTo_1 = __importDefault(require("lodash/defaultTo"));
const isNil_1 = __importDefault(require("lodash/isNil"));
const HttpError_1 = __importDefault(require("../http/HttpError"));
const HttpStatus_1 = require("../http/HttpStatus");
class GroupFactory {
    constructor(group) {
        this.id = undefined;
        this.name = undefined;
        this.userId = undefined;
        this.contractIds = new Set();
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.id = (0, defaultTo_1.default)(group.id, this.id);
        this.name = group.name;
        this.userId = group.userId;
        this.contractIds = (0, defaultTo_1.default)(group.contractIds, this.contractIds);
        this.createdAt = (0, defaultTo_1.default)(group.createdAt, this.createdAt);
        this.updatedAt = (0, defaultTo_1.default)(group.updatedAt, this.updatedAt);
    }
    validate() {
        if ((0, isNil_1.default)(this.userId)) {
            throw new HttpError_1.default('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1.default)(this.name)) {
            throw new HttpError_1.default('Missing group name', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    }
    build() {
        return Object.assign({}, this);
    }
}
exports.default = GroupFactory;
