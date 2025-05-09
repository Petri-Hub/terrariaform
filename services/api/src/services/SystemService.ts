import { CpuDetails } from '../types/CpuInformation'
import { CpuService } from './CpuService'
import { MemoryService } from './MemoryService'
import { OperatingSystemService } from './OperatingSystemService'

export abstract class SystemService {
    static async getOperatingSystemInformation() {
        return await OperatingSystemService.getDetails()
    }

    static async getCpuDetails(): Promise<CpuDetails> {
        return await CpuService.getDetails();
    }

    static async getMemoryDetails() {
        return await MemoryService.getDetails()
    }
}