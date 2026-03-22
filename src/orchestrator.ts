import { syncGitHub } from './executors/github-sync.js';
import { getSystemInfo } from './executors/system-info.js';
import { readFile, writeFile, listFiles } from './executors/file-ops.js';
import { executeCommand } from './executors/terminal.js';
import path from 'path';

export interface AICFTask {
    id: string;
    type: string;
    payload: any;
}

export class TaskOrchestrator {
    async execute(task: AICFTask) {
        console.error(`\n[Orchestrator] 🏎️ Routing AI Task: [${task.id}] (${task.type})`);
        
        switch (task.type) {
            case 'github-sync':
                return await syncGitHub(task.payload.repoPath, task.payload.commitMessage);
            
            case 'get-system-info':
                return { success: true, data: await getSystemInfo() };
            
            case 'read-file':
                return { success: true, data: await readFile(task.payload.path) };
            
            case 'write-file':
                return await writeFile(task.payload.path, task.payload.content);
            
            case 'list-files':
                return { success: true, data: await listFiles(task.payload.path) };
            
            case 'shell-command':
                return await executeCommand(task.payload.command, task.payload.cwd);
            
            default:
                throw new Error(`Execution fallback: Unknown AICF action '${task.type}'`);
        }
    }
}

export const orchestrator = new TaskOrchestrator();
