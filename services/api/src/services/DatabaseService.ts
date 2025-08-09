import { Database } from 'bun:sqlite';
import { join } from 'path';

export interface MetricRecord {
    id?: number;
    timestamp: string;
    metric_type: 'cpu' | 'memory';
    data: string; // JSON string of the metric data
}

export interface CpuMetricData {
    total: number;
    system: number;
    user: number;
    cores: number[];
    temperature?: number;
}

export interface MemoryMetricData {
    total: number;
    used: number;
    free: number;
}

export abstract class DatabaseService {
    private static db: Database | null = null;

    static initialize(): void {
        try {
            // Use /data directory for persistence in Docker container
            const dbPath = join('/data', 'metrics.db');
            this.db = new Database(dbPath);
            
            // Create metrics table if it doesn't exist
            this.db.exec(`
                CREATE TABLE IF NOT EXISTS metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    timestamp TEXT NOT NULL,
                    metric_type TEXT NOT NULL,
                    data TEXT NOT NULL
                );
            `);

            // Create index for better query performance
            this.db.exec(`
                CREATE INDEX IF NOT EXISTS idx_metrics_timestamp_type 
                ON metrics(timestamp, metric_type);
            `);

            console.log('Database initialized successfully');
        } catch (error) {
            console.error('Failed to initialize database:', error);
            throw error;
        }
    }

    static getDatabase(): Database {
        if (!this.db) {
            this.initialize();
        }
        return this.db!;
    }

    static insertCpuMetric(data: CpuMetricData): void {
        const db = this.getDatabase();
        const insert = db.prepare(`
            INSERT INTO metrics (timestamp, metric_type, data)
            VALUES (?, ?, ?)
        `);
        
        insert.run(
            new Date().toISOString(),
            'cpu',
            JSON.stringify(data)
        );
    }

    static insertMemoryMetric(data: MemoryMetricData): void {
        const db = this.getDatabase();
        const insert = db.prepare(`
            INSERT INTO metrics (timestamp, metric_type, data)
            VALUES (?, ?, ?)
        `);
        
        insert.run(
            new Date().toISOString(),
            'memory',
            JSON.stringify(data)
        );
    }

    static getCpuMetrics(startTime?: string, endTime?: string, limit: number = 100): MetricRecord[] {
        const db = this.getDatabase();
        let query = 'SELECT * FROM metrics WHERE metric_type = ?';
        const params: any[] = ['cpu'];

        if (startTime) {
            query += ' AND timestamp >= ?';
            params.push(startTime);
        }

        if (endTime) {
            query += ' AND timestamp <= ?';
            params.push(endTime);
        }

        query += ' ORDER BY timestamp DESC LIMIT ?';
        params.push(limit);

        const stmt = db.prepare(query);
        return stmt.all(...params) as MetricRecord[];
    }

    static getMemoryMetrics(startTime?: string, endTime?: string, limit: number = 100): MetricRecord[] {
        const db = this.getDatabase();
        let query = 'SELECT * FROM metrics WHERE metric_type = ?';
        const params: any[] = ['memory'];

        if (startTime) {
            query += ' AND timestamp >= ?';
            params.push(startTime);
        }

        if (endTime) {
            query += ' AND timestamp <= ?';
            params.push(endTime);
        }

        query += ' ORDER BY timestamp DESC LIMIT ?';
        params.push(limit);

        const stmt = db.prepare(query);
        return stmt.all(...params) as MetricRecord[];
    }

    static cleanup(): void {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}