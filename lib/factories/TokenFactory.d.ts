import Token from '../types/Token';
declare class TokenFactory {
    id: Token['id'];
    userId: Token['userId'];
    chain: Token['chain'];
    address: Token['address'];
    amount: Token['amount'];
    status: Token['status'];
    tx: Token['tx'];
    contractId: Token['contractId'];
    createdAt: Token['createdAt'];
    updatedAt: Token['updatedAt'];
    constructor(token: Token);
    validate(): void;
    build(): Token;
}
export default TokenFactory;
