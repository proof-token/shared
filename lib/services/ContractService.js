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
const ContractFactory_1 = __importDefault(require("../factories/ContractFactory"));
const HttpError_1 = __importDefault(require("../http/HttpError"));
const HttpStatus_1 = require("../http/HttpStatus");
const ContractRepository_1 = __importDefault(require("../repository/ContractRepository"));
const GroupRepository_1 = __importDefault(require("../repository/GroupRepository"));
const TokenRepository_1 = __importDefault(require("../repository/TokenRepository"));
const UriRepository_1 = __importDefault(require("../repository/UriRepository"));
const toType_1 = __importDefault(require("../util/toType"));
class ContractService {
    static getContracts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get Contracts DB Objects
            const contracts = (0, toType_1.default)(yield this.contractRepository.getContracts(userId));
            // Check if contracts exists
            if ((0, isNil_1.default)(contracts)) {
                return [];
            }
            // Create ContractFactory -> Contract
            return contracts.map(contract => new ContractFactory_1.default(contract).build());
        });
    }
    static getContract(userId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get Contract DB Object
            const contract = (0, toType_1.default)(yield this.contractRepository.getContract(userId, contractId));
            // Check if contract exists
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Could not find contract with id: ' + contractId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Create ContractFactory -> Contract
            return new ContractFactory_1.default(contract).build();
        });
    }
    static createContract(contract) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const existingContract = (0, toType_1.default)(yield this.contractRepository.getContractByNameAndSymbol(contract.userId, contract.name, contract.symbol));
            if (!(0, isNil_1.default)(existingContract)) {
                throw new HttpError_1.default('Contract with name: ' +
                    existingContract.name +
                    ' and symbol: ' +
                    existingContract.symbol +
                    ' already exists', HttpStatus_1.HttpStatus.CONFLICT);
            }
            // Check if group exists
            const group = this.groupRepository.getGroup(contract.userId, contract.groupId);
            if ((0, isNil_1.default)(group)) {
                throw new HttpError_1.default('Nonexistent group, please assign a valid group', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check if uri exists
            const uri = this.uriRepository.getUri(contract.userId, contract.uriId);
            if ((0, isNil_1.default)(uri)) {
                throw new HttpError_1.default('Nonexistent uri, please assign a valid uri', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Create ContractFactory -> Contract
            const newContract = new ContractFactory_1.default(contract);
            // Check if Contract is valid
            newContract.validate();
            // Save the Contract
            const savedContract = new ContractFactory_1.default((0, toType_1.default)(yield this.contractRepository.createContract(newContract.build()))).build();
            // Add the Contract to group
            yield this.groupRepository.addContractToGroup(newContract.userId, newContract.groupId, savedContract.id);
            // Add the Contract to uri
            yield this.uriRepository.addUriContractId(newContract.userId, newContract.uriId, savedContract.id);
        });
    }
    static enableDisableChain(userId, contractId, chain, enabled) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = (0, toType_1.default)(yield this.contractRepository.getContract(userId, contractId));
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Nonexistent contract, cannot enable / disable chain', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Enable or Disable the chain for Contract
            yield this.contractRepository.enableDisableChain(userId, contractId, chain, enabled);
        });
    }
    static archiveActivateContract(userId, contractId, archived) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = (0, toType_1.default)(yield this.contractRepository.getContract(userId, contractId));
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Nonexistent contract, cannot archive / activate', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Archive or Activate a Contract
            yield this.contractRepository.archiveActivateContract(userId, contractId, archived);
        });
    }
    static setContractAddress(userId, contractId, chain, address) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = (0, toType_1.default)(yield this.contractRepository.getContract(userId, contractId));
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Nonexistent contract, cannot set contract address', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Set the Contract Address
            yield this.contractRepository.setContractAddress(userId, contractId, chain, address);
        });
    }
    static setContractGroup(userId, contractId, groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = (0, toType_1.default)(yield this.contractRepository.getContract(userId, contractId));
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Nonexistent contract, cannot set group', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Set the Contract Group
            yield this.contractRepository.setContractGroup(userId, contractId, groupId);
            // Update the group record
            if (contract.groupId) {
                yield this.groupRepository.removeContractFromGroup(userId, groupId, contractId);
            }
            yield this.groupRepository.addContractToGroup(userId, groupId, contractId);
        });
    }
    static setContractStatus(userId, contractId, chain, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = yield this.contractRepository.getContract(userId, contractId);
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Nonexistent contract, cannot set status', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Set the Contract Status
            yield this.contractRepository.setContractStatus(userId, contractId, chain, status);
        });
    }
    static setContractTx(userId, contractId, chain, tx) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = yield this.contractRepository.getContract(userId, contractId);
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Nonexistent contract, cannot set tx', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Set the Contract tx
            yield this.contractRepository.setContractTx(userId, contractId, chain, tx);
        });
    }
    static addTokenToContract(userId, contractId, tokenId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if contract exists
            const contract = yield this.contractRepository.getContract(userId, contractId);
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Nonexistent contract, cannot add to contract', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check if token exists
            const token = yield this.tokenRepository.getToken(userId, tokenId);
            if ((0, isNil_1.default)(token)) {
                throw new HttpError_1.default('Nonexistent token, cannot add to contract', HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Add token to contract
            yield this.contractRepository.addTokenToContract(userId, contractId, tokenId);
        });
    }
}
ContractService.contractRepository = new ContractRepository_1.default();
ContractService.groupRepository = new GroupRepository_1.default();
ContractService.uriRepository = new UriRepository_1.default();
ContractService.tokenRepository = new TokenRepository_1.default();
exports.default = ContractService;
