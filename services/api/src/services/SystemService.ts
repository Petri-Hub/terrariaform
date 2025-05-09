import si from 'systeminformation'
import { CpuDetails } from '../types/CpuInformation'
import { CpuService } from './CpuService'

export abstract class SystemService {
    static async getSystemInformation() {
        return await si.system()
    }

    static async getOperatingSystemInformation() {
        return await si.osInfo()
    }

    static async getCpuDetails(): Promise<CpuDetails> {
        return CpuService.getDetails();
    }

    static async getMemoryInformation() {
        return await si.mem()
    }
}