import { Hono } from 'hono'
import { ContainerService } from '../services/ContainerService'

export const containers = new Hono()

containers.get('/', () => {
    const containers = ContainerService.getContainers()

    return Response
        .json(containers)
})