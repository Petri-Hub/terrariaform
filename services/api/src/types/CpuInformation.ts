import { CpuUsageDetails } from "./CpuUsageInformation"

export type CpuDetails = {
    name: string
    manufacturer: string
    temperature: number
    usage: CpuUsageDetails
}

