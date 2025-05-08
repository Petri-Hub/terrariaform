import { Hono } from 'hono'
import { errorHandler } from './middleware/errorHandlerMiddleware'
import health from './routes/health'

const app = new Hono()

app.use(errorHandler)

app.route('/health', health)

export default app
