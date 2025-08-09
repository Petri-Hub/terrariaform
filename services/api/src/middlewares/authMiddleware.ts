import { Context, Next } from 'hono'
import { UnauthorizedError } from '../errors/UnauthorizedError'

export async function authMiddleware(context: Context, next: Next) {
    const authHeader = context.req.header('Authorization')
    
    if (!authHeader) {
        throw new UnauthorizedError()
    }
    
    const parts = authHeader.split(' ')
    
    const isAuthorizationPartsDivisionsInvalid = parts.length !== 2
    const isTokenPrefixDifferentThanBearer = parts[0] !== 'Bearer'
    
    if (isAuthorizationPartsDivisionsInvalid || isTokenPrefixDifferentThanBearer) {
        throw new UnauthorizedError()
    }
    
    const token = parts[1]
    const expectedToken = process.env.API_BEARER_TOKEN
    
    if (!expectedToken || token !== expectedToken) {
        throw new UnauthorizedError()
    }
    
    await next()
}