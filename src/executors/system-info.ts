import { openClawClient } from "../openclaw-client.js";

export async function getSystemInfo() {
    console.log(`[SystemInfo] Delegating to OpenClaw session_status`);
    try {
        const status = await openClawClient.invokeTool('session_status', {});
        return {
            source: 'OpenClaw Gateway',
            ...status
        };
    } catch (error: any) {
        // Fallback to local OS info if delegation fails
        import os from 'os';
        return {
            source: 'Local OS (Fallback)',
            platform: os.platform(),
            arch: os.arch(),
            error: error.message
        };
    }
}
