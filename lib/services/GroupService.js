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
const GroupFactory_1 = __importDefault(require("../factories/GroupFactory"));
const HttpError_1 = __importDefault(require("../http/HttpError"));
const HttpStatus_1 = require("../http/HttpStatus");
const ContractRepository_1 = __importDefault(require("../repository/ContractRepository"));
const GroupRepository_1 = __importDefault(require("../repository/GroupRepository"));
const toType_1 = __importDefault(require("../util/toType"));
class GroupService {
    static getGroups(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get Groups DB objects
            const groups = (0, toType_1.default)(yield this.groupRepository.getGroups(userId));
            // Check if groups exists
            if ((0, isNil_1.default)(groups)) {
                return [];
            }
            // Return GroupFactory --> Group
            return groups.map(group => new GroupFactory_1.default(group).build());
        });
    }
    static getGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get Group DB object
            const group = (0, toType_1.default)(yield this.groupRepository.getGroup(userId, groupId));
            // Check if group exists
            if ((0, isNil_1.default)(group)) {
                throw new HttpError_1.default('Could not locate group with id: ' + groupId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Return GroupFactory --> Group
            return new GroupFactory_1.default(group).build();
        });
    }
    static createGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if group exists
            const existingGroup = yield this.groupRepository.getGroupByName(group.userId, group.name);
            if (!(0, isNil_1.default)(existingGroup)) {
                throw new HttpError_1.default('Group with name: ' + group.name + ' already exists', HttpStatus_1.HttpStatus.CONFLICT);
            }
            // Create the group
            const newGroup = new GroupFactory_1.default(group);
            // Validate the group
            newGroup.validate();
            // Save the group
            yield this.groupRepository.createGroup(newGroup);
        });
    }
    static removeGroup(userId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if group exists
            const group = (0, toType_1.default)(yield this.groupRepository.getGroup(userId, groupId));
            if ((0, isNil_1.default)(group)) {
                throw new HttpError_1.default('Group does not exist, cannot delete', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check if group has associated contracts
            if (group.contractIds.size > 0) {
                throw new HttpError_1.default(`Group has ${group.contractIds.size} associated contracts, cannot delete`, HttpStatus_1.HttpStatus.CONFLICT);
            }
            // Remove the group
            yield this.groupRepository.removeGroup(userId, groupId);
        });
    }
    static addContractToGroup(userId, groupId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = yield this.contractRepository.getContract(userId, contractId);
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Cannot add contract to group, contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check if group exists
            const group = yield this.groupRepository.getGroup(userId, groupId);
            if ((0, isNil_1.default)(group)) {
                throw new HttpError_1.default('Cannot add contract to group, group does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Add Contract to group
            yield this.groupRepository.addContractToGroup(userId, groupId, contractId);
        });
    }
    static removeContractFromGroup(userId, groupId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = yield this.contractRepository.getContract(userId, contractId);
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Cannot remove contract from group, contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check if group exists
            const group = yield this.groupRepository.getGroup(userId, groupId);
            if ((0, isNil_1.default)(group)) {
                throw new HttpError_1.default('Cannot remove contract from group, group does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Add Contract to group
            yield this.groupRepository.removeContractFromGroup(userId, groupId, contractId);
        });
    }
}
GroupService.groupRepository = new GroupRepository_1.default();
GroupService.contractRepository = new ContractRepository_1.default();
exports.default = GroupService;
