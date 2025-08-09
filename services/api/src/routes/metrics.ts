import { Hono } from 'hono'
import { DatabaseService } from '../services/DatabaseService'
import { MetricsQueryParams } from '../types/MetricsData'

export const metrics = new Hono()

metrics.get('/cpu/history', async (c) => {
    try {
        const params: MetricsQueryParams = {
            startTime: c.req.query('startTime'),
            endTime: c.req.query('endTime'),
            limit: c.req.query('limit') ? parseInt(c.req.query('limit')!) : undefined,
            granularity: c.req.query('granularity') as 'minute' | 'hour' | 'day' | undefined
        }

        const history = DatabaseService.getCpuHistory(params)
        
        // Transform the data for frontend consumption
        const transformedHistory = history.map(entry => ({
            ...entry,
            cores: JSON.parse(entry.cores),
            timestamp: new Date(entry.timestamp).toISOString()
        }))

        return c.json({
            success: true,
            data: transformedHistory,
            count: transformedHistory.length
        })
    } catch (error) {
        console.error('Error fetching CPU history:', error)
        return c.json({
            success: false,
            error: 'Failed to fetch CPU history'
        }, 500)
    }
})

metrics.get('/memory/history', async (c) => {
    try {
        const params: MetricsQueryParams = {
            startTime: c.req.query('startTime'),
            endTime: c.req.query('endTime'),
            limit: c.req.query('limit') ? parseInt(c.req.query('limit')!) : undefined,
            granularity: c.req.query('granularity') as 'minute' | 'hour' | 'day' | undefined
        }

        const history = DatabaseService.getMemoryHistory(params)
        
        // Transform the data for frontend consumption
        const transformedHistory = history.map(entry => ({
            ...entry,
            timestamp: new Date(entry.timestamp).toISOString()
        }))

        return c.json({
            success: true,
            data: transformedHistory,
            count: transformedHistory.length
        })
    } catch (error) {
        console.error('Error fetching memory history:', error)
        return c.json({
            success: false,
            error: 'Failed to fetch memory history'
        }, 500)
    }
})