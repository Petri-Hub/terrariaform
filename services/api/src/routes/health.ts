import { Hono } from 'hono'
import { StatusCode } from '../constants/StatusCodes'

const health = new Hono()

health.get('/', () => {
    return new Response(null, {
        status: StatusCode.OK
    })
})

export default health