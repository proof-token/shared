import HttpError from '@shared/HttpError'
import { HttpStatus } from '@shared/HttpStatus'
import Status from '@shared/Status'
import Uri from '@shared/Uri'
import defaultTo from 'lodash/defaultTo'
import isNil from 'lodash/isNil'

class UriFactory {
  id: Uri['id'] = undefined
  uri: Uri['uri'] = ''
  s3: Uri['s3'] = false
  s3Uri: Uri['s3Uri'] = undefined
  ipfs: Uri['ipfs'] = false
  ipfsUri: Uri['ipfsUri'] = undefined
  userId: Uri['userId'] = ''
  contractIds: Uri['contractIds'] = new Set()
  status: Uri['status'] = Status.PENDING

  constructor (uri: Uri) {
    this.id = defaultTo(uri.id, this.id)
    this.uri = defaultTo(uri.uri, this.uri)
    this.s3 = defaultTo(uri.s3, this.s3)
    this.ipfs = defaultTo(uri.ipfs, this.ipfs)
    this.userId = uri.userId
    this.contractIds = defaultTo(uri.contractIds, this.contractIds)
    this.status = defaultTo(uri.status, this.status)
    this.s3Uri = defaultTo(uri.s3Uri, this.s3Uri)
    this.ipfsUri = defaultTo(uri.ipfsUri, this.ipfsUri)
  }

  validate (): void {
    if (isNil(this.userId)) {
      throw new HttpError('Missing user', HttpStatus.BAD_REQUEST)
    }
    if (!this.uri?.trim().length && !this.s3 && !this.ipfs) {
      throw new HttpError(
        'Should include uri, s3, or ipfs for valid Uri',
        HttpStatus.BAD_REQUEST
      )
    }
  }

  build (): Uri {
    return { ...this }
  }
}

export default UriFactory
