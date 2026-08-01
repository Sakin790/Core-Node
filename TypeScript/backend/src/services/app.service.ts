import { resourceUsage } from "node:process";

export class AppService {



    static getSystemStatus() {


        return {
            appName: "Core Node API",
            status: "Running smoothly 🚀",
            timestamp: new Date().toISOString(),
        }
    }
}