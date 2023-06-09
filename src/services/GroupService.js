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
var GroupFactory_1 = require("@shared/GroupFactory");
var GroupRepository_1 = require("@shared/GroupRepository");
var HttpError_1 = require("@shared/HttpError");
var HttpStatus_1 = require("@shared/HttpStatus");
var toType_1 = require("@shared/toType");
var isNil_1 = require("lodash/isNil");
var GroupService = /** @class */ (function () {
    function GroupService() {
    }
    GroupService.getGroups = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var groups, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.groupRepository.getGroups(userId)];
                    case 1:
                        groups = _a.apply(void 0, [_b.sent()]);
                        // Check if groups exists
                        if ((0, isNil_1["default"])(groups)) {
                            return [2 /*return*/, []];
                        }
                        // Return GroupFactory --> Group
                        return [2 /*return*/, groups.map(function (group) { return new GroupFactory_1["default"](group).build(); })];
                }
            });
        });
    };
    GroupService.getGroup = function (userId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var group, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.groupRepository.getGroup(userId, groupId)];
                    case 1:
                        group = _a.apply(void 0, [_b.sent()]);
                        // Check if group exists
                        if ((0, isNil_1["default"])(group)) {
                            throw new HttpError_1["default"]('Could not locate group with id: ' + groupId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Return GroupFactory --> Group
                        return [2 /*return*/, new GroupFactory_1["default"](group).build()];
                }
            });
        });
    };
    GroupService.createGroup = function (group) {
        return __awaiter(this, void 0, void 0, function () {
            var existingGroup, newGroup;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.groupRepository.getGroupByName(group.userId, group.name)];
                    case 1:
                        existingGroup = _a.sent();
                        if (!(0, isNil_1["default"])(existingGroup)) {
                            throw new HttpError_1["default"]('Group with name: ' + group.name + ' already exists', HttpStatus_1.HttpStatus.CONFLICT);
                        }
                        newGroup = new GroupFactory_1["default"](group);
                        // Validate the group
                        newGroup.validate();
                        // Save the group
                        return [4 /*yield*/, this.groupRepository.createGroup(newGroup)];
                    case 2:
                        // Save the group
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupService.removeGroup = function (userId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var group, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.groupRepository.getGroup(userId, groupId)];
                    case 1:
                        group = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(group)) {
                            throw new HttpError_1["default"]('Group does not exist, cannot delete', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Check if group has associated contracts
                        if (group.contractIds.size > 0) {
                            throw new HttpError_1["default"]("Group has ".concat(group.contractIds.size, " associated contracts, cannot delete"), HttpStatus_1.HttpStatus.CONFLICT);
                        }
                        // Remove the group
                        return [4 /*yield*/, this.groupRepository.removeGroup(userId, groupId)];
                    case 2:
                        // Remove the group
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupService.addContractToGroup = function (userId, groupId, contractId) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.sent();
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Cannot add contract to group, contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.groupRepository.getGroup(userId, groupId)];
                    case 2:
                        group = _a.sent();
                        if ((0, isNil_1["default"])(group)) {
                            throw new HttpError_1["default"]('Cannot add contract to group, group does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Add Contract to group
                        return [4 /*yield*/, this.groupRepository.addContractToGroup(userId, groupId, contractId)];
                    case 3:
                        // Add Contract to group
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupService.removeContractFromGroup = function (userId, groupId, contractId) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, group;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.sent();
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Cannot remove contract from group, contract does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.groupRepository.getGroup(userId, groupId)];
                    case 2:
                        group = _a.sent();
                        if ((0, isNil_1["default"])(group)) {
                            throw new HttpError_1["default"]('Cannot remove contract from group, group does not exist', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Add Contract to group
                        return [4 /*yield*/, this.groupRepository.removeContractFromGroup(userId, groupId, contractId)];
                    case 3:
                        // Add Contract to group
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GroupService.groupRepository = new GroupRepository_1["default"]();
    GroupService.contractRepository = new ContractRepository_1["default"]();
    return GroupService;
}());
exports["default"] = GroupService;
