import isNil from 'lodash/isNil'
import ContractFactory from '../factories/ContractFactory'
import HttpError from '../http/HttpError'
import { HttpStatus } from '../http/HttpStatus'
import ContractRepository from '../repository/ContractRepository'
import GroupRepository from '../repository/GroupRepository'
import TokenRepository from '../repository/TokenRepository'
import UriRepository from '../repository/UriRepository'
import Chain from '../types/Chain'
import Contract from '../types/Contract'
import Status from '../types/Status'
import toType from '../util/toType'

class ContractService {
  static contractRepository: typeof ContractRepository.prototype =
    new ContractRepository()
  static groupRepository: typeof GroupRepository.prototype =
    new GroupRepository()
  static uriRepository: typeof UriRepository.prototype = new UriRepository()
  static tokenRepository: typeof TokenRepository.prototype =
    new TokenRepository()

  public static async getContracts (
    userId: Contract['userId']
  ): Promise<Array<Contract>> {
    // Get Contracts DB Objects
    const contracts = toType<Array<Contract>>(
      await this.contractRepository.getContracts(userId)
    )
    // Check if contracts exists
    if (isNil(contracts)) {
      return []
    }
    // Create ContractFactory -> Contract
    return contracts.map(contract => new ContractFactory(contract).build())
  }

  public static async getContract (
    userId: Contract['userId'],
    contractId: Contract['id']
  ): Promise<Contract> {
    // Get Contract DB Object
    const contract = toType<Contract>(
      await this.contractRepository.getContract(userId, contractId)
    )
    // Check if contract exists
    if (isNil(contract)) {
      throw new HttpError(
        'Could not find contract with id: ' + contractId,
        HttpStatus.NOT_FOUND
      )
    }
    // Create ContractFactory -> Contract
    return new ContractFactory(contract).build()
  }

  public static async createContract (contract: Contract): Promise<void> {
    // Check if contract exists
    const existingContract = toType<Contract>(
      await this.contractRepository.getContractByNameAndSymbol(
        contract.userId,
        contract.name,
        contract.symbol
      )
    )
    if (!isNil(existingContract)) {
      throw new HttpError(
        'Contract with name: ' +
          existingContract.name +
          ' and symbol: ' +
          existingContract.symbol +
          ' already exists',
        HttpStatus.CONFLICT
      )
    }
    // Check if group exists
    const group = this.groupRepository.getGroup(
      contract.userId,
      contract.groupId
    )
    if (isNil(group)) {
      throw new HttpError(
        'Nonexistent group, please assign a valid group',
        HttpStatus.NOT_FOUND
      )
    }
    // Check if uri exists
    const uri = this.uriRepository.getUri(contract.userId, contract.uriId)
    if (isNil(uri)) {
      throw new HttpError(
        'Nonexistent uri, please assign a valid uri',
        HttpStatus.NOT_FOUND
      )
    }
    // Create ContractFactory -> Contract
    const newContract = new ContractFactory(contract)
    // Check if Contract is valid
    newContract.validate()
    // Save the Contract
    const savedContract = new ContractFactory(
      toType<Contract>(
        await this.contractRepository.createContract(newContract.build())
      )
    ).build()
    // Add the Contract to group
    await this.groupRepository.addContractToGroup(
      newContract.userId,
      newContract.groupId,
      savedContract.id
    )
    // Add the Contract to uri
    await this.uriRepository.addUriContractId(
      newContract.userId,
      newContract.uriId,
      savedContract.id!
    )
  }

  public static async enableDisableChain (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    enabled: Boolean
  ): Promise<void> {
    // Check if contract exists
    const contract = toType<Contract>(
      await this.contractRepository.getContract(userId, contractId)
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Nonexistent contract, cannot enable / disable chain',
        HttpStatus.NOT_FOUND
      )
    }
    // Enable or Disable the chain for Contract
    await this.contractRepository.enableDisableChain(
      userId,
      contractId,
      chain,
      enabled
    )
  }

  public static async archiveActivateContract (
    userId: Contract['userId'],
    contractId: Contract['id'],
    archived: Contract['archived']
  ): Promise<void> {
    // Check if contract exists
    const contract = toType<Contract>(
      await this.contractRepository.getContract(userId, contractId)
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Nonexistent contract, cannot archive / activate',
        HttpStatus.NOT_FOUND
      )
    }
    // Archive or Activate a Contract
    await this.contractRepository.archiveActivateContract(
      userId,
      contractId,
      archived
    )
  }

  public static async setContractAddress (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    address: string
  ) {
    // Check if contract exists
    const contract = toType<Contract>(
      await this.contractRepository.getContract(userId, contractId)
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Nonexistent contract, cannot set contract address',
        HttpStatus.NOT_FOUND
      )
    }
    // Set the Contract Address
    await this.contractRepository.setContractAddress(
      userId,
      contractId,
      chain,
      address
    )
  }

  public static async setContractGroup (
    userId: Contract['userId'],
    contractId: Contract['id'],
    groupId: Contract['groupId']
  ): Promise<void> {
    // Check if contract exists
    const contract = toType<Contract>(
      await this.contractRepository.getContract(userId, contractId)
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Nonexistent contract, cannot set group',
        HttpStatus.NOT_FOUND
      )
    }
    // Set the Contract Group
    await this.contractRepository.setContractGroup(userId, contractId, groupId)
    // Update the group record
    if (contract.groupId) {
      await this.groupRepository.removeContractFromGroup(
        userId,
        groupId,
        contractId
      )
    }
    await this.groupRepository.addContractToGroup(userId, groupId, contractId)
  }

  public static async setContractStatus (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    status: Status
  ): Promise<void> {
    // Check if contract exists
    const contract = await this.contractRepository.getContract(
      userId,
      contractId
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Nonexistent contract, cannot set status',
        HttpStatus.NOT_FOUND
      )
    }
    // Set the Contract Status
    await this.contractRepository.setContractStatus(
      userId,
      contractId,
      chain,
      status
    )
  }

  public static async setContractTx (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    tx: string
  ): Promise<void> {
    // Check if contract exists
    const contract = await this.contractRepository.getContract(
      userId,
      contractId
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Nonexistent contract, cannot set tx',
        HttpStatus.NOT_FOUND
      )
    }
    // Set the Contract tx
    await this.contractRepository.setContractTx(userId, contractId, chain, tx)
  }

  public static async addTokenToContract (
    userId: Contract['userId'],
    contractId: Contract['id'],
    tokenId: string
  ) {
    // Check if contract exists
    const contract = await this.contractRepository.getContract(
      userId,
      contractId
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Nonexistent contract, cannot add to contract',
        HttpStatus.NOT_FOUND
      )
    }
    // Check if token exists
    const token = await this.tokenRepository.getToken(userId, tokenId)
    if (isNil(token)) {
      throw new HttpError(
        'Nonexistent token, cannot add to contract',
        HttpStatus.NOT_FOUND
      )
    }
    // Add token to contract
    await this.contractRepository.addTokenToContract(
      userId,
      contractId,
      tokenId
    )
  }
}

export default ContractService
