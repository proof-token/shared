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
const RootRepository_1 = __importDefault(require("./RootRepository"));
const TokenModel_1 = __importDefault(require("./models/TokenModel"));
class TokenRepository extends RootRepository_1.default {
    constructor() {
        super(TokenModel_1.default);
    }
    getTokens(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId });
        });
    }
    getContractTokens(userId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId, contractId: contractId });
        });
    }
    getToken(userId, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId, tokenId: tokenId });
        });
    }
    createToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.create(token);
        });
    }
}
exports.default = TokenRepository;
