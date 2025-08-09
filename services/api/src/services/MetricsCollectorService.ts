import { CpuService } from './CpuService'
import { MemoryService } from './MemoryService'
import { DatabaseService } from './DatabaseService'

export class MetricsCollectorService {
    private static intervalId: NodeJS.Timeout | null = null

    static start(): void {
        if (this.intervalId) {
            console.log('Metrics collection already running')
            return
        }

        console.log('Starting metrics collection every 10 seconds')
        
        // Collect initial data immediately
        this.collectMetrics()

        // Then collect every 10 seconds
        this.intervalId = setInterval(() => {
            this.collectMetrics()
        }, 10000) // 10 seconds
    }

    static stop(): void {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
            console.log('Metrics collection stopped')
        }
    }

    private static async collectMetrics(): Promise<void> {
        try {
            const timestamp = Date.now()
            
            // Collect CPU metrics
            const cpuDetails = await CpuService.getDetails()
            DatabaseService.insertCpuMetrics({
                timestamp,
                total: cpuDetails.usage.total,
                system: cpuDetails.usage.system,
                user: cpuDetails.usage.user,
                cores: JSON.stringify(cpuDetails.usage.cores),
                temperature: cpuDetails.temperature || 0
            })

            // Collect Memory metrics
            const memoryDetails = await MemoryService.getDetails()
            DatabaseService.insertMemoryMetrics({
                timestamp,
                total: memoryDetails.total,
                used: memoryDetails.used,
                free: memoryDetails.free
            })

            console.log(`Metrics collected at ${new Date(timestamp).toISOString()}`)
        } catch (error) {
            console.error('Error collecting metrics:', error)
        }
    }
}