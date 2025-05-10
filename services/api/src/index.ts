import { Hono } from 'hono'
import { errorHandler } from './middlewares/errorHandlerMiddleware'
import { health } from './routes/health'
import { system } from './routes/system'
import { containers } from './routes/containers'

const app = new Hono()

app.use(errorHandler)

app.route('/health', health)
app.route('/system', system)
app.route('/containers', containers)

export default app
