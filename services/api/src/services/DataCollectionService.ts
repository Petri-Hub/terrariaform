import * as cron from 'node-cron'
import { SystemService } from './SystemService'
import { MetricsService } from './MetricsService'

export class DataCollectionService {
    private static task: cron.ScheduledTask | null = null

    static start(): void {
        if (this.task) {
            console.log('Data collection is already running')
            return
        }

        // Run every 10 seconds
        this.task = cron.schedule('*/10 * * * * *', async () => {
            await this.collectMetrics()
        })

        this.task.start()
        console.log('Data collection started - collecting metrics every 10 seconds')
        
        // Collect initial data immediately
        this.collectMetrics()
    }

    static stop(): void {
        if (this.task) {
            this.task.stop()
            this.task = null
            console.log('Data collection stopped')
        }
    }

    private static async collectMetrics(): Promise<void> {
        try {
            // Collect CPU metrics
            const cpuDetails = await SystemService.getCpuDetails()
            await MetricsService.saveCpuMetric(cpuDetails)

            // Collect memory metrics
            const memoryDetails = await SystemService.getMemoryDetails()
            await MetricsService.saveMemoryMetric(memoryDetails)

            console.log(`Metrics collected at ${new Date().toISOString()}`)
        } catch (error) {
            console.error('Error collecting metrics:', error)
        }
    }

    static async cleanup(): Promise<void> {
        this.stop()
        await MetricsService.cleanup()
    }
}