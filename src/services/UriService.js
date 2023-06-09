"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var ContractRepository_1 = require("@shared/ContractRepository");
var HttpError_1 = require("@shared/HttpError");
var HttpStatus_1 = require("@shared/HttpStatus");
var UriFactory_1 = require("@shared/UriFactory");
var UriRepository_1 = require("@shared/UriRepository");
var toType_1 = require("@shared/toType");
var isNil_1 = require("lodash/isNil");
var UriService = /** @class */ (function () {
    function UriService() {
    }
    UriService.getUris = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var uris, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.uriRepository.getUris(userId)];
                    case 1:
                        uris = _a.apply(void 0, [_b.sent()]);
                        // Check if uris exist
                        if ((0, isNil_1["default"])(uris)) {
                            return [2 /*return*/, []];
                        }
                        // UriFactory --> Uri
                        return [2 /*return*/, uris.map(function (uri) { return new UriFactory_1["default"](uri).build(); })];
                }
            });
        });
    };
    UriService.getUri = function (userId, uriId) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.uriRepository.getUri(userId, uriId)];
                    case 1:
                        uri = _a.apply(void 0, [_b.sent()]);
                        // Check if uri exists
                        if ((0, isNil_1["default"])(uri)) {
                            throw new HttpError_1["default"]('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // UriFactory --> Uri
                        return [2 /*return*/, new UriFactory_1["default"](uri).build()];
                }
            });
        });
    };
    UriService.createUri = function (uri) {
        return __awaiter(this, void 0, void 0, function () {
            var newUri;
            return __generator(this, function (_a) {
                newUri = new UriFactory_1["default"](uri);
                newUri.validate();
                // Create the new Uri
                this.uriRepository.createUri(newUri.build());
                return [2 /*return*/];
            });
        });
    };
    UriService.removeUri = function (userId, uriId) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.uriRepository.getUri(userId, uriId)];
                    case 1:
                        uri = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(uri)) {
                            throw new HttpError_1["default"]('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Check that the uri has no associated contract ids
                        if (uri.contractIds && uri.contractIds.size > 0) {
                            throw new HttpError_1["default"]('Could not remove uri, has ' +
                                uri.contractIds.size +
                                ' associated contracts', HttpStatus_1.HttpStatus.CONFLICT);
                        }
                        // Remove the uri
                        this.uriRepository.removeUri(userId, uriId);
                        return [2 /*return*/];
                }
            });
        });
    };
    UriService.addUriContractId = function (userId, uriId, contractId) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, _a, contract;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.uriRepository.getUri(userId, uriId)];
                    case 1:
                        uri = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(uri)) {
                            throw new HttpError_1["default"]('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 2:
                        contract = _b.sent();
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Could not find contract with id: ' + contractId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Update the uri to include the contract id
                        this.uriRepository.addUriContractId(userId, uriId, contractId);
                        return [2 /*return*/];
                }
            });
        });
    };
    UriService.setUriS3Uri = function (userId, uriId, s3Uri) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.uriRepository.getUri(userId, uriId)];
                    case 1:
                        uri = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(uri)) {
                            throw new HttpError_1["default"]('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Update the s3Uri for the uri
                        return [4 /*yield*/, this.uriRepository.setUriS3Uri(userId, uriId, s3Uri)];
                    case 2:
                        // Update the s3Uri for the uri
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UriService.setUriIpfsUrl = function (userId, uriId, ipfsUri) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.uriRepository.getUri(userId, uriId)];
                    case 1:
                        uri = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(uri)) {
                            throw new HttpError_1["default"]('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Update the s3Uri for the uri
                        return [4 /*yield*/, this.uriRepository.setUriIpfsUri(userId, uriId, ipfsUri)];
                    case 2:
                        // Update the s3Uri for the uri
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UriService.setUriStatus = function (userId, uriId, status) {
        return __awaiter(this, void 0, void 0, function () {
            var uri, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.uriRepository.getUri(userId, uriId)];
                    case 1:
                        uri = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(uri)) {
                            throw new HttpError_1["default"]('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Update uri status
                        return [4 /*yield*/, this.uriRepository.setUriStatus(userId, uriId, status)];
                    case 2:
                        // Update uri status
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UriService.uriRepository = new UriRepository_1["default"]();
    UriService.contractRepository = new ContractRepository_1["default"]();
    return UriService;
}());
exports["default"] = UriService;
