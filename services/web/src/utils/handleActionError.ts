import { ErrorMessages } from "@/constants/ErrorMessages";
import { UnsuccessfullActionResult } from "@/types/UnsuccessfullActionResult";

export function handleActionError(error: unknown, message: ErrorMessages = ErrorMessages.UnknownErrorOccured): UnsuccessfullActionResult {
    console.error(error)
    
    return {
        success: false,
        message,
        data: null,
    };
}