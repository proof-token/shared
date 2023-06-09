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
var UriFactory = /** @class */ (function () {
    function UriFactory(uri) {
        this.id = undefined;
        this.uri = '';
        this.s3 = false;
        this.s3Uri = undefined;
        this.ipfs = false;
        this.ipfsUri = undefined;
        this.userId = '';
        this.contractIds = new Set();
        this.status = Status_1["default"].PENDING;
        this.id = (0, defaultTo_1["default"])(uri.id, this.id);
        this.uri = (0, defaultTo_1["default"])(uri.uri, this.uri);
        this.s3 = (0, defaultTo_1["default"])(uri.s3, this.s3);
        this.ipfs = (0, defaultTo_1["default"])(uri.ipfs, this.ipfs);
        this.userId = uri.userId;
        this.contractIds = (0, defaultTo_1["default"])(uri.contractIds, this.contractIds);
        this.status = (0, defaultTo_1["default"])(uri.status, this.status);
        this.s3Uri = (0, defaultTo_1["default"])(uri.s3Uri, this.s3Uri);
        this.ipfsUri = (0, defaultTo_1["default"])(uri.ipfsUri, this.ipfsUri);
    }
    UriFactory.prototype.validate = function () {
        var _a;
        if ((0, isNil_1["default"])(this.userId)) {
            throw new HttpError_1["default"]('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if (!((_a = this.uri) === null || _a === void 0 ? void 0 : _a.trim().length) && !this.s3 && !this.ipfs) {
            throw new HttpError_1["default"]('Should include uri, s3, or ipfs for valid Uri', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    };
    UriFactory.prototype.build = function () {
        return __assign({}, this);
    };
    return UriFactory;
}());
exports["default"] = UriFactory;
