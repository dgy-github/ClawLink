import express from 'express';
import { orchestrator } from '../orchestrator';

const app = express();
app.use(express.json());

export function startRestServer(port: number = 3456) {
    // Basic Task Execution Endpoint
    app.post('/api/task', async (req, res) => {
        const { id, type, payload } = req.body;
        
        console.error(`\n[REST] 📥 Received Task: [${id || 'anon'}] (${type})`);
        
        try {
            const result = await orchestrator.execute({
                id: id || `rest-${Date.now()}`,
                type,
                payload
            });
            res.status(200).json(result);
        } catch (err: any) {
            console.error(`[REST] ❌ Execution failed: ${err.message}`);
            res.status(500).json({ success: false, error: err.message });
        }
    });

    // Simple Heartbeat/Ping
    app.get('/api/status', async (req, res) => {
        res.json({ status: 'online', service: 'ClawLink AICF Bridge' });
    });

    app.listen(port, () => {
        console.error(`\n🚀 [ClawLink REST] Listening on http://localhost:${port}`);
        console.error(`   Perfect for local CLI tools (fabric, custom scripts, etc.)`);
    });
}
