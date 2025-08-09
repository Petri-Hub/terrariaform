import { ErrorCode } from "../constants/ErrorCode";
import { ErrorMessage } from "../constants/ErrorMessags";
import { StatusCode } from "../constants/StatusCode";
import { DomainError } from './DomainError'

export class ContainerDetailsRetrievalError extends DomainError {
    constructor(error?: Error){
        super(
            ErrorMessage.ContainerDetailsRetrievalError,
            ErrorCode.ContainerDetailsRetrievalError,
            StatusCode.INTERNAL_SERVER_ERROR,
            error
        )
    }
}