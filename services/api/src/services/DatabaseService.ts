import { Database } from 'bun:sqlite'
import { CpuMetrics, MemoryMetrics, MetricsQueryParams } from '../types/MetricsData'
import { mkdirSync, existsSync } from 'fs'
import { dirname } from 'path'

export class DatabaseService {
    private static db: Database | null = null

    static initialize(): void {
        if (!this.db) {
            const dbPath = '/data/metrics.db'
            
            // Ensure the directory exists
            const dbDir = dirname(dbPath)
            if (!existsSync(dbDir)) {
                mkdirSync(dbDir, { recursive: true })
            }
            
            this.db = new Database(dbPath)
            this.createTables()
        }
    }

    private static createTables(): void {
        if (!this.db) return

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS cpu_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                total REAL NOT NULL,
                system REAL NOT NULL,
                user REAL NOT NULL,
                cores TEXT NOT NULL,
                temperature REAL DEFAULT 0
            )
        `)

        this.db.exec(`
            CREATE TABLE IF NOT EXISTS memory_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                total INTEGER NOT NULL,
                used INTEGER NOT NULL,
                free INTEGER NOT NULL
            )
        `)

        // Create indexes for better query performance
        this.db.exec(`
            CREATE INDEX IF NOT EXISTS idx_cpu_timestamp ON cpu_metrics(timestamp);
            CREATE INDEX IF NOT EXISTS idx_memory_timestamp ON memory_metrics(timestamp);
        `)
    }

    static insertCpuMetrics(metrics: Omit<CpuMetrics, 'id'>): void {
        if (!this.db) this.initialize()
        
        const stmt = this.db!.prepare(`
            INSERT INTO cpu_metrics (timestamp, total, system, user, cores, temperature)
            VALUES (?, ?, ?, ?, ?, ?)
        `)
        
        stmt.run(
            metrics.timestamp,
            metrics.total,
            metrics.system,
            metrics.user,
            metrics.cores,
            metrics.temperature
        )
    }

    static insertMemoryMetrics(metrics: Omit<MemoryMetrics, 'id'>): void {
        if (!this.db) this.initialize()
        
        const stmt = this.db!.prepare(`
            INSERT INTO memory_metrics (timestamp, total, used, free)
            VALUES (?, ?, ?, ?)
        `)
        
        stmt.run(metrics.timestamp, metrics.total, metrics.used, metrics.free)
    }

    static getCpuHistory(params: MetricsQueryParams = {}): CpuMetrics[] {
        if (!this.db) this.initialize()

        let query = 'SELECT * FROM cpu_metrics WHERE 1=1'
        const queryParams: any[] = []

        if (params.startTime) {
            query += ' AND timestamp >= ?'
            queryParams.push(new Date(params.startTime).getTime())
        }

        if (params.endTime) {
            query += ' AND timestamp <= ?'
            queryParams.push(new Date(params.endTime).getTime())
        }

        query += ' ORDER BY timestamp DESC'

        if (params.limit) {
            query += ' LIMIT ?'
            queryParams.push(params.limit)
        }

        const stmt = this.db!.prepare(query)
        return stmt.all(...queryParams) as CpuMetrics[]
    }

    static getMemoryHistory(params: MetricsQueryParams = {}): MemoryMetrics[] {
        if (!this.db) this.initialize()

        let query = 'SELECT * FROM memory_metrics WHERE 1=1'
        const queryParams: any[] = []

        if (params.startTime) {
            query += ' AND timestamp >= ?'
            queryParams.push(new Date(params.startTime).getTime())
        }

        if (params.endTime) {
            query += ' AND timestamp <= ?'
            queryParams.push(new Date(params.endTime).getTime())
        }

        query += ' ORDER BY timestamp DESC'

        if (params.limit) {
            query += ' LIMIT ?'
            queryParams.push(params.limit)
        }

        const stmt = this.db!.prepare(query)
        return stmt.all(...queryParams) as MemoryMetrics[]
    }

    static close(): void {
        if (this.db) {
            this.db.close()
            this.db = null
        }
    }
}