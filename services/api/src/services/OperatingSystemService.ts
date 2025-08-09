import si from "systeminformation";
import { OperatingSystemDetails } from "../types/OperatingSystemDetails";
import { OperatingSystemDetailsRetrievalError } from "../errors/OperatingSystemDetailsRetrievalError";

export abstract class OperatingSystemService{
    static async getDetails(): Promise<OperatingSystemDetails> {
        try {
            const { platform, distro, codename, arch, release } = await si.osInfo()

            return {
                platform,
                distro,
                codename,
                arch,
                release
            }
        } catch(error) {
            throw new OperatingSystemDetailsRetrievalError(error instanceof Error ? error : new Error(String(error)))
        }
    }
}