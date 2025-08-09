import { Hono } from 'hono'
import { MetricsService } from '../services/MetricsService'
import { MetricsQuery } from '../types/MetricsData'

export const metrics = new Hono()

metrics.get('/cpu', async (c) => {
    try {
        const query: MetricsQuery = {}
        
        // Parse query parameters
        const from = c.req.query('from')
        const to = c.req.query('to')
        const limit = c.req.query('limit')
        
        if (from) {
            const timestamp = parseInt(from)
            if (!isNaN(timestamp)) {
                query.from = timestamp
            }
        }
        
        if (to) {
            const timestamp = parseInt(to)
            if (!isNaN(timestamp)) {
                query.to = timestamp
            }
        }
        
        if (limit) {
            const limitNum = parseInt(limit)
            if (!isNaN(limitNum) && limitNum > 0) {
                query.limit = Math.min(limitNum, 1000) // Cap at 1000 records
            }
        } else {
            query.limit = 100 // Default limit
        }
        
        const data = MetricsService.getHistoricalCpuData(query)
        
        return Response.json({
            data,
            count: data.length,
            query
        })
    } catch (error) {
        console.error('Error retrieving CPU metrics:', error)
        return Response.json(
            { message: 'Error retrieving CPU metrics', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
})

metrics.get('/memory', async (c) => {
    try {
        const query: MetricsQuery = {}
        
        // Parse query parameters
        const from = c.req.query('from')
        const to = c.req.query('to')
        const limit = c.req.query('limit')
        
        if (from) {
            const timestamp = parseInt(from)
            if (!isNaN(timestamp)) {
                query.from = timestamp
            }
        }
        
        if (to) {
            const timestamp = parseInt(to)
            if (!isNaN(timestamp)) {
                query.to = timestamp
            }
        }
        
        if (limit) {
            const limitNum = parseInt(limit)
            if (!isNaN(limitNum) && limitNum > 0) {
                query.limit = Math.min(limitNum, 1000) // Cap at 1000 records
            }
        } else {
            query.limit = 100 // Default limit
        }
        
        const data = MetricsService.getHistoricalMemoryData(query)
        
        return Response.json({
            data,
            count: data.length,
            query
        })
    } catch (error) {
        console.error('Error retrieving memory metrics:', error)
        return Response.json(
            { message: 'Error retrieving memory metrics', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
})

metrics.get('/info', async (c) => {
    try {
        const info = MetricsService.getStorageInfo()
        
        return Response.json({
            storage: info,
            message: 'Currently using in-memory storage. Data is lost on restart.',
            note: 'This will be replaced with persistent SQLite storage when network access is available.'
        })
    } catch (error) {
        console.error('Error retrieving storage info:', error)
        return Response.json(
            { message: 'Error retrieving storage info', error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 }
        )
    }
})