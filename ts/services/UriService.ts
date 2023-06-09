import Contract from '@shared/Contract'
import ContractRepository from '@shared/ContractRepository'
import HttpError from '@shared/HttpError'
import { HttpStatus } from '@shared/HttpStatus'
import Status from '@shared/Status'
import Uri from '@shared/Uri'
import UriFactory from '@shared/UriFactory'
import UriRepository from '@shared/UriRepository'
import toType from '@shared/toType'
import isNil from 'lodash/isNil'

class UriService {
  static uriRepository: typeof UriRepository.prototype = new UriRepository()
  static contractRepository: typeof ContractRepository.prototype =
    new ContractRepository()

  public static async getUris (userId: Uri['userId']): Promise<Array<Uri>> {
    // Get all Uris from DB
    const uris = toType<Array<Uri>>(await this.uriRepository.getUris(userId))
    // Check if uris exist
    if (isNil(uris)) {
      return []
    }
    // UriFactory --> Uri
    return uris.map(uri => new UriFactory(uri).build())
  }

  public static async getUri (
    userId: Uri['userId'],
    uriId: Uri['id']
  ): Promise<Uri> {
    // Get Uri from DB
    const uri = toType<Uri>(await this.uriRepository.getUri(userId, uriId))
    // Check if uri exists
    if (isNil(uri)) {
      throw new HttpError(
        'Could not find uri with id: ' + uriId,
        HttpStatus.NOT_FOUND
      )
    }
    // UriFactory --> Uri
    return new UriFactory(uri).build()
  }

  public static async createUri (uri: Uri): Promise<void> {
    // Validate the uri
    const newUri = new UriFactory(uri)
    newUri.validate()
    // Create the new Uri
    this.uriRepository.createUri(newUri.build())
  }

  public static async removeUri (userId: Uri['userId'], uriId: Uri['id']) {
    // Check that the uri exists
    const uri = toType<Uri>(await this.uriRepository.getUri(userId, uriId))
    if (isNil(uri)) {
      throw new HttpError(
        'Could not find uri with id: ' + uriId,
        HttpStatus.NOT_FOUND
      )
    }
    // Check that the uri has no associated contract ids
    if (uri.contractIds && uri.contractIds.size > 0) {
      throw new HttpError(
        'Could not remove uri, has ' +
          uri.contractIds.size +
          ' associated contracts',
        HttpStatus.CONFLICT
      )
    }
    // Remove the uri
    this.uriRepository.removeUri(userId, uriId)
  }

  public static async addUriContractId (
    userId: Uri['userId'],
    uriId: Uri['id'],
    contractId: Contract['id']
  ): Promise<void> {
    // Check that uri exists
    const uri = toType<Uri>(await this.uriRepository.getUri(userId, uriId))
    if (isNil(uri)) {
      throw new HttpError(
        'Could not find uri with id: ' + uriId,
        HttpStatus.NOT_FOUND
      )
    }
    // Check that contract exists
    const contract = await this.contractRepository.getContract(
      userId,
      contractId
    )
    if (isNil(contract)) {
      throw new HttpError(
        'Could not find contract with id: ' + contractId,
        HttpStatus.NOT_FOUND
      )
    }
    // Update the uri to include the contract id
    this.uriRepository.addUriContractId(userId, uriId, contractId!)
  }

  public static async setUriS3Uri (
    userId: Uri['userId'],
    uriId: Uri['id'],
    s3Uri: Uri['s3Uri']
  ): Promise<void> {
    // Check that uri exists
    const uri = toType<Uri>(await this.uriRepository.getUri(userId, uriId))
    if (isNil(uri)) {
      throw new HttpError(
        'Could not find uri with id: ' + uriId,
        HttpStatus.NOT_FOUND
      )
    }
    // Update the s3Uri for the uri
    await this.uriRepository.setUriS3Uri(userId, uriId, s3Uri)
  }

  public static async setUriIpfsUrl (
    userId: Uri['userId'],
    uriId: Uri['id'],
    ipfsUri: Uri['ipfsUri']
  ): Promise<void> {
    // Check that uri exists
    const uri = toType<Uri>(await this.uriRepository.getUri(userId, uriId))
    if (isNil(uri)) {
      throw new HttpError(
        'Could not find uri with id: ' + uriId,
        HttpStatus.NOT_FOUND
      )
    }
    // Update the s3Uri for the uri
    await this.uriRepository.setUriIpfsUri(userId, uriId, ipfsUri)
  }

  public static async setUriStatus (
    userId: Uri['userId'],
    uriId: Uri['id'],
    status: Status
  ): Promise<void> {
    // Check that uri exists
    const uri = toType<Uri>(await this.uriRepository.getUri(userId, uriId))
    if (isNil(uri)) {
      throw new HttpError(
        'Could not find uri with id: ' + uriId,
        HttpStatus.NOT_FOUND
      )
    }
    // Update uri status
    await this.uriRepository.setUriStatus(userId, uriId, status)
  }
}

export default UriService
