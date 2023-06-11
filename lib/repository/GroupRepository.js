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
const GroupModel_1 = __importDefault(require("./models/GroupModel"));
class GroupRepository extends RootRepository_1.default {
    constructor() {
        super(GroupModel_1.default);
    }
    getGroups(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId });
        });
    }
    getGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId, id: groupId });
        });
    }
    getGroupByName(userId, name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.get({ userId, name });
        });
    }
    createGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.create(group);
        });
    }
    removeGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            const group = yield this.db.get({ userId, id: groupId });
            yield this.db.delete(group);
        });
    }
    addContractToGroup(userId, groupId, contractId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const group = (0, toType_1.default)(yield this.db.get({ userId, id: groupId }));
            const updatedContractIds = new Set((_a = group.contractIds) !== null && _a !== void 0 ? _a : new Set());
            updatedContractIds.add(contractId);
            yield this.db.update({ userId, id: groupId }, { contractIds: updatedContractIds });
        });
    }
    removeContractFromGroup(userId, groupId, contractId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const group = (0, toType_1.default)(yield this.db.get({ userId, id: groupId }));
            const updatedContractIds = new Set((_a = group.contractIds) !== null && _a !== void 0 ? _a : new Set());
            updatedContractIds.delete(contractId);
            yield this.db.update({ userId, id: groupId }, { contractIds: updatedContractIds });
        });
    }
}
exports.default = GroupRepository;
