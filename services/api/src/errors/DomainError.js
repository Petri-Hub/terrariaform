export class DomainError {
    constructor(message, code, statusCode, error) {
        this.message = message;
        this.code = code;
        this.statusCode = statusCode;
        this.error = error;
    }
    getMessage() {
        return this.message;
    }
    getCode() {
        return this.code;
    }
    getStatusCode() {
        return this.statusCode;
    }
    getInnerError() {
        return this.error;
    }
}
