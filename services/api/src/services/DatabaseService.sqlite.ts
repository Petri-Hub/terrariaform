/**
 * SQLite Database Service Implementation
 * 
 * This file can replace the current in-memory DatabaseService.ts when SQLite dependencies are available.
 * Instructions:
 * 1. Install dependencies: npm install better-sqlite3 @types/better-sqlite3
 * 2. Replace services/DatabaseService.ts with this file
 * 3. Restart the application
 */

import Database from 'better-sqlite3'
import path from 'path'
import fs from 'fs'

export class DatabaseService {
    private static instance: Database.Database | null = null
    private static cpuInsertStmt: any = null
    private static memoryInsertStmt: any = null
    
    static getDatabase(): Database.Database {
        if (!this.instance) {
            // Ensure data directory exists
            const dataDir = path.join(process.cwd(), 'data')
            if (!fs.existsSync(dataDir)) {
                fs.mkdirSync(dataDir, { recursive: true })
            }
            
            // Create database file in a persistent location
            const dbPath = path.join(dataDir, 'metrics.db')
            this.instance = new Database(dbPath)
            this.initializeSchema()
            this.preparePredStatements()
            
            console.log(`SQLite database initialized at: ${dbPath}`)
        }
        return this.instance
    }
    
    private static initializeSchema(): void {
        const db = this.instance!
        
        // Create metrics tables
        db.exec(`
            CREATE TABLE IF NOT EXISTS cpu_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                total REAL NOT NULL,
                system REAL NOT NULL,
                user REAL NOT NULL,
                cores TEXT NOT NULL
            )
        `)
        
        db.exec(`
            CREATE TABLE IF NOT EXISTS memory_metrics (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                total INTEGER NOT NULL,
                used INTEGER NOT NULL,
                free INTEGER NOT NULL
            )
        `)
        
        // Create indexes for better query performance
        db.exec(`
            CREATE INDEX IF NOT EXISTS idx_cpu_timestamp ON cpu_metrics(timestamp)
        `)
        
        db.exec(`
            CREATE INDEX IF NOT EXISTS idx_memory_timestamp ON memory_metrics(timestamp)
        `)
    }
    
    private static preparePredStatements(): void {
        const db = this.instance!
        
        this.cpuInsertStmt = db.prepare(`
            INSERT INTO cpu_metrics (timestamp, total, system, user, cores)
            VALUES (?, ?, ?, ?, ?)
        `)
        
        this.memoryInsertStmt = db.prepare(`
            INSERT INTO memory_metrics (timestamp, total, used, free)
            VALUES (?, ?, ?, ?)
        `)
    }
    
    static insertCpuMetric(timestamp: number, total: number, system: number, user: number, cores: string): number {
        const result = this.cpuInsertStmt.run(timestamp, total, system, user, cores)
        return result.lastInsertRowid as number
    }
    
    static insertMemoryMetric(timestamp: number, total: number, used: number, free: number): number {
        const result = this.memoryInsertStmt.run(timestamp, total, used, free)
        return result.lastInsertRowid as number
    }
    
    static queryCpuMetrics(fromTimestamp?: number, toTimestamp?: number, limit?: number) {
        const db = this.instance!
        
        let sql = 'SELECT * FROM cpu_metrics WHERE 1=1'
        const params: any[] = []
        
        if (fromTimestamp) {
            sql += ' AND timestamp >= ?'
            params.push(fromTimestamp)
        }
        
        if (toTimestamp) {
            sql += ' AND timestamp <= ?'
            params.push(toTimestamp)
        }
        
        sql += ' ORDER BY timestamp DESC'
        
        if (limit && limit > 0) {
            sql += ' LIMIT ?'
            params.push(limit)
        }
        
        const stmt = db.prepare(sql)
        return stmt.all(...params)
    }
    
    static queryMemoryMetrics(fromTimestamp?: number, toTimestamp?: number, limit?: number) {
        const db = this.instance!
        
        let sql = 'SELECT * FROM memory_metrics WHERE 1=1'
        const params: any[] = []
        
        if (fromTimestamp) {
            sql += ' AND timestamp >= ?'
            params.push(fromTimestamp)
        }
        
        if (toTimestamp) {
            sql += ' AND timestamp <= ?'
            params.push(toTimestamp)
        }
        
        sql += ' ORDER BY timestamp DESC'
        
        if (limit && limit > 0) {
            sql += ' LIMIT ?'
            params.push(limit)
        }
        
        const stmt = db.prepare(sql)
        return stmt.all(...params)
    }
    
    static getStorageInfo() {
        const db = this.instance!
        
        const cpuCount = db.prepare('SELECT COUNT(*) as count FROM cpu_metrics').get() as any
        const memoryCount = db.prepare('SELECT COUNT(*) as count FROM memory_metrics').get() as any
        
        const oldestCpu = db.prepare('SELECT MIN(timestamp) as timestamp FROM cpu_metrics').get() as any
        const newestCpu = db.prepare('SELECT MAX(timestamp) as timestamp FROM cpu_metrics').get() as any
        const oldestMemory = db.prepare('SELECT MIN(timestamp) as timestamp FROM memory_metrics').get() as any
        const newestMemory = db.prepare('SELECT MAX(timestamp) as timestamp FROM memory_metrics').get() as any
        
        return {
            cpuRecords: cpuCount.count,
            memoryRecords: memoryCount.count,
            maxRecords: 'unlimited (SQLite)',
            oldestCpuTimestamp: oldestCpu.timestamp,
            newestCpuTimestamp: newestCpu.timestamp,
            oldestMemoryTimestamp: oldestMemory.timestamp,
            newestMemoryTimestamp: newestMemory.timestamp,
            persistent: true,
            storage: 'SQLite'
        }
    }
    
    static close(): void {
        if (this.instance) {
            this.instance.close()
            this.instance = null
            this.cpuInsertStmt = null
            this.memoryInsertStmt = null
            console.log('SQLite database connection closed')
        }
    }
    
    // Utility methods for data management
    static cleanupOldData(olderThanTimestamp: number): { cpuDeleted: number, memoryDeleted: number } {
        const db = this.instance!
        
        const cpuResult = db.prepare('DELETE FROM cpu_metrics WHERE timestamp < ?').run(olderThanTimestamp)
        const memoryResult = db.prepare('DELETE FROM memory_metrics WHERE timestamp < ?').run(olderThanTimestamp)
        
        return {
            cpuDeleted: cpuResult.changes,
            memoryDeleted: memoryResult.changes
        }
    }
    
    static vacuum(): void {
        const db = this.instance!
        db.pragma('vacuum')
        console.log('Database vacuum completed')
    }
}