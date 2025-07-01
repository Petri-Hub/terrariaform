import { ErrorMessages } from "@/constants/ErrorMessages";
import { DomainError } from "./DomainError";

export class AuthenticationError extends DomainError{
    constructor(){
        super(ErrorMessages.AuthenticationFailed);
    }
}