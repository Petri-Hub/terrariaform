import { DatabaseService } from './DatabaseService'
import { CpuService } from './CpuService'
import { MemoryService } from './MemoryService'
import { 
    MetricsQuery, 
    HistoricalCpuData, 
    HistoricalMemoryData 
} from '../types/MetricsData'

export class MetricsService {
    static async collectAndStoreMetrics(): Promise<void> {
        try {
            const timestamp = Date.now()
            
            // Get current CPU and memory data
            const [cpuDetails, memoryDetails] = await Promise.all([
                CpuService.getDetails(),
                MemoryService.getDetails()
            ])
            
            // Store CPU metrics
            DatabaseService.insertCpuMetric(
                timestamp,
                cpuDetails.usage.total,
                cpuDetails.usage.system,
                cpuDetails.usage.user,
                JSON.stringify(cpuDetails.usage.cores)
            )
            
            // Store memory metrics
            DatabaseService.insertMemoryMetric(
                timestamp,
                memoryDetails.total,
                memoryDetails.used,
                memoryDetails.free
            )
            
        } catch (error) {
            console.error('Error collecting and storing metrics:', error)
        }
    }
    
    static getHistoricalCpuData(query: MetricsQuery = {}): HistoricalCpuData[] {
        const rows = DatabaseService.queryCpuMetrics(query.from, query.to, query.limit)
        
        return rows.map((row) => ({
            id: row.id,
            timestamp: row.timestamp,
            total: row.total,
            system: row.system,
            user: row.user,
            cores: JSON.parse(row.cores)
        }))
    }
    
    static getHistoricalMemoryData(query: MetricsQuery = {}): HistoricalMemoryData[] {
        const rows = DatabaseService.queryMemoryMetrics(query.from, query.to, query.limit)
        
        return rows.map((row) => ({
            id: row.id,
            timestamp: row.timestamp,
            total: row.total,
            used: row.used,
            free: row.free
        }))
    }
    
    static getStorageInfo() {
        return DatabaseService.getStorageInfo()
    }
}