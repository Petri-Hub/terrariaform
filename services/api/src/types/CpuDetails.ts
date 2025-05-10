import { CpuUsageDetails } from "./CpuUsageDetails"

export type CpuDetails = {
    name: string
    manufacturer: string
    temperature: number
    usage: CpuUsageDetails
}

