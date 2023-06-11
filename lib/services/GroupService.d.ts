import ContractRepository from '../repository/ContractRepository';
import GroupRepository from '../repository/GroupRepository';
import Contract from '../types/Contract';
import Group from '../types/Group';
declare class GroupService {
    static groupRepository: typeof GroupRepository.prototype;
    static contractRepository: typeof ContractRepository.prototype;
    static getGroups(userId: Group['userId']): Promise<Array<Group>>;
    static getGroup(userId: Group['userId'], groupId: Group['id']): Promise<Group>;
    static createGroup(group: Group): Promise<void>;
    static removeGroup(userId: Group['userId'], groupId: Group['id']): Promise<void>;
    static addContractToGroup(userId: Group['userId'], groupId: Group['id'], contractId: Contract['id']): Promise<void>;
    static removeContractFromGroup(userId: Group['userId'], groupId: Group['id'], contractId: Contract['id']): Promise<void>;
}
export default GroupService;
