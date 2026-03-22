import { syncGitHub } from '../executors/github-sync';
import { runDocAutomation } from '../executors/doc-automation';
import { scrapeResource } from '../executors/resource-scraper';

export function startBrainReceiver() {
    console.log('[BrainReceiver] Listening for AI planning tasks...');
    
    // Placeholder for actual IPC / Express server / Event listener
    // When a task is received, it routes to executors:
    // e.g., if task.type === 'github-sync' -> syncGitHub()
}
