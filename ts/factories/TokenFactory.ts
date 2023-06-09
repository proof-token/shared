import HttpError from '@shared/HttpError'
import { HttpStatus } from '@shared/HttpStatus'
import Status from '@shared/Status'
import Token from '@shared/Token'
import defaultTo from 'lodash/defaultTo'
import isNil from 'lodash/isNil'

class TokenFactory {
  id: Token['id'] = undefined
  userId: Token['userId'] = undefined as any
  chain: Token['chain'] = undefined as any
  address: Token['address'] = undefined as any
  amount: Token['amount'] = 0
  status: Token['status'] = Status.PENDING
  tx: Token['tx'] = undefined
  contractId: Token['contractId'] = undefined
  createdAt: Token['createdAt'] = undefined
  updatedAt: Token['updatedAt'] = undefined

  constructor (token: Token) {
    this.id = defaultTo(token.id, this.id)
    this.userId = token.userId
    this.chain = token.chain
    this.address = token.address
    this.status = defaultTo(token.status, this.status)
    this.tx = defaultTo(token.tx, this.tx)
    this.contractId = token.contractId
    this.createdAt = defaultTo(token.createdAt, this.createdAt)
    this.updatedAt = defaultTo(token.updatedAt, this.updatedAt)
  }

  public validate (): void {
    if (isNil(this.userId)) {
      throw new HttpError('Missing user', HttpStatus.BAD_REQUEST)
    }
    if (isNil(this.chain)) {
      throw new HttpError('Missing chain', HttpStatus.BAD_REQUEST)
    }
    if (isNil(this.address)) {
      throw new HttpError('Missing address', HttpStatus.BAD_REQUEST)
    }
    if (isNil(this.contractId)) {
      throw new HttpError('Missing contract id', HttpStatus.BAD_REQUEST)
    }
  }

  public build (): Token {
    return { ...this }
  }
}

export default TokenFactory
