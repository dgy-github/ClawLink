"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orchestrator = exports.TaskOrchestrator = void 0;
const github_sync_js_1 = require("./executors/github-sync.js");
const system_info_js_1 = require("./executors/system-info.js");
const file_ops_js_1 = require("./executors/file-ops.js");
const terminal_js_1 = require("./executors/terminal.js");
const path_1 = __importDefault(require("path"));
class TaskOrchestrator {
    async execute(task) {
        console.error(`\n[Orchestrator] 🏎️ Routing AI Task: [${task.id}] (${task.type})`);
        switch (task.type) {
            case 'github-sync':
                return await (0, github_sync_js_1.syncGitHub)(task.payload.repoPath, task.payload.commitMessage);
            case 'get-system-info':
                return { success: true, data: await (0, system_info_js_1.getSystemInfo)() };
            case 'read-file':
                return { success: true, data: await (0, file_ops_js_1.readFile)(task.payload.path) };
            case 'write-file':
                return await (0, file_ops_js_1.writeFile)(task.payload.path, task.payload.content);
            case 'list-files':
                return { success: true, data: await (0, file_ops_js_1.listFiles)(task.payload.path) };
            case 'shell-command':
                return await (0, terminal_js_1.executeCommand)(task.payload.command, task.payload.cwd);
            default:
                throw new Error(`Execution fallback: Unknown AICF action '${task.type}'`);
        }
    }
}
exports.TaskOrchestrator = TaskOrchestrator;
exports.orchestrator = new TaskOrchestrator();
//# sourceMappingURL=orchestrator.js.map