"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_js_1 = require("./mcp-server/index.js");
const server_js_1 = require("./brain-receiver/server.js");
/**
 * ClawLink Dual-Mode Bootloader
 * 1. MCP Mode (Stdio): For MCP-compatible clients (Claude Desktop, etc.)
 * 2. REST Mode (HTTP): For local CLI tools, Python scripts, and Fabric patterns.
 */
// Safe logging for Stdio
console.log = console.error;
const mode = process.argv.includes('--rest') ? 'REST' : 'MCP';
if (mode === 'REST') {
    (0, server_js_1.startRestServer)(3456);
}
else {
    (0, index_js_1.runMcpServer)().catch((error) => {
        console.error("Fatal error starting MCP Server:", error);
    });
}
//# sourceMappingURL=index.js.map