import { Hono } from 'hono'
import { MetricsService } from '../services/MetricsService'

export const metrics = new Hono()

metrics.get('/cpu', async (c) => {
    try {
        const url = new URL(c.req.url)
        const startDateParam = url.searchParams.get('startDate')
        const endDateParam = url.searchParams.get('endDate')

        let startDate: Date | undefined
        let endDate: Date | undefined

        if (startDateParam) {
            startDate = new Date(startDateParam)
            if (isNaN(startDate.getTime())) {
                return c.json({ error: 'Invalid startDate format' }, 400)
            }
        }

        if (endDateParam) {
            endDate = new Date(endDateParam)
            if (isNaN(endDate.getTime())) {
                return c.json({ error: 'Invalid endDate format' }, 400)
            }
        }

        const cpuMetrics = await MetricsService.getCpuMetrics(startDate, endDate)

        return c.json({
            metrics: cpuMetrics,
            count: cpuMetrics.length,
            timeRange: {
                start: startDate?.toISOString() || null,
                end: endDate?.toISOString() || null
            }
        })
    } catch (error) {
        console.error('Error fetching CPU metrics:', error)
        return c.json({ error: 'Failed to fetch CPU metrics' }, 500)
    }
})

metrics.get('/memory', async (c) => {
    try {
        const url = new URL(c.req.url)
        const startDateParam = url.searchParams.get('startDate')
        const endDateParam = url.searchParams.get('endDate')

        let startDate: Date | undefined
        let endDate: Date | undefined

        if (startDateParam) {
            startDate = new Date(startDateParam)
            if (isNaN(startDate.getTime())) {
                return c.json({ error: 'Invalid startDate format' }, 400)
            }
        }

        if (endDateParam) {
            endDate = new Date(endDateParam)
            if (isNaN(endDate.getTime())) {
                return c.json({ error: 'Invalid endDate format' }, 400)
            }
        }

        const memoryMetrics = await MetricsService.getMemoryMetrics(startDate, endDate)

        return c.json({
            metrics: memoryMetrics,
            count: memoryMetrics.length,
            timeRange: {
                start: startDate?.toISOString() || null,
                end: endDate?.toISOString() || null
            }
        })
    } catch (error) {
        console.error('Error fetching memory metrics:', error)
        return c.json({ error: 'Failed to fetch memory metrics' }, 500)
    }
})