import si from "systeminformation";
import { CpuUsageDetails } from '../types/CpuUsageDetails'

export abstract class ContainerService{
    static async getContainers(){
        const details: any[] = []

        const [containers, usages] = await Promise.all([
            si.dockerContainers(),
            si.dockerContainerStats()
        ])

        console.log(containers)

        for(const container of containers){
            const usage = usages.find((usage) => {
                return usage.id == container.id
            })

            if(!usage){
                console.log('n achei');
                
                continue
            }

            const cpuUsage: CpuUsageDetails = {
                total: usage?.cpuPercent
            }

            details.push({
                id: container.id,
                name: container.name,
                image: container.image,
                status: container.state.toUpperCase(),
                usage: {
                    cpu: {
                        total: usages
                    }
                },
                createdAt: container.createdAt,
                startedAt: container.startedAt,
                finishedAt: container.finishedAt
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