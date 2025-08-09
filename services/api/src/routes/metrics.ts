import { Hono } from 'hono'
import { DatabaseService } from '../services/DatabaseService'

export const metrics = new Hono()

metrics.get('/cpu', async (c) => {
    try {
        const startTime = c.req.query('start_time')
        const endTime = c.req.query('end_time')
        const limitStr = c.req.query('limit')
        const limit = limitStr ? parseInt(limitStr, 10) : 100

        if (limit > 1000) {
            return c.json({ error: 'Limit cannot exceed 1000 records' }, 400)
        }

        const records = DatabaseService.getCpuMetrics(startTime, endTime, limit)
        
        const metrics = records.map(record => ({
            timestamp: record.timestamp,
            data: JSON.parse(record.data)
        }))

        return c.json({
            metrics,
            count: metrics.length,
            query: {
                start_time: startTime,
                end_time: endTime,
                limit
            }
        })
    } catch (error) {
        console.error('Error fetching CPU metrics:', error)
        return c.json({ error: 'Failed to fetch CPU metrics' }, 500)
    }
})

metrics.get('/memory', async (c) => {
    try {
        const startTime = c.req.query('start_time')
        const endTime = c.req.query('end_time')
        const limitStr = c.req.query('limit')
        const limit = limitStr ? parseInt(limitStr, 10) : 100

        if (limit > 1000) {
            return c.json({ error: 'Limit cannot exceed 1000 records' }, 400)
        }

        const records = DatabaseService.getMemoryMetrics(startTime, endTime, limit)
        
        const metrics = records.map(record => ({
            timestamp: record.timestamp,
            data: JSON.parse(record.data)
        }))

        return c.json({
            metrics,
            count: metrics.length,
            query: {
                start_time: startTime,
                end_time: endTime,
                limit
            }
        })
    } catch (error) {
        console.error('Error fetching memory metrics:', error)
        return c.json({ error: 'Failed to fetch memory metrics' }, 500)
    }
})