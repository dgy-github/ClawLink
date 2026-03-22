"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeCommand = executeCommand;
const child_process_1 = require("child_process");
const util_1 = require("util");
const path_1 = __importDefault(require("path"));
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function executeCommand(command, cwd) {
    console.error(`[Terminal] 💻 Executing: "${command}" in ${cwd || process.cwd()}`);
    try {
        const { stdout, stderr } = await execAsync(command, {
            cwd: cwd ? path_1.default.resolve(cwd) : process.cwd(),
            env: { ...process.env, FORCE_COLOR: '1' }
        });
        return {
            success: true,
            stdout,
            stderr
        };
    }
    catch (error) {
        console.error(`[Terminal] ❌ Failed: ${error.message}`);
        return {
            success: false,
            error: error.message,
            stdout: error.stdout,
            stderr: error.stderr
        };
    }
}
//# sourceMappingURL=terminal.js.map