import ContractRepository from '../repository/ContractRepository';
import TokenRepository from '../repository/TokenRepository';
import Token from '../types/Token';
declare class TokenService {
    tokenRepository: typeof TokenRepository.prototype;
    contractRepository: typeof ContractRepository.prototype;
    getTokens(userId: Token['userId']): Promise<Token[]>;
    getContractTokens(userId: Token['userId'], contractId: Token['contractId']): Promise<Token[]>;
    getToken(userId: Token['userId'], tokenId: Token['id']): Promise<Token>;
    createToken(token: Token): Promise<void>;
}
export default TokenService;
