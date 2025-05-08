import { Context, Next } from 'hono'
import { DomainError } from '../errors/DomainError'

export async function errorHandler(context: Context, next: Next){
    try{
        await next()
    } catch(error){
        if(error instanceof DomainError){
            return Response.json({
                message: error.getMessage(),
                code: error.getCode()
            }, {
                status: error.getStatusCode()
            })
        }

        return Response.error()
    }
}