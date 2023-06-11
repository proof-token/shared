import Chain from './Chain';
import Contract from './Contract';
import Status from './Status';
declare type Token = {
    id?: string;
    userId: string;
    chain: Chain;
    address: string;
    amount: number;
    status?: Status;
    tx?: string;
    contractId: Contract['id'];
    createdAt?: Date;
    updatedAt?: Date;
};
export default Token;
