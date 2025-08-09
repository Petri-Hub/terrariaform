import { ErrorMessage } from '../constants/ErrorMessags'
import { ErrorCode } from '../constants/ErrorCode'
import { StatusCode } from '../constants/StatusCode'

export abstract class DomainError {
    constructor(
        private readonly message: ErrorMessage,
        private readonly code: ErrorCode,
        private readonly statusCode: StatusCode,
        private readonly error?: Error
    ){}

    public getMessage(): ErrorMessage {
        return this.message
    }

    public getCode(): ErrorCode {
        return this.code
    }

    public getStatusCode(): StatusCode {
        return this.statusCode
    }

    public getInnerError(): Error | undefined {
        return this.error
    }
}