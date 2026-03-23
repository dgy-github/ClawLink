import { syncGitHub } from './executors/github-sync.js';
import { getSystemInfo } from './executors/system-info.js';
import { readFile, writeFile, listFiles } from './executors/file-ops.js';
import { TerminalExecutor } from './executors/terminal.js';
import { VisionExecutor } from './executors/vision.js';
import { MemoryExecutor } from './executors/memory.js';
import { FabricExecutor } from './executors/fabric.js';
import { DashboardExecutor } from './executors/dashboard.js';
import { NotificationExecutor } from './executors/notifications.js';

const terminal = new TerminalExecutor();
const vision = new VisionExecutor();
const memory = new MemoryExecutor();
const fabric = new FabricExecutor();
const dashboard = new DashboardExecutor();
const notifications = new NotificationExecutor();
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
                return await terminal.executeCommand(task.payload.command, task.payload.cwd);
            
            case 'capture-screen':
                return await vision.captureScreen();

            case 'memory-search':
                return await memory.searchMemory(task.payload.query);
            
            case 'memory-add':
                return await memory.addMemory(task.payload.text, task.payload.tags);

            case 'fabric-pattern':
                return await fabric.runPattern(task.payload.pattern, task.payload.input);

            case 'dashboard-update':
                return await dashboard.updateStatus(task.payload.text, task.payload.progress);

            case 'notify':
                return await notifications.notify(task.payload.title, task.payload.message);

            case 'speak':
                return await notifications.speak(task.payload.text);
            
            default:
                throw new Error(`Execution fallback: Unknown AICF action '${task.type}'`);
        }
    }
}

export const orchestrator = new TaskOrchestrator();
