import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function runCrawlTask(url: string) {
    console.error(`[CrawlExecutor] Scraping content from: ${url}`);
    // A 'dumb' executor that just fetches text content
    // Brain handles the parsing/intelligence
    try {
        const { stdout } = await execAsync(`curl -L "${url}"`);
        return { success: true, content: stdout.substring(0, 5000) }; // Return first 5k chars
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
