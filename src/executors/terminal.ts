import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function executeCommand(command: string, cwd?: string) {
    console.error(`[Terminal] 💻 Executing: "${command}" in ${cwd || process.cwd()}`);
    
    try {
        const { stdout, stderr } = await execAsync(command, {
            cwd: cwd ? path.resolve(cwd) : process.cwd(),
            env: { ...process.env, FORCE_COLOR: '1' }
        });
        
        return {
            success: true,
            stdout,
            stderr
        };
    } catch (error: any) {
        console.error(`[Terminal] ❌ Failed: ${error.message}`);
        return {
            success: false,
            error: error.message,
            stdout: error.stdout,
            stderr: error.stderr
        };
    }
}
