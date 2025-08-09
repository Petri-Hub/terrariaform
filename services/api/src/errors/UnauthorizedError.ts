import { ErrorCode } from "../constants/ErrorCode";
import { ErrorMessage } from "../constants/ErrorMessags";
import { StatusCode } from "../constants/StatusCode";
import { DomainError } from './DomainError'

export class UnauthorizedError extends DomainError {
    constructor(){
        super(
            ErrorMessage.UNAUTHORIZED,
            ErrorCode.UNAUTHORIZED,
            StatusCode.UNAUTHORIZED
        )
    }
}