import Status from '../types/Status'
import Uri from '../types/Uri'
import toType from '../util/toType'
import RootRepository from './RootRepository'
import UriModel from './models/UriModel'

class UriRepository extends RootRepository<typeof UriModel> {
  constructor () {
    super(UriModel)
  }

  public async getUris (userId: Uri['userId']) {
    return await this.db.get({ userId })
  }

  public async getUri (userId: Uri['userId'], uriId: Uri['id']) {
    return await this.db.get({ userId, id: uriId! })
  }

  public async createUri (uri: Uri) {
    await this.db.create(uri)
  }

  public async removeUri (userId: Uri['userId'], uriId: Uri['id']) {
    const uri = await this.db.get({ userId, id: uriId! })
    await this.db.delete(uri)
  }

  public async addUriContractId (
    userId: Uri['userId'],
    uriId: Uri['id'],
    contractId: string
  ) {
    const uri = toType<Uri>(await this.db.get({ userId, id: uriId! }))
    const contractIds = new Set(uri.contractIds)
    contractIds.add(contractId)
    await this.db.update({ userId, id: uriId! }, { contractIds })
  }

  public async setUriS3Uri (
    userId: Uri['userId'],
    uriId: Uri['id'],
    s3Uri: Uri['s3Uri']
  ) {
    await this.db.update({ userId, id: uriId }, { s3Uri })
  }

  public async setUriIpfsUri (
    userId: Uri['userId'],
    uriId: Uri['id'],
    ipfsUri: Uri['ipfsUri']
  ) {
    await this.db.update({ userId, id: uriId }, { ipfsUri })
  }

  public async setUriStatus (
    userId: Uri['userId'],
    uriId: Uri['id'],
    status: Status
  ) {
    await this.db.update({ userId, id: uriId }, { status })
  }
}

export default UriRepository
