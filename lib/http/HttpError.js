"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus_1 = require("./HttpStatus");
class HttpError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = statusCode;
        this.number = (0, HttpStatus_1.getStatusCodeNumber)(statusCode);
    }
}
exports.default = HttpError;
