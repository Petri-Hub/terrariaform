import { Hono } from 'hono'
import { errorHandler } from './middlewares/errorHandlerMiddleware'
import { health } from './routes/health'
import { system } from './routes/system'

const app = new Hono()

app.use(errorHandler)

app.route('/health', health)
app.route('/system', system)

export default app
