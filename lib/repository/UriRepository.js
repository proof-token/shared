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
const toType_1 = __importDefault(require("../util/toType"));
const RootRepository_1 = __importDefault(require("./RootRepository"));
const UriModel_1 = __importDefault(require("./models/UriModel"));
class UriRepository extends RootRepository_1.default {
    constructor() {
        super(UriModel_1.default);
    }
    getUris(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId });
        });
    }
    getUri(userId, uriId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId, id: uriId });
        });
    }
    createUri(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.create(uri);
        });
    }
    removeUri(userId, uriId) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = yield this.db.get({ userId, id: uriId });
            yield this.db.delete(uri);
        });
    }
    addUriContractId(userId, uriId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            const uri = (0, toType_1.default)(yield this.db.get({ userId, id: uriId }));
            const contractIds = new Set(uri.contractIds);
            contractIds.add(contractId);
            yield this.db.update({ userId, id: uriId }, { contractIds });
        });
    }
    setUriS3Uri(userId, uriId, s3Uri) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update({ userId, id: uriId }, { s3Uri });
        });
    }
    setUriIpfsUri(userId, uriId, ipfsUri) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update({ userId, id: uriId }, { ipfsUri });
        });
    }
    setUriStatus(userId, uriId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.update({ userId, id: uriId }, { status });
        });
    }
}
exports.default = UriRepository;
