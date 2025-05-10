import si from "systeminformation";
import { ContainerUsageDetails } from "../types/ContainerUsageDetails";
import { simplifyPercentage } from '../utils/simplifyPercentage'

export abstract class ContainerService{
    static async getContainers(){
        const details: any[] = []

        const [containers, usages] = await Promise.all([
            si.dockerContainers(),
            si.dockerContainerStats()
        ])

        for(const container of containers){
            const usage = usages.find((usage) => {
                return usage.id == container.id
            })

            if(!usage){
                continue
            }

            const containerUsage: ContainerUsageDetails = {
                cpu: simplifyPercentage(usage.cpuPercent),
                memory: usage.memUsage
            }

            details.push({
                id: container.id,
                name: container.name,
                image: container.image,
                status: container.state.toUpperCase(),
                usage: containerUsage,
                createdAt: container.createdAt,
                startedAt: container.startedAt
            })
        }
        

        return details
    }

    static async getContainer(id: string){
        const containers = await ContainerService.getContainers()
        const target = containers.find(container => container.id === id)

        return target
    }
}