export declare enum HttpStatus {
    SUCCESS = "SUCCESS",
    CONFLICT = "CONFLICT",
    BAD_REQUEST = "BAD_REQUEST",
    NOT_FOUND = "NOT_FOUND",
    INTERNAL = "INTERNAL"
}
export declare function getStatusCodeNumber(httpStatus: HttpStatus): number;
