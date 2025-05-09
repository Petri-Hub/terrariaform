import { Hono } from 'hono'
import { SystemService } from '../services/SystemService'

export const system = new Hono()

system.get('/', async () => {
    const information = await SystemService.getSystemInformation()

    return Response
        .json(information)
})

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
    const information = await SystemService.getMemoryInformation()

    return Response
        .json(information)
})