import { orchestrator } from "./orchestrator.js";
import { runMcpServer } from "./mcp-server/index.js";
import { runBrainReceiver } from "./brain-receiver/server.js";
import { openClawClient } from "./openclaw-client.js";

async function main() {
    // 1. Initialize OpenClaw connection (auto-discovery)
    await openClawClient.init();

    const isRestMode = process.argv.includes('--rest');

    if (isRestMode) {
        console.log("Starting ClawLink in REST mode (Brain-Receiver)...");
        runBrainReceiver(3456);
    } else {
        console.log("Starting ClawLink in MCP mode (stdio)...");
        runMcpServer().catch((error) => {
            console.error("MCP server failed:", error);
            process.exit(1);
        });
    }
}

main().catch((error) => {
    console.error("Failed to start ClawLink:", error);
    process.exit(1);
});
