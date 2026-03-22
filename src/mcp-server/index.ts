import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { orchestrator } from "../orchestrator.js";

const server = new Server(
    {
        name: "clawlink-aicf-bridge",
        version: "1.0.0",
    },
    {
        capabilities: {
            tools: {}
        }
    }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: "system_info",
                description: "Get local system context (OS, CPU, Memory, User, CWD) to orient the coding agent.",
                inputSchema: { type: "object", properties: {} }
            },
            {
                name: "file_read",
                description: "Read the content of a local file in the workspace.",
                inputSchema: {
                    type: "object",
                    properties: {
                        path: { type: "string", description: "Absolute or relative path to the file" }
                    },
                    required: ["path"]
                }
            },
            {
                name: "file_write",
                description: "Write content to a local file. Creates directories if they don't exist.",
                inputSchema: {
                    type: "object",
                    properties: {
                        path: { type: "string", description: "Path to write to" },
                        content: { type: "string", description: "Text content to write" }
                    },
                    required: ["path", "content"]
                }
            },
            {
                name: "github_sync",
                description: "Commit and Push changes to GitHub using local SSH keys.",
                inputSchema: {
                    type: "object",
                    properties: {
                        repoPath: { type: "string" },
                        commitMessage: { type: "string" }
                    },
                    required: ["repoPath", "commitMessage"]
                }
            },
            {
                name: "shell_command",
                description: "Execute a command in the local terminal (e.g., npm test, python main.py).",
                inputSchema: {
                    type: "object",
                    properties: {
                        command: { type: "string", description: "The shell command to run" },
                        cwd: { type: "string", description: "Optional: Directory to run the command in" }
                    },
                    required: ["command"]
                }
            }
        ]
    };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    try {
        // Map MCP Tool Names to Orchestrator Task Types
        const taskMap: Record<string, string> = {
            'system_info': 'get-system-info',
            'file_read': 'read-file',
            'file_write': 'write-file',
            'github_sync': 'github-sync',
            'shell_command': 'shell-command'
        };

        const taskType = taskMap[name];
        if (!taskType) throw new Error(`Tool ${name} not supported by bridge.`);

        const result: any = await orchestrator.execute({
            id: `mcp-${Date.now()}`,
            type: taskType,
            payload: args
        });

        return {
            content: [{ 
                type: "text", 
                text: typeof result.data === 'object' ? JSON.stringify(result.data, null, 2) : (result.message || "Operation successful.") 
            }]
        };
    } catch (error: any) {
        return {
            isError: true,
            content: [{ type: "text", text: error.message }]
        };
    }
});

export async function runMcpServer() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("✅ ClawLink AICF Bridge (MCP) is LIVE.");
}
