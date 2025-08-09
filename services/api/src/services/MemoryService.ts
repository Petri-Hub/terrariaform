import si from "systeminformation";
import { MemoryDetails } from "../types/MemoryDetails";
import { MemoryDetailsRetrievalError } from "../errors/MemoryDetailsRetrievalError";

export abstract class MemoryService {
    static async getDetails(): Promise<MemoryDetails> {
        try {
            const { used, free, total } = await si.mem()

            return {
                used,
                free,
                total
            }
        } catch(error) {
            throw new MemoryDetailsRetrievalError(error instanceof Error ? error : new Error(String(error)))
        }
    } 
}