import { Hono } from 'hono'
import { errorHandler } from './middlewares/errorHandlerMiddleware'
import { authMiddleware } from './middlewares/authMiddleware'
import { health } from './routes/health'
import { system } from './routes/system'
import { containers } from './routes/containers'
import { metrics } from './routes/metrics'
import { DatabaseService } from './services/DatabaseService'
import { MetricsCollectorService } from './services/MetricsCollectorService'

const app = new Hono()

// Initialize database and start metrics collection
DatabaseService.initialize()
MetricsCollectorService.start()

app.use(errorHandler)
app.use(authMiddleware)

app.route('/health', health)
app.route('/system', system)
app.route('/containers', containers)
app.route('/metrics', metrics)

// Graceful shutdown
process.on('SIGINT', () => {
    console.log('Shutting down gracefully...')
    MetricsCollectorService.stop()
    DatabaseService.close()
    process.exit(0)
})

process.on('SIGTERM', () => {
    console.log('Shutting down gracefully...')
    MetricsCollectorService.stop()
    DatabaseService.close()
    process.exit(0)
})

export default app
