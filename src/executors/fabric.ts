import { openClawClient } from "../openclaw-client.js";

export class FabricExecutor {
    async runPattern(pattern: string, input: string) {
        console.log(`[Fabric] Executing pattern: ${pattern}`);
        try {
            // This assumes a 'fabric' or custom RAG tool is defined in OpenClaw
            // or we use the 'exec' tool to run the fabric CLI
            return await openClawClient.invokeTool('exec', { 
                command: `echo "${input.replace(/"/g, '\\"')}" | fabric --pattern ${pattern}` 
            });
        } catch (error: any) {
            return { error: error.message };
        }
    }
}
