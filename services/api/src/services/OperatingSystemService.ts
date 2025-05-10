import si from "systeminformation";
import { OperatingSystemDetails } from "../types/OperatingSystemDetails";

export abstract class OperatingSystemService{
    static async getDetails(): Promise<OperatingSystemDetails> {
        const { platform, distro, codename, arch, release } = await si.osInfo()

        return {
            platform,
            distro,
            codename,
            arch,
            release
        }
    }
}