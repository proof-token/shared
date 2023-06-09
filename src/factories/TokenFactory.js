"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var HttpError_1 = require("@shared/HttpError");
var HttpStatus_1 = require("@shared/HttpStatus");
var Status_1 = require("@shared/Status");
var defaultTo_1 = require("lodash/defaultTo");
var isNil_1 = require("lodash/isNil");
var TokenFactory = /** @class */ (function () {
    function TokenFactory(token) {
        this.id = undefined;
        this.userId = undefined;
        this.chain = undefined;
        this.address = undefined;
        this.amount = 0;
        this.status = Status_1["default"].PENDING;
        this.tx = undefined;
        this.contractId = undefined;
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.id = (0, defaultTo_1["default"])(token.id, this.id);
        this.userId = token.userId;
        this.chain = token.chain;
        this.address = token.address;
        this.status = (0, defaultTo_1["default"])(token.status, this.status);
        this.tx = (0, defaultTo_1["default"])(token.tx, this.tx);
        this.contractId = token.contractId;
        this.createdAt = (0, defaultTo_1["default"])(token.createdAt, this.createdAt);
        this.updatedAt = (0, defaultTo_1["default"])(token.updatedAt, this.updatedAt);
    }
    TokenFactory.prototype.validate = function () {
        if ((0, isNil_1["default"])(this.userId)) {
            throw new HttpError_1["default"]('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1["default"])(this.chain)) {
            throw new HttpError_1["default"]('Missing chain', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1["default"])(this.address)) {
            throw new HttpError_1["default"]('Missing address', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1["default"])(this.contractId)) {
            throw new HttpError_1["default"]('Missing contract id', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    };
    TokenFactory.prototype.build = function () {
        return __assign({}, this);
    };
    return TokenFactory;
}());
exports["default"] = TokenFactory;
