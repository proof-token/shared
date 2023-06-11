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
const ContractModel_1 = __importDefault(require("./models/ContractModel"));
class ContractRepository extends RootRepository_1.default {
    constructor() {
        super(ContractModel_1.default);
    }
    getContracts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId });
        });
    }
    getContract(userId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId, id: contractId });
        });
    }
    getContractByNameAndSymbol(userId, name, symbol) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId, name, symbol });
        });
    }
    createContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.create(contract);
        });
    }
    enableDisableChain(userId, contractId, chain, enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.update({ userId, id: contractId }, { [chain]: { enabled } });
        });
    }
    archiveActivateContract(userId, contractId, archived) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.update({ userId, id: contractId }, { archived });
        });
    }
    setContractAddress(userId, contractId, chain, address) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.update({ userId, id: contractId }, { [chain]: { address } });
        });
    }
    setContractGroup(userId, contractId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.update({ userId, id: contractId }, { groupId });
        });
    }
    setContractStatus(userId, contractId, chain, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.update({ userId, id: contractId }, { [chain]: { status } });
        });
    }
    setContractTx(userId, contractId, chain, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.update({ userId, id: contractId }, { [chain]: { tx } });
        });
    }
    addTokenToContract(userId, contractId, tokenId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const contract = (0, toType_1.default)(yield this.db.get({ userId, id: contractId }));
            const updatedTokenIds = new Set((_a = contract.tokenIds) !== null && _a !== void 0 ? _a : new Set());
            updatedTokenIds.add(tokenId);
            yield this.db.update({ userId, contractId }, { tokenIds: updatedTokenIds });
        });
    }
}
exports.default = ContractRepository;
