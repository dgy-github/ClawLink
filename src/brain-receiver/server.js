"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startRestServer = startRestServer;
const express_1 = __importDefault(require("express"));
const orchestrator_js_1 = require("../orchestrator.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
function startRestServer(port = 3456) {
    // Basic Task Execution Endpoint
    app.post('/api/task', async (req, res) => {
        const { id, type, payload } = req.body;
        console.error(`\n[REST] 📥 Received Task: [${id || 'anon'}] (${type})`);
        try {
            const result = await orchestrator_js_1.orchestrator.execute({
                id: id || `rest-${Date.now()}`,
                type,
                payload
            });
            res.status(200).json(result);
        }
        catch (err) {
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
//# sourceMappingURL=server.js.map