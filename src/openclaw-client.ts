import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';

interface OpenClawConfig {
    gateway?: {
        port?: number;
        auth?: {
            token?: string;
        };
    };
}

export class OpenClawClient {
    private baseUrl: string = 'http://127.0.0.1:18789';
    private token: string = '';

    async init() {
        const configPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');
        try {
            const content = await fs.readFile(configPath, 'utf-8');
            const config: OpenClawConfig = JSON.parse(content);
            const port = config.gateway?.port || 18789;
            this.baseUrl = `http://127.0.0.1:${port}`;
            this.token = config.gateway?.auth?.token || '';
            console.log(`[OpenClawClient] Discovered Gateway at ${this.baseUrl}`);
        } catch (error) {
            console.error(`[OpenClawClient] Failed to load config from ${configPath}, using defaults.`);
        }
    }

    async invokeTool(tool: string, args: any = {}, action?: string) {
        const url = `${this.baseUrl}/tools/invoke`;
        const body = {
            tool,
            action,
            args,
            sessionKey: 'main'
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`OpenClaw API Error (${response.status}): ${errorText}`);
        }

        const data = await response.json() as { ok: boolean; result: any; error?: any };
        if (!data.ok) {
            throw new Error(`OpenClaw Tool Error: ${JSON.stringify(data.error)}`);
        }

        return data.result;
    }
}

export const openClawClient = new OpenClawClient();
