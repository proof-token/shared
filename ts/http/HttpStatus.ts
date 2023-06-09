export enum HttpStatus {
  SUCCESS = 'SUCCESS',
  CONFLICT = 'CONFLICT',
  BAD_REQUEST = 'BAD_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  INTERNAL = 'INTERNAL'
}

export function getStatusCodeNumber (httpStatus: HttpStatus): number {
  switch (httpStatus) {
    case 'SUCCESS':
      return 200
    case 'CONFLICT':
      return 409
    case 'BAD_REQUEST':
      return 400
    case 'NOT_FOUND':
      return 404
    case 'INTERNAL':
      return 500
    default:
      throw new Error('Status code unknown: ' + httpStatus)
  }
}
