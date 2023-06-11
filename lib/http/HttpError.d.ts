import { HttpStatus } from './HttpStatus';
declare class HttpError extends Error {
    number: number;
    constructor(message: string, statusCode: HttpStatus);
}
export default HttpError;
