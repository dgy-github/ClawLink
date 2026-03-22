import { runMcpServer } from './mcp-server/index';
import { startRestServer } from './brain-receiver/server';

/**
 * ClawLink Dual-Mode Bootloader
 * 1. MCP Mode (Stdio): For MCP-compatible clients (Claude Desktop, etc.)
 * 2. REST Mode (HTTP): For local CLI tools, Python scripts, and Fabric patterns.
 */

// Safe logging for Stdio
console.log = console.error;

const mode = process.argv.includes('--rest') ? 'REST' : 'MCP';

if (mode === 'REST') {
    startRestServer(3456);
} else {
    runMcpServer().catch((error) => {
        console.error("Fatal error starting MCP Server:", error);
    });
}
