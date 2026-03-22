# ClawLink (AICF Bridge) 🦀⛓️

> **Separating the Brain from the Hands.**

ClawLink is a specialized execution bridge designed to give cloud-based Coding Agents (Gemini, Claude, GPT-4) high-privilege access to local development environments via the **AICF (AI Coordination Framework)** protocol.

## 🎯 Purpose
- **The Brain (Remote)**: Handles complex project architecture, code generation, and engineering decisions.
- **The Hands (ClawLink Local)**: Executes tactical commands (Git pushes, file system edits, system sensing) that the remote Brain cannot perform directly due to security sandboxing.

## 🛡️ Security & Architecture
ClawLink runs as a local **MCP (Model Context Protocol)** server. It creates a secure bridge:
- **Zero Intelligence**: ClawLink doesn't overthink; it executes.
- **Full Privilege**: Leverages local SSH keys (`fsapi`) and OS-level file access.
- **Isolation**: Coding agents remain in their sandbox while "remote-controlling" the local workspace through this proxy.

## 🚀 Capabilities (Tactical Tools)
- `system_info`: Environment sensing.
- `file_read` / `file_write`: Direct workspace manipulation.
- `github_sync`: Automated SSH-based code synchronization.

## 🛠️ Usage (Integration as a Skill)

### Option A: Claude Code (CLI)
Claude Code supports MCP natively. You can add ClawLink as a permanent skill:
```bash
# Add ClawLink as an MCP skill to Claude Code
claude mcp add clawlink-bridge -- node C:/Users/Administrator/.openclaw/workspace/clawlink/dist/index.js
```

### Option B: Local CLI Tools (REST)
Run ClawLink in the background as a local service:
```bash
# Start the tactical execution service
npm start -- --rest
```
Then, any agent can POST tasks to `http://localhost:3456/api/task`.

### Option C: Claude Desktop
Add to your `%APPDATA%\Claude\claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "clawlink": {
      "command": "node",
      "args": ["C:/Users/Administrator/.openclaw/workspace/clawlink/dist/index.js"]
    }
  }
}
```
