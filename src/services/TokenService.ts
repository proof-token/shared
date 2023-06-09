import isNil from 'lodash/isNil'
import TokenFactory from '../factories/TokenFactory'
import HttpError from '../http/HttpError'
import { HttpStatus } from '../http/HttpStatus'
import ContractRepository from '../repository/ContractRepository'
import TokenRepository from '../repository/TokenRepository'
import Contract from '../types/Contract'
import Token from '../types/Token'
import toType from '../util/toType'

class TokenService {
  tokenRepository: typeof TokenRepository.prototype = new TokenRepository()
  contractRepository: typeof ContractRepository.prototype =
    new ContractRepository()

  public async getTokens (userId: Token['userId']) {
    // Get the tokens from db
    const tokens = toType<Array<Token>>(
      await this.tokenRepository.getTokens(userId)
    )
    // Check if tokens exist
    if (isNil(tokens)) {
      return []
    }
    // TokenFactory --> Token
    return tokens.map(token => new TokenFactory(token).build())
  }

  public async getContractTokens (
    userId: Token['userId'],
    contractId: Token['contractId']
  ) {
    // Check contract exists
    const contract = await this.contractRepository.getContract(
      userId,
      contractId
    )
    if (isNil(contract)) {
      throw new HttpError('Contract does not exist', HttpStatus.NOT_FOUND)
    }
    // Get the tokens from db
    const tokens = toType<Array<Token>>(
      await this.tokenRepository.getContractTokens(userId, contractId)
    )
    // Check if tokens exist
    if (isNil(tokens)) {
      return []
    }
    // TokenFactory --> Token
    return tokens.map(token => new TokenFactory(token).build())
  }

  public async getToken (userId: Token['userId'], tokenId: Token['id']) {
    // Get the token from db
    const token = toType<Token>(
      await this.tokenRepository.getToken(userId, tokenId)
    )
    // Check if tokens exist
    if (isNil(token)) {
      throw new HttpError('Token does not exist', HttpStatus.NOT_FOUND)
    }
    // TokenFactory --> Token
    return new TokenFactory(token).build()
  }

  public async createToken (token: Token) {
    // Check if contract exists
    const contract = toType<Contract>(
      this.contractRepository.getContract(token.userId, token.contractId)
    )
    if (isNil(contract)) {
      throw new HttpError('Contract does not exist', HttpStatus.NOT_FOUND)
    }
    // Check if max has been exceeded
    if (contract.max !== -1) {
      if (contract.tokenIds && contract.tokenIds.size > contract.max) {
        throw new HttpError(
          'Contract max tokens issued: ' + contract.max,
          HttpStatus.CONFLICT
        )
      }
    }
    // Validate token
    const newToken = new TokenFactory(token)
    newToken.validate()
    // Create token
    const savedToken = toType<Token>(
      await this.tokenRepository.createToken(token)
    )
    // Add token id to contract
    const updatedTokenIds = new Set(contract.tokenIds)
    updatedTokenIds.add(savedToken.id)
    await this.contractRepository.addTokenToContract(
      token.userId,
      token.contractId,
      savedToken.id!
    )
  }
}

export default TokenService
