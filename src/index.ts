import { runMcpServer } from './mcp-server/index';

// IMPORTANT: When standard I/O (stdio) is used for MCP protocol communication,
// any console.log output will corrupt the JSON-RPC messages sent to stdout.
// By redirecting all console.log to console.error (stderr), we preserve logging 
// visibility in Claude's debug windows without breaking the transport.
console.log = console.error;

console.error('🚀 [ClawLink] Starting Plugin as MCP Stdio Server...');

runMcpServer().catch((error) => {
    console.error("Fatal error starting MCP Server:", error);
});
