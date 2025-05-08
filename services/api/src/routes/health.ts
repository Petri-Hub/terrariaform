import { Hono } from 'hono'

const health = new Hono()

health.get('/', () => {
    return new Response(null, {
        status: 200
    })
})

export default health