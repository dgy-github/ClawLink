import { openClawClient } from "../openclaw-client.js";

export class TerminalExecutor {
    async executeCommand(command: string, workdir?: string): Promise<string> {
        console.log(`[Terminal] Delegating to OpenClaw: ${command}`);
        try {
            const result = await openClawClient.invokeTool('exec', {
                command,
                workdir
            });
            // OpenClaw's exec tool returns { stdout, stderr, exitCode ... }
            return result.stdout || result.output || result.stderr || "Command executed (no output).";
        } catch (error: any) {
            return `Delegation Error: ${error.message}`;
        }
    }
}
