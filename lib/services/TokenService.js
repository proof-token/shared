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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isNil_1 = __importDefault(require("lodash/isNil"));
const TokenFactory_1 = __importDefault(require("../factories/TokenFactory"));
const HttpError_1 = __importDefault(require("../http/HttpError"));
const HttpStatus_1 = require("../http/HttpStatus");
const ContractRepository_1 = __importDefault(require("../repository/ContractRepository"));
const TokenRepository_1 = __importDefault(require("../repository/TokenRepository"));
const toType_1 = __importDefault(require("../util/toType"));
class TokenService {
    constructor() {
        this.tokenRepository = new TokenRepository_1.default();
        this.contractRepository = new ContractRepository_1.default();
    }
    getTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the tokens from db
            const tokens = (0, toType_1.default)(yield this.tokenRepository.getTokens(userId));
            // Check if tokens exist
            if ((0, isNil_1.default)(tokens)) {
                return [];
            }
            // TokenFactory --> Token
            return tokens.map(token => new TokenFactory_1.default(token).build());
        });
    }
    getContractTokens(userId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check contract exists
            const contract = yield this.contractRepository.getContract(userId, contractId);
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Get the tokens from db
            const tokens = (0, toType_1.default)(yield this.tokenRepository.getContractTokens(userId, contractId));
            // Check if tokens exist
            if ((0, isNil_1.default)(tokens)) {
                return [];
            }
            // TokenFactory --> Token
            return tokens.map(token => new TokenFactory_1.default(token).build());
        });
    }
    getToken(userId, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get the token from db
            const token = (0, toType_1.default)(yield this.tokenRepository.getToken(userId, tokenId));
            // Check if tokens exist
            if ((0, isNil_1.default)(token)) {
                throw new HttpError_1.default('Token does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // TokenFactory --> Token
            return new TokenFactory_1.default(token).build();
        });
    }
    createToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = (0, toType_1.default)(this.contractRepository.getContract(token.userId, token.contractId));
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check if max has been exceeded
            if (contract.max !== -1) {
                if (contract.tokenIds && contract.tokenIds.size > contract.max) {
                    throw new HttpError_1.default('Contract max tokens issued: ' + contract.max, HttpStatus_1.HttpStatus.CONFLICT);
                }
            }
            // Validate token
            const newToken = new TokenFactory_1.default(token);
            newToken.validate();
            // Create token
            const savedToken = (0, toType_1.default)(yield this.tokenRepository.createToken(token));
            // Add token id to contract
            const updatedTokenIds = new Set(contract.tokenIds);
            updatedTokenIds.add(savedToken.id);
            yield this.contractRepository.addTokenToContract(token.userId, token.contractId, savedToken.id);
        });
    }
}
exports.default = TokenService;
