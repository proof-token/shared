import Token from '../types/Token'
import RootRepository from './RootRepository'
import TokenModel from './models/TokenModel'

class TokenRepository extends RootRepository<typeof TokenModel> {
  constructor () {
    super(TokenModel)
  }

  public async getTokens (userId: Token['userId']) {
    return await this.db.get({ userId })
  }

  public async getContractTokens (
    userId: Token['userId'],
    contractId: Token['contractId']
  ) {
    return await this.db.get({ userId, contractId: contractId! })
  }

  public async getToken (userId: Token['userId'], tokenId: Token['id']) {
    return await this.db.get({ userId, tokenId: tokenId! })
  }

  public async createToken (token: Token) {
    await this.db.create(token)
  }
}

export default TokenRepository
