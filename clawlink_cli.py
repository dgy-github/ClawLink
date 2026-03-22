import requests
import json
import sys

# Simple Python client to command ClawLink from any local CLI pipeline
CLAWLINK_URL = "http://localhost:3456/api/task"

def send_task(task_type, payload):
    task = {
        "id": "cli-task",
        "type": task_type,
        "payload": payload
    }
    
    try:
        response = requests.post(CLAWLINK_URL, json=task)
        response.raise_for_status()
        print(json.dumps(response.json(), indent=2))
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Usage Example: python clawlink_cli.py github-sync '{"repoPath": "...", "commitMessage": "test"}'
    if len(sys.argv) < 3:
        print("Usage: python clawlink_cli.py <type> <json_payload>")
        sys.exit(1)
        
    send_task(sys.argv[1], json.loads(sys.argv[2]))
