import Chain from '@shared/Chain'
import Contract from '@shared/Contract'
import Status from '@shared/Status'
import toType from '@shared/toType'
import RootRepository from './RootRepository'
import ContractModel from './models/ContractModel'

class ContractRepository extends RootRepository<typeof ContractModel> {
  constructor () {
    super(ContractModel)
  }

  public async getContracts (userId: Contract['userId']) {
    return await this.db.get({ userId })
  }

  public async getContract (
    userId: Contract['userId'],
    contractId: Contract['id']
  ) {
    return await this.db.get({ userId, id: contractId! })
  }

  public async getContractByNameAndSymbol (
    userId: Contract['userId'],
    name: Contract['name'],
    symbol: Contract['symbol']
  ) {
    return await this.db.get({ userId, name, symbol })
  }

  public async createContract (contract: Contract) {
    return await this.db.create(contract)
  }

  public async enableDisableChain (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    enabled: Boolean
  ) {
    return await this.db.update(
      { userId, id: contractId },
      { [chain]: { enabled } }
    )
  }

  public async archiveActivateContract (
    userId: Contract['userId'],
    contractId: Contract['id'],
    archived: Contract['archived']
  ) {
    return await this.db.update({ userId, id: contractId }, { archived })
  }

  public async setContractAddress (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    address: string
  ) {
    return await this.db.update(
      { userId, id: contractId },
      { [chain]: { address } }
    )
  }

  public async setContractGroup (
    userId: Contract['userId'],
    contractId: Contract['id'],
    groupId: Contract['groupId']
  ) {
    return await this.db.update({ userId, id: contractId }, { groupId })
  }

  public async setContractStatus (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    status: Status
  ) {
    return await this.db.update(
      { userId, id: contractId },
      { [chain]: { status } }
    )
  }

  public async setContractTx (
    userId: Contract['userId'],
    contractId: Contract['id'],
    chain: Chain,
    tx: string
  ) {
    return await this.db.update({ userId, id: contractId }, { [chain]: { tx } })
  }

  public async addTokenToContract (
    userId: Contract['userId'],
    contractId: Contract['id'],
    tokenId: string
  ) {
    const contract = toType<Contract>(
      await this.db.get({ userId, id: contractId! })
    )
    const updatedTokenIds = new Set(contract.tokenIds ?? new Set())
    updatedTokenIds.add(tokenId)
    await this.db.update({ userId, contractId }, { tokenIds: updatedTokenIds })
  }
}

export default ContractRepository
