import Contract from './Contract';
declare type Group = {
    id?: string;
    name: string;
    userId: string;
    contractIds: Set<Contract['id']>;
    createdAt?: Date;
    updatedAt?: Date;
};
export default Group;
