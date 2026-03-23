import { openClawClient } from "../openclaw-client.js";

export class DashboardExecutor {
    async updateStatus(text: string, progress: number = 0) {
        console.log(`[Dashboard] Updating Canvas A2UI: ${text} (${progress}%)`);
        try {
            return await openClawClient.invokeTool('canvas', { 
                action: 'a2ui_push',
                text: `${text} [${'#'.repeat(Math.floor(progress/10))}${' '.repeat(10-Math.floor(progress/10))}]`
            });
        } catch (error: any) {
            return { error: error.message };
        }
    }
}
