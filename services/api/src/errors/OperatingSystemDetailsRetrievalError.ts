import { ErrorCode } from "../constants/ErrorCode";
import { ErrorMessage } from "../constants/ErrorMessags";
import { StatusCode } from "../constants/StatusCode";
import { DomainError } from './DomainError'

export class OperatingSystemDetailsRetrievalError extends DomainError {
    constructor(error?: Error){
        super(
            ErrorMessage.OperatingSystemDetailsRetrievalError,
            ErrorCode.OperatingSystemDetailsRetrievalError,
            StatusCode.INTERNAL_SERVER_ERROR,
            error
        )
    }
}