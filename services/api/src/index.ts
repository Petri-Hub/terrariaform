import { Hono } from 'hono'
import { errorHandler } from './middlewares/errorHandlerMiddleware'
import { authMiddleware } from './middlewares/authMiddleware'
import { health } from './routes/health'
import { system } from './routes/system'
import { containers } from './routes/containers'
import { metrics } from './routes/metrics'
import { MetricsService } from './services/MetricsService'
import { DatabaseService } from './services/DatabaseService'

const app = new Hono()

// Initialize database
DatabaseService.getDatabase()

// Start metrics collection interval (every 10 seconds)
const metricsInterval = setInterval(async () => {
    await MetricsService.collectAndStoreMetrics()
}, 10000)

console.log('Metrics collection started - collecting data every 10 seconds')

app.use(errorHandler)
app.use(authMiddleware)

app.route('/health', health)
app.route('/system', system)
app.route('/containers', containers)
app.route('/metrics', metrics)

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, cleaning up')
    clearInterval(metricsInterval)
    DatabaseService.close()
    process.exit(0)
})

process.on('SIGINT', () => {
    console.log('SIGINT received, cleaning up')
    clearInterval(metricsInterval)
    DatabaseService.close()
    process.exit(0)
})

export default app
