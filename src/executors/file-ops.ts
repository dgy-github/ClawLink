import { openClawClient } from "../openclaw-client.js";

export async function readFile(filePath: string) {
    console.log(`[FileOps] Delegating READ to OpenClaw: ${filePath}`);
    try {
        return await openClawClient.invokeTool('read', { path: filePath });
    } catch (error: any) {
        return `Read Error: ${error.message}`;
    }
}

export async function writeFile(filePath: string, content: string) {
    console.log(`[FileOps] Delegating WRITE to OpenClaw: ${filePath}`);
    try {
        return await openClawClient.invokeTool('write', { path: filePath, content });
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function listFiles(dirPath: string) {
    console.log(`[FileOps] Delegating LIST to OpenClaw: ${dirPath}`);
    try {
        // Assuming 'list_dir' or checking if 'read' handles directories
        return await openClawClient.invokeTool('ls', { path: dirPath });
    } catch (error: any) {
        try {
            // Fallback to shell if ls tool is missing
             return await openClawClient.invokeTool('exec', { command: `ls -la ${dirPath}` });
        } catch (e) {
            return { success: false, error: error.message };
        }
    }
}
