import si from "systeminformation";
import { CpuUsageDetails } from "../types/CpuUsageInformation";
import {  CpuDetailsRetrievalError } from "../errors/CpuDetailsRetrievalError";
import { CpuDetails } from "../types/CpuInformation";
import { simplifyPercentage } from "../utils/simplifyPercentage";

export abstract class CpuService {
    static async getDetails(): Promise<CpuDetails> {
        try{
            const [cpu, load, temperature] = await Promise.all([
                si.cpu(),
                si.currentLoad(),
                si.cpuTemperature()
            ])

            const usage: CpuUsageDetails = {
                total: simplifyPercentage(load.currentLoad),
                system: simplifyPercentage(load.currentLoadSystem),
                user: simplifyPercentage(load.currentLoadUser),
                cores: load.cpus.map((cpu) => simplifyPercentage(cpu.load))
            }

            return {
                name: cpu.brand,
                manufacturer: cpu.manufacturer,
                temperature: temperature.main,
                usage
            }
        } catch(error) {
            throw new CpuDetailsRetrievalError()
        }
    }
}