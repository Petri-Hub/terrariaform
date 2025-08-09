import { Hono } from 'hono'
import { errorHandler } from './middlewares/errorHandlerMiddleware'
import { authMiddleware } from './middlewares/authMiddleware'
import { health } from './routes/health'
import { system } from './routes/system'
import { containers } from './routes/containers'
import { metrics } from './routes/metrics'
import { DataCollectionService } from './services/DataCollectionService'

const app = new Hono()

app.use(errorHandler)
app.use(authMiddleware)

app.route('/health', health)
app.route('/system', system)
app.route('/containers', containers)
app.route('/metrics', metrics)

// Start data collection when the server starts
DataCollectionService.start()

// Graceful shutdown
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...')
    await DataCollectionService.cleanup()
    process.exit(0)
})

process.on('SIGTERM', async () => {
    console.log('Shutting down gracefully...')
    await DataCollectionService.cleanup()
    process.exit(0)
})

export default app
