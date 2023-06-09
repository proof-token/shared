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
var ContractFactory_1 = require("@shared/ContractFactory");
var ContractRepository_1 = require("@shared/ContractRepository");
var GroupRepository_1 = require("@shared/GroupRepository");
var HttpError_1 = require("@shared/HttpError");
var HttpStatus_1 = require("@shared/HttpStatus");
var TokenRepository_1 = require("@shared/TokenRepository");
var UriRepository_1 = require("@shared/UriRepository");
var isNil_1 = require("lodash/isNil");
var toType_1 = require("../util/toType");
var ContractService = /** @class */ (function () {
    function ContractService() {
    }
    ContractService.getContracts = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var contracts, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.getContracts(userId)];
                    case 1:
                        contracts = _a.apply(void 0, [_b.sent()]);
                        // Check if contracts exists
                        if ((0, isNil_1["default"])(contracts)) {
                            return [2 /*return*/, []];
                        }
                        // Create ContractFactory -> Contract
                        return [2 /*return*/, contracts.map(function (contract) { return new ContractFactory_1["default"](contract).build(); })];
                }
            });
        });
    };
    ContractService.getContract = function (userId, contractId) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.apply(void 0, [_b.sent()]);
                        // Check if contract exists
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Could not find contract with id: ' + contractId, HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Create ContractFactory -> Contract
                        return [2 /*return*/, new ContractFactory_1["default"](contract).build()];
                }
            });
        });
    };
    ContractService.createContract = function (contract) {
        return __awaiter(this, void 0, void 0, function () {
            var existingContract, _a, group, uri, newContract, savedContract, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.getContractByNameAndSymbol(contract.userId, contract.name, contract.symbol)];
                    case 1:
                        existingContract = _a.apply(void 0, [_d.sent()]);
                        if (!(0, isNil_1["default"])(existingContract)) {
                            throw new HttpError_1["default"]('Contract with name: ' +
                                existingContract.name +
                                ' and symbol: ' +
                                existingContract.symbol +
                                ' already exists', HttpStatus_1.HttpStatus.CONFLICT);
                        }
                        group = this.groupRepository.getGroup(contract.userId, contract.groupId);
                        if ((0, isNil_1["default"])(group)) {
                            throw new HttpError_1["default"]('Nonexistent group, please assign a valid group', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        uri = this.uriRepository.getUri(contract.userId, contract.uriId);
                        if ((0, isNil_1["default"])(uri)) {
                            throw new HttpError_1["default"]('Nonexistent uri, please assign a valid uri', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        newContract = new ContractFactory_1["default"](contract);
                        // Check if Contract is valid
                        newContract.validate();
                        _b = ContractFactory_1["default"].bind;
                        _c = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.createContract(newContract.build())];
                    case 2:
                        savedContract = new (_b.apply(ContractFactory_1["default"], [void 0, _c.apply(void 0, [_d.sent()])]))().build();
                        // Add the Contract to group
                        return [4 /*yield*/, this.groupRepository.addContractToGroup(newContract.userId, newContract.groupId, savedContract.id)
                            // Add the Contract to uri
                        ];
                    case 3:
                        // Add the Contract to group
                        _d.sent();
                        // Add the Contract to uri
                        return [4 /*yield*/, this.uriRepository.addUriContractId(newContract.userId, newContract.uriId, savedContract.id)];
                    case 4:
                        // Add the Contract to uri
                        _d.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.enableDisableChain = function (userId, contractId, chain, enabled) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Nonexistent contract, cannot enable / disable chain', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Enable or Disable the chain for Contract
                        return [4 /*yield*/, this.contractRepository.enableDisableChain(userId, contractId, chain, enabled)];
                    case 2:
                        // Enable or Disable the chain for Contract
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.archiveActivateContract = function (userId, contractId, archived) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Nonexistent contract, cannot archive / activate', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Archive or Activate a Contract
                        return [4 /*yield*/, this.contractRepository.archiveActivateContract(userId, contractId, archived)];
                    case 2:
                        // Archive or Activate a Contract
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.setContractAddress = function (userId, contractId, chain, address) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Nonexistent contract, cannot set contract address', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Set the Contract Address
                        return [4 /*yield*/, this.contractRepository.setContractAddress(userId, contractId, chain, address)];
                    case 2:
                        // Set the Contract Address
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.setContractGroup = function (userId, contractId, groupId) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = toType_1["default"];
                        return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.apply(void 0, [_b.sent()]);
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Nonexistent contract, cannot set group', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Set the Contract Group
                        return [4 /*yield*/, this.contractRepository.setContractGroup(userId, contractId, groupId)
                            // Update the group record
                        ];
                    case 2:
                        // Set the Contract Group
                        _b.sent();
                        if (!contract.groupId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.groupRepository.removeContractFromGroup(userId, groupId, contractId)];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4: return [4 /*yield*/, this.groupRepository.addContractToGroup(userId, groupId, contractId)];
                    case 5:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.setContractStatus = function (userId, contractId, chain, status) {
        return __awaiter(this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.sent();
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Nonexistent contract, cannot set status', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Set the Contract Status
                        return [4 /*yield*/, this.contractRepository.setContractStatus(userId, contractId, chain, status)];
                    case 2:
                        // Set the Contract Status
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.setContractTx = function (userId, contractId, chain, tx) {
        return __awaiter(this, void 0, void 0, function () {
            var contract;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.sent();
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Nonexistent contract, cannot set tx', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Set the Contract tx
                        return [4 /*yield*/, this.contractRepository.setContractTx(userId, contractId, chain, tx)];
                    case 2:
                        // Set the Contract tx
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.addTokenToContract = function (userId, contractId, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var contract, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.contractRepository.getContract(userId, contractId)];
                    case 1:
                        contract = _a.sent();
                        if ((0, isNil_1["default"])(contract)) {
                            throw new HttpError_1["default"]('Nonexistent contract, cannot add to contract', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.tokenRepository.getToken(userId, tokenId)];
                    case 2:
                        token = _a.sent();
                        if ((0, isNil_1["default"])(token)) {
                            throw new HttpError_1["default"]('Nonexistent token, cannot add to contract', HttpStatus_1.HttpStatus.NOT_FOUND);
                        }
                        // Add token to contract
                        return [4 /*yield*/, this.contractRepository.addTokenToContract(userId, contractId, tokenId)];
                    case 3:
                        // Add token to contract
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    ContractService.contractRepository = new ContractRepository_1["default"]();
    ContractService.groupRepository = new GroupRepository_1["default"]();
    ContractService.uriRepository = new UriRepository_1["default"]();
    ContractService.tokenRepository = new TokenRepository_1["default"]();
    return ContractService;
}());
exports["default"] = ContractService;
