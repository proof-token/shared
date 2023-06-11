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
class UriFactory {
    constructor(uri) {
        this.id = undefined;
        this.uri = '';
        this.s3 = false;
        this.s3Uri = undefined;
        this.ipfs = false;
        this.ipfsUri = undefined;
        this.userId = '';
        this.contractIds = new Set();
        this.status = Status_1.default.PENDING;
        this.id = (0, defaultTo_1.default)(uri.id, this.id);
        this.uri = (0, defaultTo_1.default)(uri.uri, this.uri);
        this.s3 = (0, defaultTo_1.default)(uri.s3, this.s3);
        this.ipfs = (0, defaultTo_1.default)(uri.ipfs, this.ipfs);
        this.userId = uri.userId;
        this.contractIds = (0, defaultTo_1.default)(uri.contractIds, this.contractIds);
        this.status = (0, defaultTo_1.default)(uri.status, this.status);
        this.s3Uri = (0, defaultTo_1.default)(uri.s3Uri, this.s3Uri);
        this.ipfsUri = (0, defaultTo_1.default)(uri.ipfsUri, this.ipfsUri);
    }
    validate() {
        var _a;
        if ((0, isNil_1.default)(this.userId)) {
            throw new HttpError_1.default('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if (!((_a = this.uri) === null || _a === void 0 ? void 0 : _a.trim().length) && !this.s3 && !this.ipfs) {
            throw new HttpError_1.default('Should include uri, s3, or ipfs for valid Uri', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    }
    build() {
        return Object.assign({}, this);
    }
}
exports.default = UriFactory;
