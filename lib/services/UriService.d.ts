import ContractRepository from '../repository/ContractRepository';
import UriRepository from '../repository/UriRepository';
import Contract from '../types/Contract';
import Status from '../types/Status';
import Uri from '../types/Uri';
declare class UriService {
    static uriRepository: typeof UriRepository.prototype;
    static contractRepository: typeof ContractRepository.prototype;
    static getUris(userId: Uri['userId']): Promise<Array<Uri>>;
    static getUri(userId: Uri['userId'], uriId: Uri['id']): Promise<Uri>;
    static createUri(uri: Uri): Promise<void>;
    static removeUri(userId: Uri['userId'], uriId: Uri['id']): Promise<void>;
    static addUriContractId(userId: Uri['userId'], uriId: Uri['id'], contractId: Contract['id']): Promise<void>;
    static setUriS3Uri(userId: Uri['userId'], uriId: Uri['id'], s3Uri: Uri['s3Uri']): Promise<void>;
    static setUriIpfsUrl(userId: Uri['userId'], uriId: Uri['id'], ipfsUri: Uri['ipfsUri']): Promise<void>;
    static setUriStatus(userId: Uri['userId'], uriId: Uri['id'], status: Status): Promise<void>;
}
export default UriService;
