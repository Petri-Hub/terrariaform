import si from "systeminformation";

export abstract class ContainerService{
    static async getContainers(){
        const containers = await si.dockerContainers()
        console.log(containers)
        return containers
    }
}