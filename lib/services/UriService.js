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
const UriFactory_1 = __importDefault(require("../factories/UriFactory"));
const HttpError_1 = __importDefault(require("../http/HttpError"));
const HttpStatus_1 = require("../http/HttpStatus");
const ContractRepository_1 = __importDefault(require("../repository/ContractRepository"));
const UriRepository_1 = __importDefault(require("../repository/UriRepository"));
const toType_1 = __importDefault(require("../util/toType"));
class UriService {
    static getUris(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get all Uris from DB
            const uris = (0, toType_1.default)(yield this.uriRepository.getUris(userId));
            // Check if uris exist
            if ((0, isNil_1.default)(uris)) {
                return [];
            }
            // UriFactory --> Uri
            return uris.map(uri => new UriFactory_1.default(uri).build());
        });
    }
    static getUri(userId, uriId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Get Uri from DB
            const uri = (0, toType_1.default)(yield this.uriRepository.getUri(userId, uriId));
            // Check if uri exists
            if ((0, isNil_1.default)(uri)) {
                throw new HttpError_1.default('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // UriFactory --> Uri
            return new UriFactory_1.default(uri).build();
        });
    }
    static createUri(uri) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate the uri
            const newUri = new UriFactory_1.default(uri);
            newUri.validate();
            // Create the new Uri
            this.uriRepository.createUri(newUri.build());
        });
    }
    static removeUri(userId, uriId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check that the uri exists
            const uri = (0, toType_1.default)(yield this.uriRepository.getUri(userId, uriId));
            if ((0, isNil_1.default)(uri)) {
                throw new HttpError_1.default('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check that the uri has no associated contract ids
            if (uri.contractIds && uri.contractIds.size > 0) {
                throw new HttpError_1.default('Could not remove uri, has ' +
                    uri.contractIds.size +
                    ' associated contracts', HttpStatus_1.HttpStatus.CONFLICT);
            }
            // Remove the uri
            this.uriRepository.removeUri(userId, uriId);
        });
    }
    static addUriContractId(userId, uriId, contractId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check that uri exists
            const uri = (0, toType_1.default)(yield this.uriRepository.getUri(userId, uriId));
            if ((0, isNil_1.default)(uri)) {
                throw new HttpError_1.default('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Check that contract exists
            const contract = yield this.contractRepository.getContract(userId, contractId);
            if ((0, isNil_1.default)(contract)) {
                throw new HttpError_1.default('Could not find contract with id: ' + contractId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Update the uri to include the contract id
            this.uriRepository.addUriContractId(userId, uriId, contractId);
        });
    }
    static setUriS3Uri(userId, uriId, s3Uri) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check that uri exists
            const uri = (0, toType_1.default)(yield this.uriRepository.getUri(userId, uriId));
            if ((0, isNil_1.default)(uri)) {
                throw new HttpError_1.default('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Update the s3Uri for the uri
            yield this.uriRepository.setUriS3Uri(userId, uriId, s3Uri);
        });
    }
    static setUriIpfsUrl(userId, uriId, ipfsUri) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check that uri exists
            const uri = (0, toType_1.default)(yield this.uriRepository.getUri(userId, uriId));
            if ((0, isNil_1.default)(uri)) {
                throw new HttpError_1.default('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Update the s3Uri for the uri
            yield this.uriRepository.setUriIpfsUri(userId, uriId, ipfsUri);
        });
    }
    static setUriStatus(userId, uriId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check that uri exists
            const uri = (0, toType_1.default)(yield this.uriRepository.getUri(userId, uriId));
            if ((0, isNil_1.default)(uri)) {
                throw new HttpError_1.default('Could not find uri with id: ' + uriId, HttpStatus_1.HttpStatus.NOT_FOUND);
            }
            // Update uri status
            yield this.uriRepository.setUriStatus(userId, uriId, status);
        });
    }
}
UriService.uriRepository = new UriRepository_1.default();
UriService.contractRepository = new ContractRepository_1.default();
exports.default = UriService;
