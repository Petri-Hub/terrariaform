import { ErrorCode } from "../constants/ErrorCode";
import { ErrorMessage } from "../constants/ErrorMessags";
import { StatusCode } from "../constants/StatusCode";
import { DomainError } from './DomainError'

export class CpuDetailsRetrievalError extends DomainError {
    constructor(){
        super(
            ErrorMessage.CpuDetailsRetrievalError,
            ErrorCode.CpuDetailsRetrievalError,
            StatusCode.INTERNAL_SERVER_ERROR
        )
    }
}