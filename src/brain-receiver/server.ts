import express from 'express';
import { syncGitHub } from '../executors/github-sync';
import { runDocAutomation } from '../executors/doc-automation';
import { scrapeResource } from '../executors/resource-scraper';

const app = express();
app.use(express.json());

export function startBrainReceiver(port: number = 3456) {
    app.post('/api/task', async (req, res) => {
        const { id, type, payload } = req.body;
        console.log(`\n[BrainReceiver] ⚡ Received Task [${id}] of type: ${type}`);
        console.log(`[BrainReceiver] Payload:`, payload);

        try {
            if (type === 'github-sync') {
                const result = await syncGitHub(payload.repoPath, payload.commitMessage);
                if (result.success) {
                    res.status(200).json({ status: 'success', taskId: id, message: 'Sync complete' });
                } else {
                    res.status(500).json({ status: 'error', taskId: id, error: result.error });
                }
            } else if (type === 'doc-automation') {
                await runDocAutomation(payload.targetFile, payload.content);
                res.status(200).json({ status: 'success', taskId: id });
            } else if (type === 'resource-scraper') {
                await scrapeResource(payload.url);
                res.status(200).json({ status: 'success', taskId: id });
            } else {
                res.status(400).json({ status: 'error', error: `Unknown task type: ${type}` });
            }
        } catch (err: any) {
            console.error(`❌ [BrainReceiver] Task execution failed:`, err);
            res.status(500).json({ status: 'error', taskId: id, error: err.message });
        }
    });

    app.listen(port, () => {
        console.log(`\n✅ [BrainReceiver] Listening for AI planning tasks on http://localhost:${port}`);
        console.log(`   Waiting for POST requests to /api/task...`);
    });
}
