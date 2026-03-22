"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCrawlTask = runCrawlTask;
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
async function runCrawlTask(url) {
    console.error(`[CrawlExecutor] Scraping content from: ${url}`);
    // A 'dumb' executor that just fetches text content
    // Brain handles the parsing/intelligence
    try {
        const { stdout } = await execAsync(`curl -L "${url}"`);
        return { success: true, content: stdout.substring(0, 5000) }; // Return first 5k chars
    }
    catch (error) {
        return { success: false, error: error.message };
    }
}
//# sourceMappingURL=crawler.js.map