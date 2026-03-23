import { openClawClient } from "./src/openclaw-client.js";

async function test() {
    await openClawClient.init();
    try {
        const result = await openClawClient.invokeTool('sessions_list', { limit: 1 });
        console.log("Success! Tool 'sessions_list' exists.");
        console.log("Result:", JSON.stringify(result, null, 2));

        // Now try to invoke a non-existent tool to see if we get a 404
        try {
            await openClawClient.invokeTool('non_existent_tool');
        } catch (e: any) {
            console.log("Expected error for non_existent_tool:", e.message);
        }

        // Try 'read'
        try {
            const readResult = await openClawClient.invokeTool('read', { path: 'package.json' });
            console.log("Tool 'read' exists. Sample output:", readResult.toString().substring(0, 50));
        } catch (e: any) {
            console.log("Tool 'read' failed or missing:", e.message);
        }
    } catch (error: any) {
        console.error("Test failed:", error.message);
    }
}

test();
