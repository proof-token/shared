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
var TokenFactory_1 = require("@shared/TokenFactory");
var TokenRepository_1 = require("@shared/TokenRepository");
var toType_1 = require("@shared/toType");
var isNil_1 = require("lodash/isNil");
var TokenService = /** @class */ (function () {
    function TokenService() {
        this.tokenRepository = new TokenRepository_1["default"]();
        this.contractRepository = new ContractRepository_1["default"]();
    }
    TokenService.prototype.getTokens = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var tokens, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.tokenRepository.getTokens(userId)];
                    case 1:
                        tokens = _a.apply(void 0, [_b.sent()]);
                        // Check if tokens exist
                        if ((0, isNil_1["default"])(tokens)) {
                            return [2 /*return*/, []];
                        }
                        // TokenFactory --> Token
                        return [2 /*return*/, tokens.map(function (token) { return new TokenFactory_1["default"](token).build(); })];
                }
            });
        });
    };
    TokenService.prototype.getContractTokens = function (userId, contractId) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, tokens, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _b.sent();
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.tokenRepository.getContractTokens(userId, contractId)];
                    case 2:
                        tokens = _a.apply(void 0, [_b.sent()]);
                        // Check if tokens exist
                        if ((0, isNil_1["default"])(tokens)) {
                            return [2 /*return*/, []];
                        }
                        // TokenFactory --> Token
                        return [2 /*return*/, tokens.map(function (token) { return new TokenFactory_1["default"](token).build(); })];
                }
            });
        });
    };
    TokenService.prototype.getToken = function (userId, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.tokenRepository.getToken(userId, tokenId)];
                    case 1:
                        token = _a.apply(void 0, [_b.sent()]);
                        // Check if tokens exist
                        if ((0, isNil_1["default"])(token)) {
                            throw new HttpError_1["default"]('Token does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // TokenFactory --> Token
                        return [2 /*return*/, new TokenFactory_1["default"](token).build()];
                }
            });
        });
    };
    TokenService.prototype.createToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, newToken, savedToken, _a, updatedTokenIds;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        contract = (0, toType_1["default"])(this.contractRepository.getContract(token.userId, token.contractId));
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Check if max has been exceeded
                        if (contract.max !== 'infinite') {
                            if (contract.tokenIds && contract.tokenIds.size > contract.max) {
                                throw new HttpError_1["default"]('Contract max tokens issued: ' + contract.max, HttpStatus_1.HttpStatus.CONFLICT);
                            }
                        }
                        newToken = new TokenFactory_1["default"](token);
                        newToken.validate();
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.tokenRepository.createToken(token)];
                    case 1:
                        savedToken = _a.apply(void 0, [_b.sent()]);
                        updatedTokenIds = new Set(contract.tokenIds);
                        updatedTokenIds.add(savedToken.id);
                        return [4 /*yield*/, this.contractRepository.addTokenToContract(token.userId, token.contractId, savedToken.id)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TokenService;
}());
exports["default"] = TokenService;
