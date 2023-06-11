import Chain from '../types/Chain';
import Contract from '../types/Contract';
import Status from '../types/Status';
import RootRepository from './RootRepository';
import ContractModel from './models/ContractModel';
declare class ContractRepository extends RootRepository<typeof ContractModel> {
    constructor();
    getContracts(userId: Contract['userId']): Promise<import("dynamoose/dist/Item").AnyItem>;
    getContract(userId: Contract['userId'], contractId: Contract['id']): Promise<import("dynamoose/dist/Item").AnyItem>;
    getContractByNameAndSymbol(userId: Contract['userId'], name: Contract['name'], symbol: Contract['symbol']): Promise<import("dynamoose/dist/Item").AnyItem>;
    createContract(contract: Contract): Promise<import("dynamoose/dist/Item").AnyItem>;
    enableDisableChain(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, enabled: Boolean): Promise<import("dynamoose/dist/Item").AnyItem>;
    archiveActivateContract(userId: Contract['userId'], contractId: Contract['id'], archived: Contract['archived']): Promise<import("dynamoose/dist/Item").AnyItem>;
    setContractAddress(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, address: string): Promise<import("dynamoose/dist/Item").AnyItem>;
    setContractGroup(userId: Contract['userId'], contractId: Contract['id'], groupId: Contract['groupId']): Promise<import("dynamoose/dist/Item").AnyItem>;
    setContractStatus(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, status: Status): Promise<import("dynamoose/dist/Item").AnyItem>;
    setContractTx(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, tx: string): Promise<import("dynamoose/dist/Item").AnyItem>;
    addTokenToContract(userId: Contract['userId'], contractId: Contract['id'], tokenId: string): Promise<void>;
}
export default ContractRepository;
