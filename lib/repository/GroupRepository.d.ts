import Contract from '../types/Contract';
import Group from '../types/Group';
import RootRepository from './RootRepository';
import GroupModel from './models/GroupModel';
declare class GroupRepository extends RootRepository<typeof GroupModel> {
    constructor();
    getGroups(userId: Group['userId']): Promise<import("dynamoose/dist/Item").AnyItem>;
    getGroup(userId: Group['userId'], groupId: Group['id']): Promise<import("dynamoose/dist/Item").AnyItem>;
    getGroupByName(userId: Group['userId'], name: Group['name']): Promise<import("dynamoose/dist/Item").AnyItem>;
    createGroup(group: Group): Promise<void>;
    removeGroup(userId: Group['userId'], groupId: Group['id']): Promise<void>;
    addContractToGroup(userId: Group['userId'], groupId: Group['id'], contractId: Contract['id']): Promise<void>;
    removeContractFromGroup(userId: Group['userId'], groupId: Group['id'], contractId: Contract['id']): Promise<void>;
}
export default GroupRepository;
