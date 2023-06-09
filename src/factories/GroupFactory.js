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
var GroupFactory = /** @class */ (function () {
    function GroupFactory(group) {
        this.id = undefined;
        this.name = undefined;
        this.userId = undefined;
        this.contractIds = new Set();
        this.createdAt = undefined;
        this.updatedAt = undefined;
        this.id = (0, defaultTo_1["default"])(group.id, this.id);
        this.name = group.name;
        this.userId = group.userId;
        this.contractIds = (0, defaultTo_1["default"])(group.contractIds, this.contractIds);
        this.createdAt = (0, defaultTo_1["default"])(group.createdAt, this.createdAt);
        this.updatedAt = (0, defaultTo_1["default"])(group.updatedAt, this.updatedAt);
    }
    GroupFactory.prototype.validate = function () {
        if ((0, isNil_1["default"])(this.userId)) {
            throw new HttpError_1["default"]('Missing user', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
        if ((0, isNil_1["default"])(this.name)) {
            throw new HttpError_1["default"]('Missing group name', HttpStatus_1.HttpStatus.BAD_REQUEST);
        }
    };
    GroupFactory.prototype.build = function () {
        return __assign({}, this);
    };
    return GroupFactory;
}());
exports["default"] = GroupFactory;
