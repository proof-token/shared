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
var defaultTo_1 = require("lodash/defaultTo");
var isNil_1 = require("lodash/isNil");
var ContractFactory = /** @class */ (function () {
    function ContractFactory(contract) {
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
        this.id = (0, defaultTo_1["default"])(contract.id, this.id);
        this.name = contract.name;
        this.symbol = contract.symbol;
        this.userId = contract.userId;
        this.uriId = contract.uriId;
        this.tokenIds = (0, defaultTo_1["default"])(contract.tokenIds, this.tokenIds);
        this.max = (0, defaultTo_1["default"])(contract.max, this.max);
        this.chains = (0, defaultTo_1["default"])(contract.chains, this.chains);
        this.archived = (0, defaultTo_1["default"])(contract.archived, this.archived);
        this.createdAt = (0, defaultTo_1["default"])(contract.createdAt, this.createdAt);
        this.updatedAt = (0, defaultTo_1["default"])(contract.updatedAt, this.updatedAt);
    }
    ContractFactory.prototype.validate = function () {
        if ((0, isNil_1["default"])(this.userId)) {
            throw new HttpError_1["default"]('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1["default"])(this.name)) {
            throw new HttpError_1["default"]('Missing contract name', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1["default"])(this.symbol)) {
            throw new HttpError_1["default"]('Missing contract symbol', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1["default"])(this.uriId)) {
            throw new HttpError_1["default"]('Missing contract uri', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    };
    ContractFactory.prototype.build = function () {
        return __assign({}, this);
    };
    return ContractFactory;
}());
exports["default"] = ContractFactory;
