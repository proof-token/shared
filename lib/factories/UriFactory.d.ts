import Uri from '../types/Uri';
declare class UriFactory {
    id: Uri['id'];
    uri: Uri['uri'];
    s3: Uri['s3'];
    s3Uri: Uri['s3Uri'];
    ipfs: Uri['ipfs'];
    ipfsUri: Uri['ipfsUri'];
    userId: Uri['userId'];
    contractIds: Uri['contractIds'];
    status: Uri['status'];
    constructor(uri: Uri);
    validate(): void;
    build(): Uri;
}
export default UriFactory;
