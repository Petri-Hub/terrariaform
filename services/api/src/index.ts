import { Hono } from 'hono'
import { errorHandler } from './middlewares/errorHandlerMiddleware'
import { authMiddleware } from './middlewares/authMiddleware'
import { health } from './routes/health'
import { system } from './routes/system'
import { containers } from './routes/containers'
import { metrics } from './routes/metrics'
import { DatabaseService } from './services/DatabaseService'
import { MetricsCollectionService } from './services/MetricsCollectionService'

const app = new Hono()

// Initialize database and start metrics collection
try {
    DatabaseService.initialize()
    MetricsCollectionService.start()
} catch (error) {
    console.error('Failed to initialize services:', error)
}

app.use(errorHandler)
app.use(authMiddleware)

app.route('/health', health)
app.route('/system', system)
app.route('/containers', containers)
app.route('/metrics', metrics)

export default app
