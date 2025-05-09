import { Hono } from 'hono'
import { SystemService } from '../services/SystemService'

export const system = new Hono()

system.get('/os', async () => {
    const details = await SystemService.getOperatingSystemDetails()

    return Response
        .json(details)
})

system.get('/cpu', async () => {
    const details = await SystemService.getCpuDetails()

    return Response
        .json(details)
})

system.get('/memory', async () => {
    const details = await SystemService.getMemoryDetails()

    return Response
        .json(details)
})