import { HTTPException } from 'hono/http-exception'
import { ContentfulStatusCode, StatusCode } from 'hono/utils/http-status'
import { ErrorMessages as ErrorMessage } from '../constants/ErrorMessags'
import { ErrorCode } from '../constants/ErrorCode'

export abstract class DomainError {
    constructor(
        private readonly message: ErrorMessage,
        private readonly code: ErrorCode,
        private readonly statusCode: StatusCode
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
}