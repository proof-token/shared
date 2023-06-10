import { HttpStatus, getStatusCodeNumber } from './HttpStatus'

class HttpError extends Error {
  number: number
  constructor (message: string, statusCode: HttpStatus) {
    super(message)
    this.name = statusCode
    this.number = getStatusCodeNumber(statusCode)
  }
}

export default HttpError
