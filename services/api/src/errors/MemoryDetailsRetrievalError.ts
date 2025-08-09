import { ErrorCode } from "../constants/ErrorCode";
import { ErrorMessage } from "../constants/ErrorMessags";
import { StatusCode } from "../constants/StatusCode";
import { DomainError } from './DomainError'

export class MemoryDetailsRetrievalError extends DomainError {
    constructor(error?: Error){
        super(
            ErrorMessage.MemoryDetailsRetrievalError,
            ErrorCode.MemoryDetailsRetrievalError,
            StatusCode.INTERNAL_SERVER_ERROR,
            error
        )
    }
}