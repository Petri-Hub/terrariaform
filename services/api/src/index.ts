import { Hono } from 'hono'
import { env } from 'hono/adapter'

const app = new Hono()

app.get('/', (c) => {
  const { API_HEALTH_CHECK_TEXT } = env(c)

  return c.text(`Hello from Hono! ${API_HEALTH_CHECK_TEXT}`)
})

export default app
