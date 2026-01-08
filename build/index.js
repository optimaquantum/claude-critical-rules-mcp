#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Load critical rules content
const rulesPath = join(__dirname, '..', 'CRITICAL-RULES.md');
let rulesContent;
try {
    rulesContent = readFileSync(rulesPath, 'utf-8');
}
catch (error) {
    console.error('Failed to load CRITICAL-RULES.md:', error);
    process.exit(1);
}
// Create MCP server
const server = new Server({
    name: '@optimaquantum/claude-critical-rules-mcp',
    version: '1.0.0',
}, {
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Resource: Critical Rules Document
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    return {
        resources: [
            {
                uri: 'critical-rules://instructions',
                name: 'Claude AI Critical Rules',
                description: 'Mandatory instructions to prevent 96 documented failure patterns',
                mimeType: 'text/markdown',
            },
        ],
    };
});
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    if (request.params.uri === 'critical-rules://instructions') {
        return {
            contents: [
                {
                    uri: request.params.uri,
                    mimeType: 'text/markdown',
                    text: rulesContent,
                },
            ],
        };
    }
    throw new Error(`Unknown resource: ${request.params.uri}`);
});
// Tool: Verify Compliance Checklist
server.setRequestHandler(ListToolsRequestSchema, async () => {
    return {
        tools: [
            {
                name: 'verify_compliance',
                description: 'Verify if all mandatory checks from the critical rules have been completed before starting a technical task',
                inputSchema: {
                    type: 'object',
                    properties: {
                        task_description: {
                            type: 'string',
                            description: 'Brief description of the task you are about to start',
                        },
                    },
                    required: ['task_description'],
                },
            },
            {
                name: 'get_rules_summary',
                description: 'Get a concise summary of the critical rules categories and main requirements',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
        ],
    };
});
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    if (request.params.name === 'verify_compliance') {
        const taskDescription = request.params.arguments?.task_description;
        const checklist = `
## ✅ MANDATORY COMPLIANCE CHECKLIST

Before starting: "${taskDescription}"

Please confirm:

- [ ] ✅ Read complete instructions from critical-rules://instructions
- [ ] ✅ Will search current best practices if applicable
- [ ] ✅ Will read appropriate skills before creating documents
- [ ] ✅ Will read ENTIRE file before modifying
- [ ] ✅ Will VERIFY, NOT assume structures/locations
- [ ] ✅ Will make BACKUPS with timestamp in correct directory
- [ ] ✅ Will ASK before deleting/modifying critical items
- [ ] ✅ Will ask SCOPE before implementing
- [ ] ✅ Will STOP if something fails
- [ ] ✅ Will validate with EVIDENCE, not assumptions
- [ ] ✅ Will search previous context if mentioned

**Only proceed after confirming all items.**

**Based on analysis of 96 documented failures.**
`;
        return {
            content: [
                {
                    type: 'text',
                    text: checklist,
                },
            ],
        };
    }
    if (request.params.name === 'get_rules_summary') {
        const summary = `
## 📋 CRITICAL RULES SUMMARY

**Based on 96 documented failures | 20 recurring patterns**

### Core Principles:
1. **🔍 VERIFY, DON'T ASSUME** - Always check before acting
2. **💾 BACKUP EVERYTHING** - Before any modification
3. **🚫 ASK PERMISSION** - For deletions and critical changes
4. **📊 EVIDENCE-BASED** - Test with proof, not assumptions
5. **🛑 STOP ON ERRORS** - Don't continue after failures

### Key Areas Covered:
- ✅ Current best practices search (mandatory)
- ✅ Complete file reading (not just first lines)
- ✅ Backup procedures (standardized directories)
- ✅ Permission requirements (what needs approval)
- ✅ Code validation (credentials, rate limits)
- ✅ Diagnostics (complete logs, evidence)
- ✅ Database safety (backup, test, rollback)
- ✅ Security (firewall, fail2ban, IPs)
- ✅ Precise communication (no ambiguity)
- ✅ Production vs Dev (critical differentiation)

### 6-Step Mandatory Workflow:
0. Ask scope before starting
1. Analyze completely
2. Plan and explain
3. Create backups
4. Execute carefully
5. Validate with evidence
6. Document changes

**Full details available at: critical-rules://instructions**
`;
        return {
            content: [
                {
                    type: 'text',
                    text: summary,
                },
            ],
        };
    }
    throw new Error(`Unknown tool: ${request.params.name}`);
});
// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error('Claude Critical Rules MCP server running on stdio');
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map