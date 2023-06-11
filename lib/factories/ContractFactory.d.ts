import Contract from '../types/Contract';
declare class ContractFactory {
    id: Contract['id'];
    name: Contract['name'];
    symbol: Contract['symbol'];
    userId: Contract['userId'];
    uriId: Contract['uriId'];
    groupId: Contract['groupId'];
    tokenIds: Contract['tokenIds'];
    max: Contract['max'];
    chains: Contract['chains'];
    archived: Contract['archived'];
    createdAt: Contract['createdAt'];
    updatedAt: Contract['updatedAt'];
    constructor(contract: Contract);
    validate(): void;
    build(): Contract;
}
export default ContractFactory;
