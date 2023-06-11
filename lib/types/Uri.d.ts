import Contract from './Contract';
import Status from './Status';
type Uri = {
    id?: string;
    uri?: string;
    s3: boolean;
    s3Uri?: string;
    ipfs: boolean;
    ipfsUri?: string;
    userId: string;
    contractIds?: Set<Contract['id']>;
    status?: Status;
};
export default Uri;
