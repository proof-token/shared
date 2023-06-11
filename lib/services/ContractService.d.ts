import ContractRepository from '../repository/ContractRepository';
import GroupRepository from '../repository/GroupRepository';
import TokenRepository from '../repository/TokenRepository';
import UriRepository from '../repository/UriRepository';
import Chain from '../types/Chain';
import Contract from '../types/Contract';
import Status from '../types/Status';
declare class ContractService {
    static contractRepository: typeof ContractRepository.prototype;
    static groupRepository: typeof GroupRepository.prototype;
    static uriRepository: typeof UriRepository.prototype;
    static tokenRepository: typeof TokenRepository.prototype;
    static getContracts(userId: Contract['userId']): Promise<Array<Contract>>;
    static getContract(userId: Contract['userId'], contractId: Contract['id']): Promise<Contract>;
    static createContract(contract: Contract): Promise<void>;
    static enableDisableChain(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, enabled: Boolean): Promise<void>;
    static archiveActivateContract(userId: Contract['userId'], contractId: Contract['id'], archived: Contract['archived']): Promise<void>;
    static setContractAddress(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, address: string): Promise<void>;
    static setContractGroup(userId: Contract['userId'], contractId: Contract['id'], groupId: Contract['groupId']): Promise<void>;
    static setContractStatus(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, status: Status): Promise<void>;
    static setContractTx(userId: Contract['userId'], contractId: Contract['id'], chain: Chain, tx: string): Promise<void>;
    static addTokenToContract(userId: Contract['userId'], contractId: Contract['id'], tokenId: string): Promise<void>;
}
export default ContractService;
