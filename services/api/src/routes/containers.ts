import { Hono } from 'hono'
import { ContainerService } from '../services/ContainerService'

export const containers = new Hono()

containers.get('/', async () => {
    const containers = await ContainerService.getContainers()

    return Response
        .json(containers)
})