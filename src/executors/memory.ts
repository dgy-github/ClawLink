import { openClawClient } from "../openclaw-client.js";

export class MemoryExecutor {
    async searchMemory(query: string) {
        console.log(`[Memory] Searching long-term memory for: ${query}`);
        try {
            return await openClawClient.invokeTool('memory_search', { query });
        } catch (error: any) {
            return { error: error.message };
        }
    }

    async addMemory(text: string, tags: string[] = []) {
        console.log(`[Memory] Adding entry to long-term memory...`);
        try {
            return await openClawClient.invokeTool('memory_add', { text, tags });
        } catch (error: any) {
            return { error: error.message };
        }
    }
}
