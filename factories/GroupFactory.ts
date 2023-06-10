import defaultTo from 'lodash/defaultTo'
import isNil from 'lodash/isNil'
import HttpError from '../http/HttpError'
import { HttpStatus } from '../http/HttpStatus'
import Group from '../types/Group'

class GroupFactory {
  id: Group['id'] = undefined
  name: Group['name'] = undefined as any
  userId: Group['userId'] = undefined as any
  contractIds: Group['contractIds'] = new Set()
  createdAt: Group['createdAt'] = undefined
  updatedAt: Group['updatedAt'] = undefined

  constructor (group: Group) {
    this.id = defaultTo(group.id, this.id)
    this.name = group.name
    this.userId = group.userId
    this.contractIds = defaultTo(group.contractIds, this.contractIds)
    this.createdAt = defaultTo(group.createdAt, this.createdAt)
    this.updatedAt = defaultTo(group.updatedAt, this.updatedAt)
  }

  public validate (): void {
    if (isNil(this.userId)) {
      throw new HttpError('Missing user', HttpStatus.BAD_REQUEST)
    }
    if (isNil(this.name)) {
      throw new HttpError('Missing group name', HttpStatus.BAD_REQUEST)
    }
  }

  public build (): Group {
    return { ...this }
  }
}

export default GroupFactory
