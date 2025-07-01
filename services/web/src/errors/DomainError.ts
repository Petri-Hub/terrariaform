import { ErrorMessages } from "@/constants/ErrorMessages";

export abstract class DomainError {
    constructor(
        private message: ErrorMessages
    ){}

    public getMessage(): ErrorMessages {
        return this.message;
    }
}