import isNil from 'lodash/isNil'
import GroupFactory from '../factories/GroupFactory'
import HttpError from '../http/HttpError'
import { HttpStatus } from '../http/HttpStatus'
import ContractRepository from '../repository/ContractRepository'
import GroupRepository from '../repository/GroupRepository'
import Contract from '../types/Contract'
import Group from '../types/Group'
import toType from '../util/toType'

class GroupService {
  static groupRepository: typeof GroupRepository.prototype =
    new GroupRepository()
  static contractRepository: typeof ContractRepository.prototype =
    new ContractRepository()

  public static async getGroups (
    userId: Group['userId']
  ): Promise<Array<Group>> {
    // Get Groups DB objects
    const groups = toType<Array<Group>>(
      await this.groupRepository.getGroups(userId)
    )
    // Check if groups exists
    if (isNil(groups)) {
      return []
    }
    // Return GroupFactory --> Group
    return groups.map(group => new GroupFactory(group).build())
  }

  public static async getGroup (
    userId: Group['userId'],
    groupId: Group['id']
  ): Promise<Group> {
    // Get Group DB object
    const group = toType<Group>(
      await this.groupRepository.getGroup(userId, groupId)
    )
    // Check if group exists
    if (isNil(group)) {
      throw new HttpError(
        'Could not locate group with id: ' + groupId,
        HttpStatus.NOT_FOUND
      )
    }
    // Return GroupFactory --> Group
    return new GroupFactory(group).build()
  }

  public static async createGroup (group: Group): Promise<void> {
    // Check if group exists
    const existingGroup = await this.groupRepository.getGroupByName(
      group.userId,
      group.name
    )
    if (!isNil(existingGroup)) {
      throw new HttpError(
        'Group with name: ' + group.name + ' already exists',
        HttpStatus.CONFLICT
      )
    }
    // Create the group
    const newGroup = new GroupFactory(group)
    // Validate the group
    newGroup.validate()
    // Save the group
    await this.groupRepository.createGroup(newGroup)
  }

  public static async removeGroup (
    userId: Group['userId'],
    groupId: Group['id']
  ): Promise<void> {
    // Check if group exists
    const group = toType<Group>(
      await this.groupRepository.getGroup(userId, groupId)
    )
    if (isNil(group)) {
      throw new HttpError(
        'Group does not exist, cannot delete',
        HttpStatus.NOT_FOUND
      )
    }
    // Check if group has associated contracts
    if (group.contractIds.size > 0) {
      throw new HttpError(
        `Group has ${group.contractIds.size} associated contracts, cannot delete`,
        HttpStatus.CONFLICT
      )
    }
    // Remove the group
    await this.groupRepository.removeGroup(userId, groupId)
  }

  public static async addContractToGroup (
    userId: Group['userId'],
    groupId: Group['id'],
    contractId: Contract['id']
  ): Promise<void> {
    // Check if contract exists
    const contract = await this.contractRepository.getContract(
      userId,
      contractId
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Cannot add contract to group, contract does not exist',
        HttpStatus.NOT_FOUND
      )
    }
    // Check if group exists
    const group = await this.groupRepository.getGroup(userId, groupId)
    if (isNil(group)) {
      throw new HttpError(
        'Cannot add contract to group, group does not exist',
        HttpStatus.NOT_FOUND
      )
    }
    // Add Contract to group
    await this.groupRepository.addContractToGroup(userId, groupId, contractId)
  }

  public static async removeContractFromGroup (
    userId: Group['userId'],
    groupId: Group['id'],
    contractId: Contract['id']
  ): Promise<void> {
    // Check if contract exists
    const contract = await this.contractRepository.getContract(
      userId,
      contractId
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Cannot remove contract from group, contract does not exist',
        HttpStatus.NOT_FOUND
      )
    }
    // Check if group exists
    const group = await this.groupRepository.getGroup(userId, groupId)
    if (isNil(group)) {
      throw new HttpError(
        'Cannot remove contract from group, group does not exist',
        HttpStatus.NOT_FOUND
      )
    }
    // Add Contract to group
    await this.groupRepository.removeContractFromGroup(
      userId,
      groupId,
      contractId
    )
  }
}

export default GroupService
