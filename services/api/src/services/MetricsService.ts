import { PrismaClient } from '@prisma/client'
import { CpuDetails } from '../types/CpuDetails'
import { MemoryDetails } from '../types/MemoryDetails'

export class MetricsService {
    private static prisma = new PrismaClient()

    static async saveCpuMetric(cpuDetails: CpuDetails): Promise<void> {
        await this.prisma.cpuMetric.create({
            data: {
                totalUsage: cpuDetails.usage.total,
                systemUsage: cpuDetails.usage.system,
                userUsage: cpuDetails.usage.user,
                coreUsages: JSON.stringify(cpuDetails.usage.cores),
                name: cpuDetails.name,
                manufacturer: cpuDetails.manufacturer,
                temperature: cpuDetails.temperature
            }
        })
    }

    static async saveMemoryMetric(memoryDetails: MemoryDetails): Promise<void> {
        await this.prisma.memoryMetric.create({
            data: {
                total: memoryDetails.total,
                used: memoryDetails.used,
                free: memoryDetails.free
            }
        })
    }

    static async getCpuMetrics(startDate?: Date, endDate?: Date) {
        const where = startDate || endDate ? {
            timestamp: {
                ...(startDate && { gte: startDate }),
                ...(endDate && { lte: endDate })
            }
        } : {}

        const metrics = await this.prisma.cpuMetric.findMany({
            where,
            orderBy: { timestamp: 'asc' }
        })

        return metrics.map(metric => ({
            id: metric.id,
            timestamp: metric.timestamp,
            totalUsage: metric.totalUsage,
            systemUsage: metric.systemUsage,
            userUsage: metric.userUsage,
            coreUsages: JSON.parse(metric.coreUsages),
            name: metric.name,
            manufacturer: metric.manufacturer,
            temperature: metric.temperature
        }))
    }

    static async getMemoryMetrics(startDate?: Date, endDate?: Date) {
        const where = startDate || endDate ? {
            timestamp: {
                ...(startDate && { gte: startDate }),
                ...(endDate && { lte: endDate })
            }
        } : {}

        return await this.prisma.memoryMetric.findMany({
            where,
            orderBy: { timestamp: 'asc' }
        })
    }

    static async cleanup(): Promise<void> {
        await this.prisma.$disconnect()
    }
}