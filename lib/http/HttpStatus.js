"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatusCodeNumber = exports.HttpStatus = void 0;
var HttpStatus;
(function (HttpStatus) {
    HttpStatus["SUCCESS"] = "SUCCESS";
    HttpStatus["CONFLICT"] = "CONFLICT";
    HttpStatus["BAD_REQUEST"] = "BAD_REQUEST";
    HttpStatus["NOT_FOUND"] = "NOT_FOUND";
    HttpStatus["INTERNAL"] = "INTERNAL";
})(HttpStatus = exports.HttpStatus || (exports.HttpStatus = {}));
function getStatusCodeNumber(httpStatus) {
    switch (httpStatus) {
        case 'SUCCESS':
            return 200;
        case 'CONFLICT':
            return 409;
        case 'BAD_REQUEST':
            return 400;
        case 'NOT_FOUND':
            return 404;
        case 'INTERNAL':
            return 500;
        default:
            throw new Error('Status code unknown: ' + httpStatus);
    }
}
exports.getStatusCodeNumber = getStatusCodeNumber;
