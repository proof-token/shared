import { AnyItem } from 'dynamoose/dist/Item';
declare class RootRepository<M extends AnyItem> {
    db: M;
    constructor(model: M);
}
export default RootRepository;
