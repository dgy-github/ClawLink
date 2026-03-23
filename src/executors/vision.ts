import { openClawClient } from "../openclaw-client.js";

export class VisionExecutor {
    async captureScreen(): Promise<{success: boolean; imagePath?: string; error?: string}> {
        console.log(`[Vision] Requesting screen capture from OpenClaw...`);
        try {
            // First, get the list of nodes to find a target
            const status = await openClawClient.invokeTool('nodes', { action: 'status' });
            const node = status.nodes?.[0]?.id || status.activeNode?.id || 'local';

            // Invoke camera_snap or screen_snap via nodes tool
            const result = await openClawClient.invokeTool('nodes', { 
                action: 'camera_snap',
                node: node
            });

            // OpenClaw returns MEDIA:<path> or the raw result
            return {
                success: true,
                imagePath: result.path || result.mediaPath || result
            };
        } catch (error: any) {
            console.error(`[Vision] Capture failed: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
}
