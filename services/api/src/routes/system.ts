import { Hono } from 'hono'
import { SystemService } from '../services/SystemService'

export const system = new Hono()

system.get('/os', async () => {
    const information = await SystemService.getOperatingSystemInformation()

    return Response
        .json(information)
})

system.get('/cpu', async () => {
    const information = await SystemService.getCpuDetails()

    return Response
        .json(information)
})

system.get('/memory', async () => {
    const information = await SystemService.getMemoryDetails()

    return Response
        .json(information)
})