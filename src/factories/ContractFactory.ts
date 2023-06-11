import defaultTo from 'lodash/defaultTo'
import isNil from 'lodash/isNil'
import HttpError from '../http/HttpError'
import { HttpStatus } from '../http/HttpStatus'
import Contract from '../types/Contract'

class ContractFactory {
  id: Contract['id'] = undefined
  name: Contract['name'] = undefined as any
  symbol: Contract['symbol'] = undefined as any
  userId: Contract['userId'] = undefined as any
  uriId: Contract['uriId'] = undefined as any
  groupId: Contract['groupId'] = undefined as any
  tokenIds: Contract['tokenIds'] = new Set()
  max: Contract['max'] = -1
  chains: Contract['chains'] = {}
  archived: Contract['archived'] = false
  createdAt: Contract['createdAt'] = undefined
  updatedAt: Contract['updatedAt'] = undefined

  constructor (contract: Contract) {
    this.id = defaultTo(contract.id, this.id)
    this.name = contract.name
    this.symbol = contract.symbol
    this.userId = contract.userId
    this.uriId = contract.uriId
    this.tokenIds = defaultTo(contract.tokenIds, this.tokenIds)
    this.max = defaultTo(contract.max, this.max)
    this.chains = defaultTo(contract.chains, this.chains)
    this.archived = defaultTo(contract.archived, this.archived)
    this.createdAt = defaultTo(contract.createdAt, this.createdAt)
    this.updatedAt = defaultTo(contract.updatedAt, this.updatedAt)
  }

  public validate (): void {
    if (isNil(this.userId)) {
      throw new HttpError('Missing user', HttpStatus.BAD_REQUEST)
    }
    if (isNil(this.name)) {
      throw new HttpError('Missing contract name', HttpStatus.BAD_REQUEST)
    }
    if (isNil(this.symbol)) {
      throw new HttpError('Missing contract symbol', HttpStatus.BAD_REQUEST)
    }
    if (isNil(this.uriId)) {
      throw new HttpError('Missing contract uri', HttpStatus.BAD_REQUEST)
    }
    if (this.max === 0 || this.max < -1) {
      throw new HttpError(
        'Max must be -1 for infinite mints, or a positive integer',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  public build (): Contract {
    return { ...this }
  }
}

export default ContractFactory
