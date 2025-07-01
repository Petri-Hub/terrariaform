import { ErrorMessages } from "@/constants/ErrorMessages";
import { DomainError } from "@/errors/DomainError";
import { UnsuccessfullActionResult } from "@/types/UnsuccessfullActionResult";

export function handleActionError(error: unknown): UnsuccessfullActionResult {
    console.error(error)
    
    const result: UnsuccessfullActionResult = {
        success: false,
        message: ErrorMessages.UnknownErrorOccured,
        data: null,
    }

    if(error instanceof DomainError){
        result.message = error.getMessage();
    }

    return result;
}