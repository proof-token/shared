import Status from '../types/Status';
import Uri from '../types/Uri';
import RootRepository from './RootRepository';
import UriModel from './models/UriModel';
declare class UriRepository extends RootRepository<typeof UriModel> {
    constructor();
    getUris(userId: Uri['userId']): Promise<import("dynamoose/dist/Item").AnyItem>;
    getUri(userId: Uri['userId'], uriId: Uri['id']): Promise<import("dynamoose/dist/Item").AnyItem>;
    createUri(uri: Uri): Promise<void>;
    removeUri(userId: Uri['userId'], uriId: Uri['id']): Promise<void>;
    addUriContractId(userId: Uri['userId'], uriId: Uri['id'], contractId: string): Promise<void>;
    setUriS3Uri(userId: Uri['userId'], uriId: Uri['id'], s3Uri: Uri['s3Uri']): Promise<void>;
    setUriIpfsUri(userId: Uri['userId'], uriId: Uri['id'], ipfsUri: Uri['ipfsUri']): Promise<void>;
    setUriStatus(userId: Uri['userId'], uriId: Uri['id'], status: Status): Promise<void>;
}
export default UriRepository;
