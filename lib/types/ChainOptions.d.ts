import Status from './Status';
declare type ChainOptions = {
    enabled: boolean;
    address: string;
    status: Status;
    tx: string;
};
export default ChainOptions;
