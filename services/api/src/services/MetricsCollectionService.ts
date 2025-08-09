import * as cron from 'node-cron';
import { CpuService } from './CpuService';
import { MemoryService } from './MemoryService';
import { DatabaseService, CpuMetricData, MemoryMetricData } from './DatabaseService';

export abstract class MetricsCollectionService {
    private static isRunning = false;
    private static task: cron.ScheduledTask | null = null;

    static start(): void {
        if (this.isRunning) {
            console.log('Metrics collection is already running');
            return;
        }

        // Run every 10 seconds
        this.task = cron.schedule('*/10 * * * * *', async () => {
            try {
                await this.collectAndStoreMetrics();
            } catch (error) {
                console.error('Error collecting metrics:', error);
            }
        });

        this.isRunning = true;
        console.log('Metrics collection started (every 10 seconds)');
    }

    static stop(): void {
        if (this.task) {
            this.task.stop();
            this.task = null;
        }
        this.isRunning = false;
        console.log('Metrics collection stopped');
    }

    private static async collectAndStoreMetrics(): Promise<void> {
        try {
            // Collect CPU metrics
            const cpuDetails = await CpuService.getDetails();
            const cpuMetric: CpuMetricData = {
                total: cpuDetails.usage.total,
                system: cpuDetails.usage.system,
                user: cpuDetails.usage.user,
                cores: cpuDetails.usage.cores,
                temperature: cpuDetails.temperature
            };
            DatabaseService.insertCpuMetric(cpuMetric);

            // Collect Memory metrics
            const memoryDetails = await MemoryService.getDetails();
            const memoryMetric: MemoryMetricData = {
                total: memoryDetails.total,
                used: memoryDetails.used,
                free: memoryDetails.free
            };
            DatabaseService.insertMemoryMetric(memoryMetric);

            console.log(`Metrics collected at ${new Date().toISOString()}`);
        } catch (error) {
            console.error('Failed to collect metrics:', error);
        }
    }
}