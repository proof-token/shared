import Group from '../types/Group';
declare class GroupFactory {
    id: Group['id'];
    name: Group['name'];
    userId: Group['userId'];
    contractIds: Group['contractIds'];
    createdAt: Group['createdAt'];
    updatedAt: Group['updatedAt'];
    constructor(group: Group);
    validate(): void;
    build(): Group;
}
export default GroupFactory;
