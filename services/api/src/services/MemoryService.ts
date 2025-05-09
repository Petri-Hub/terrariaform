import si from "systeminformation";
import { MemoryDetails } from "../types/MemoryDetails";

export abstract class MemoryService {
    static async getDetails(): Promise<MemoryDetails> {
        const { used, free, total } = await si.mem()

        return {
            used,
            free,
            total
        }
    } 
}