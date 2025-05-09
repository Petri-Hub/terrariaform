import si from "systeminformation";

export abstract class OperatingSystemService{
    static async getDetails() {
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