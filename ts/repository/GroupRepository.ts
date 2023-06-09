import Contract from '@shared/Contract'
import Group from '@shared/Group'
import toType from '@shared/toType'
import RootRepository from './RootRepository'
import GroupModel from './models/GroupModel'

class GroupRepository extends RootRepository<typeof GroupModel> {
  constructor () {
    super(GroupModel)
  }

  public async getGroups (userId: Group['userId']) {
    return await this.db.get({ userId })
  }

  public async getGroup (userId: Group['userId'], groupId: Group['id']) {
    return await this.db.get({ userId, id: groupId! })
  }

  public async getGroupByName (userId: Group['userId'], name: Group['name']) {
    return await this.db.get({ userId, name })
  }

  public async createGroup (group: Group) {
    await this.db.create(group)
  }

  public async removeGroup (userId: Group['userId'], groupId: Group['id']) {
    const group = await this.db.get({ userId, id: groupId! })
    await this.db.delete(group)
  }

  public async addContractToGroup (
    userId: Group['userId'],
    groupId: Group['id'],
    contractId: Contract['id']
  ) {
    const group = toType<Group>(await this.db.get({ userId, id: groupId! }))
    const updatedContractIds = new Set(group.contractIds ?? new Set())
    updatedContractIds.add(contractId)
    await this.db.update(
      { userId, id: groupId },
      { contractIds: updatedContractIds }
    )
  }

  public async removeContractFromGroup (
    userId: Group['userId'],
    groupId: Group['id'],
    contractId: Contract['id']
  ) {
    const group = toType<Group>(await this.db.get({ userId, id: groupId! }))
    const updatedContractIds = new Set(group.contractIds ?? new Set())
    updatedContractIds.delete(contractId)
    await this.db.update(
      { userId, id: groupId },
      { contractIds: updatedContractIds }
    )
  }
}

export default GroupRepository
