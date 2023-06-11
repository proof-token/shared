import Token from '../types/Token';
import RootRepository from './RootRepository';
import TokenModel from './models/TokenModel';
declare class TokenRepository extends RootRepository<typeof TokenModel> {
    constructor();
    getTokens(userId: Token['userId']): Promise<import("dynamoose/dist/Item").AnyItem>;
    getContractTokens(userId: Token['userId'], contractId: Token['contractId']): Promise<import("dynamoose/dist/Item").AnyItem>;
    getToken(userId: Token['userId'], tokenId: Token['id']): Promise<import("dynamoose/dist/Item").AnyItem>;
    createToken(token: Token): Promise<void>;
}
export default TokenRepository;
