import { CpuDetails } from '../types/CpuInformation'
import { MemoryDetails } from '../types/MemoryDetails'
import { OperatingSystemDetails } from '../types/OperatingSystemDetails'
import { CpuService } from './CpuService'
import { MemoryService } from './MemoryService'
import { OperatingSystemService } from './OperatingSystemService'

export abstract class SystemService {
    static async getOperatingSystemDetails(): Promise<OperatingSystemDetails>{
        return await OperatingSystemService.getDetails()
    }

    static async getCpuDetails(): Promise<CpuDetails> {
        return await CpuService.getDetails();
    }

    static async getMemoryDetails() : Promise<MemoryDetails> {
        return await MemoryService.getDetails()
    }
}