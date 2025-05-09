import { Hono } from 'hono'
import { StatusCode } from '../constants/StatusCode'

export const health = new Hono()

health.get('/', () => {
    return new Response(null, {
        status: StatusCode.OK
    })
})