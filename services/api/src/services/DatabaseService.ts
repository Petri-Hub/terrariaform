// Simple in-memory storage implementation
// This can be easily replaced with SQLite later when network issues are resolved

export class DatabaseService {
    private static cpuMetrics: Array<{
        id: number
        timestamp: number
        total: number
        system: number
        user: number
        cores: string
    }> = []
    
    private static memoryMetrics: Array<{
        id: number
        timestamp: number
        total: number
        used: number
        free: number
    }> = []
    
    private static nextCpuId = 1
    private static nextMemoryId = 1
    
    // Maximum number of records to keep in memory (last 1000 records per metric type)
    private static readonly MAX_RECORDS = 1000
    
    static getDatabase() {
        // No initialization needed for in-memory storage
        return this
    }
    
    static insertCpuMetric(timestamp: number, total: number, system: number, user: number, cores: string): number {
        const id = this.nextCpuId++
        this.cpuMetrics.push({ id, timestamp, total, system, user, cores })
        
        // Keep only the latest MAX_RECORDS
        if (this.cpuMetrics.length > this.MAX_RECORDS) {
            this.cpuMetrics = this.cpuMetrics.slice(-this.MAX_RECORDS)
        }
        
        return id
    }
    
    static insertMemoryMetric(timestamp: number, total: number, used: number, free: number): number {
        const id = this.nextMemoryId++
        this.memoryMetrics.push({ id, timestamp, total, used, free })
        
        // Keep only the latest MAX_RECORDS
        if (this.memoryMetrics.length > this.MAX_RECORDS) {
            this.memoryMetrics = this.memoryMetrics.slice(-this.MAX_RECORDS)
        }
        
        return id
    }
    
    static queryCpuMetrics(fromTimestamp?: number, toTimestamp?: number, limit?: number) {
        let results = [...this.cpuMetrics]
        
        // Filter by timestamp range
        if (fromTimestamp) {
            results = results.filter(row => row.timestamp >= fromTimestamp)
        }
        if (toTimestamp) {
            results = results.filter(row => row.timestamp <= toTimestamp)
        }
        
        // Sort by timestamp descending
        results.sort((a, b) => b.timestamp - a.timestamp)
        
        // Apply limit
        if (limit && limit > 0) {
            results = results.slice(0, limit)
        }
        
        return results
    }
    
    static queryMemoryMetrics(fromTimestamp?: number, toTimestamp?: number, limit?: number) {
        let results = [...this.memoryMetrics]
        
        // Filter by timestamp range
        if (fromTimestamp) {
            results = results.filter(row => row.timestamp >= fromTimestamp)
        }
        if (toTimestamp) {
            results = results.filter(row => row.timestamp <= toTimestamp)
        }
        
        // Sort by timestamp descending
        results.sort((a, b) => b.timestamp - a.timestamp)
        
        // Apply limit
        if (limit && limit > 0) {
            results = results.slice(0, limit)
        }
        
        return results
    }
    
    static close(): void {
        // Nothing to close for in-memory storage
        console.log('Database service closed (in-memory)')
    }
    
    static getStorageInfo() {
        return {
            cpuRecords: this.cpuMetrics.length,
            memoryRecords: this.memoryMetrics.length,
            maxRecords: this.MAX_RECORDS,
            oldestCpuTimestamp: this.cpuMetrics.length > 0 ? this.cpuMetrics[0].timestamp : null,
            newestCpuTimestamp: this.cpuMetrics.length > 0 ? this.cpuMetrics[this.cpuMetrics.length - 1].timestamp : null,
            oldestMemoryTimestamp: this.memoryMetrics.length > 0 ? this.memoryMetrics[0].timestamp : null,
            newestMemoryTimestamp: this.memoryMetrics.length > 0 ? this.memoryMetrics[this.memoryMetrics.length - 1].timestamp : null
        }
    }
}