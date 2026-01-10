#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListResourcesRequestSchema, ListToolsRequestSchema, ReadResourceRequestSchema, } from '@modelcontextprotocol/sdk/types.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createHash } from 'crypto';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Paths
const rulesPath = join(__dirname, '..', 'CRITICAL-RULES.md');
const versionPath = join(__dirname, '..', 'version.json');
const changelogPath = join(__dirname, '..', 'CHANGELOG.md');
// GitHub URLs
const GITHUB_RAW_URL = 'https://raw.githubusercontent.com/optimaquantum/claude-critical-rules-mcp/main/CRITICAL-RULES.md';
const GITHUB_VERSION_URL = 'https://raw.githubusercontent.com/optimaquantum/claude-critical-rules-mcp/main/version.json';
const GITHUB_CHANGELOG_URL = 'https://raw.githubusercontent.com/optimaquantum/claude-critical-rules-mcp/main/CHANGELOG.md';
function loadVersion() {
    if (existsSync(versionPath)) {
        return JSON.parse(readFileSync(versionPath, 'utf-8'));
    }
    return {
        version: '1.0.0',
        date: new Date().toISOString(),
        sha256: calculateSHA256(readFileSync(rulesPath, 'utf-8')),
        rulesCount: 21 // Updated to reflect 21 rules in CRITICAL-RULES.md
    };
}
function saveVersion(versionInfo) {
    writeFileSync(versionPath, JSON.stringify(versionInfo, null, 2));
}
function calculateSHA256(content) {
    return createHash('sha256').update(content).digest('hex');
}
async function fetchFromGitHub(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    return await response.text();
}
// Load critical rules content
let rulesContent;
let currentVersion;
try {
    rulesContent = readFileSync(rulesPath, 'utf-8');
    currentVersion = loadVersion();
}
catch (error) {
    console.error('Failed to load CRITICAL-RULES.md:', error);
    process.exit(1);
}
// Create MCP server
const server = new Server({
    name: '@optima-quantum/claude-critical-rules-mcp-new',
    version: currentVersion.version,
}, {
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Resource: Critical Rules Document + Changelog
server.setRequestHandler(ListResourcesRequestSchema, async () => {
    const resources = [
        {
            uri: 'critical-rules://instructions',
            name: 'Claude AI Critical Rules',
            description: 'Mandatory instructions to prevent 96 documented failure patterns',
            mimeType: 'text/markdown',
        }
    ];
    // Add changelog if exists
    if (existsSync(changelogPath)) {
        resources.push({
            uri: 'critical-rules://changelog',
            name: 'Rules Changelog',
            description: 'History of updates and changes to the critical rules',
            mimeType: 'text/markdown',
        });
    }
    return { resources };
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
    if (request.params.uri === 'critical-rules://changelog') {
        if (existsSync(changelogPath)) {
            const changelog = readFileSync(changelogPath, 'utf-8');
            return {
                contents: [
                    {
                        uri: request.params.uri,
                        mimeType: 'text/markdown',
                        text: changelog,
                    },
                ],
            };
        }
    }
    throw new Error(`Unknown resource: ${request.params.uri}`);
});
// Tools: Original + New Update Tools
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
            {
                name: 'get_version_info',
                description: 'Get current version information and check if updates are available',
                inputSchema: {
                    type: 'object',
                    properties: {
                        check_remote: {
                            type: 'boolean',
                            description: 'Whether to check GitHub for latest version (default: true)',
                        },
                    },
                },
            },
            {
                name: 'check_for_updates',
                description: 'Check if a new version of the critical rules is available on GitHub',
                inputSchema: {
                    type: 'object',
                    properties: {},
                },
            },
            {
                name: 'update_rules',
                description: 'Download and install the latest version of critical rules from GitHub',
                inputSchema: {
                    type: 'object',
                    properties: {
                        force: {
                            type: 'boolean',
                            description: 'Force update even if already on latest version (default: false)',
                        },
                    },
                },
            },
        ],
    };
});
// Tool Handlers
server.setRequestHandler(CallToolRequestSchema, async (request) => {
    // Original verify_compliance tool
    if (request.params.name === 'verify_compliance') {
        const taskDescription = request.params.arguments?.task_description;
        const checklist = `
## ✅ MANDATORY COMPLIANCE CHECKLIST (21 RULES)

Before starting: "${taskDescription}"

Please confirm ALL 21 items:

### 🔍 CORE VERIFICATION (Rules 0-5)
- [ ] ✅ Rule 0: Read complete instructions from critical-rules://instructions
- [ ] ✅ Rule 1: Will search current best practices if applicable
- [ ] ✅ Rule 2: Will read appropriate skills before creating documents
- [ ] ✅ Rule 3: Will read ENTIRE file before modifying (not just first lines)
- [ ] ✅ Rule 4: Will VERIFY, NOT assume structures/locations
- [ ] ✅ Rule 5: Will check CORRECT file/server before acting

### 💾 BACKUPS & PERMISSIONS (Rules 6-8)
- [ ] ✅ Rule 6: Will search previous context if mentioned (conversation_search)
- [ ] ✅ Rule 7: Will make BACKUPS with timestamp in correct directory
- [ ] ✅ Rule 8: Will ASK before deleting/modifying critical items

### 🔧 EXECUTION & VALIDATION (Rules 9-12)
- [ ] ✅ Rule 9: Will ask SCOPE before implementing
- [ ] ✅ Rule 10: Will STOP if something fails (no cascading errors)
- [ ] ✅ Rule 11: Will validate with EVIDENCE, not assumptions
- [ ] ✅ Rule 12: Will check complete logs (not just last 20 lines)

### 🗃️ DATABASE & SECURITY (Rules 13-15)
- [ ] ✅ Rule 13: Database changes: backup → test → verify rollback
- [ ] ✅ Rule 14: Production vs Dev: ALWAYS ask which environment
- [ ] ✅ Rule 15: Security: verify IPs, fail2ban, firewall rules

### ⚡ ADVANCED RULES (Rules 16-21)
- [ ] ✅ Rule 16: Long commands (>30s): use tmux/nohup background execution
- [ ] ✅ Rule 17: NEVER use sed (use python/awk/perl instead)
- [ ] ✅ Rule 18: Verify file line count before AND after editing
- [ ] ✅ Rule 19: Follow instructions EXACTLY - no exceptions
- [ ] ✅ Rule 20: Check available MCPs/skills/context FIRST
- [ ] ✅ Rule 21: Confirm ALL 21 rules before starting

**Only proceed after confirming ALL 21 items.**

**Based on analysis of 96+ documented failures.**
**Rules version: ${currentVersion.version} (${currentVersion.date.split('T')[0]})**
`;
        return {
            content: [{ type: 'text', text: checklist }],
        };
    }
    // Original get_rules_summary tool
    if (request.params.name === 'get_rules_summary') {
        const summary = `
## 📋 CRITICAL RULES SUMMARY (21 RULES)

**Version: ${currentVersion.version} | Updated: ${currentVersion.date.split('T')[0]}**
**Based on 96+ documented failures | 20+ recurring patterns**

### Core Principles:
1. **🔍 VERIFY, DON'T ASSUME** - Always check before acting
2. **💾 BACKUP EVERYTHING** - Before any modification
3. **🚫 ASK PERMISSION** - For deletions and critical changes
4. **📊 EVIDENCE-BASED** - Test with proof, not assumptions
5. **🛑 STOP ON ERRORS** - Don't continue after failures

### 21 Rules Quick Reference:

**VERIFICATION (0-5):**
- Rule 0: Never act without reading instructions completely
- Rule 1: Search current best practices (web_search mandatory)
- Rule 2: Read skills before creating documents
- Rule 3: Read ENTIRE file before modifying
- Rule 4: VERIFY, not assume structures/locations
- Rule 5: Check correct file/server

**BACKUPS & PERMISSIONS (6-8):**
- Rule 6: Search previous context if mentioned
- Rule 7: Backups with timestamp in standardized directories
- Rule 8: ASK before deleting/modifying critical items

**EXECUTION & VALIDATION (9-12):**
- Rule 9: Ask SCOPE before implementing
- Rule 10: STOP if something fails (no cascading)
- Rule 11: Validate with EVIDENCE
- Rule 12: Complete logs (not just last 20 lines)

**DATABASE & SECURITY (13-15):**
- Rule 13: Database: backup → test → verify rollback
- Rule 14: Production vs Dev differentiation
- Rule 15: Security verification (IPs, fail2ban, firewall)

**ADVANCED RULES (16-21):**
- Rule 16: Long commands (>30s) → background execution
- Rule 17: NEVER use sed (python/awk/perl instead)
- Rule 18: Verify file line count before/after editing
- Rule 19: Follow instructions EXACTLY
- Rule 20: Check MCPs/skills/context FIRST
- Rule 21: Mandatory 21-point confirmation

### 6-Step Mandatory Workflow:
0. Ask scope before starting
1. Analyze completely
2. Plan and explain
3. Create backups
4. Execute carefully
5. Validate with evidence
6. Document changes

**Full details: critical-rules://instructions**
**Updates: Use check_for_updates tool**
`;
        return {
            content: [{ type: 'text', text: summary }],
        };
    }
    // NEW: get_version_info tool
    if (request.params.name === 'get_version_info') {
        const checkRemote = request.params.arguments?.check_remote !== false;
        let remoteInfo = null;
        if (checkRemote) {
            try {
                const remoteVersionData = await fetchFromGitHub(GITHUB_VERSION_URL);
                remoteInfo = JSON.parse(remoteVersionData);
            }
            catch (error) {
                remoteInfo = { error: 'Unable to check remote version' };
            }
        }
        const info = `
## 📦 VERSION INFORMATION

### Current Version
- **Version:** ${currentVersion.version}
- **Date:** ${currentVersion.date.split('T')[0]}
- **SHA256:** ${currentVersion.sha256.substring(0, 16)}...
- **Rules Count:** ${currentVersion.rulesCount} documented failures

${remoteInfo && !remoteInfo.error ? `
### Remote Version (GitHub)
- **Latest:** ${remoteInfo.version}
- **Date:** ${remoteInfo.date.split('T')[0]}
- **Status:** ${remoteInfo.version === currentVersion.version ? '✅ Up to date' : '🔄 Update available'}

${remoteInfo.version !== currentVersion.version ? `
**New version available!**
Use \`update_rules\` tool to download the latest version.
` : ''}
` : remoteInfo?.error ? `
### Remote Check
❌ ${remoteInfo.error}
` : ''}

### Auto-Update
- Check for updates: \`check_for_updates\`
- Install updates: \`update_rules\`
- View changelog: Read resource \`critical-rules://changelog\`
`;
        return {
            content: [{ type: 'text', text: info }],
        };
    }
    // NEW: check_for_updates tool
    if (request.params.name === 'check_for_updates') {
        try {
            const remoteVersionData = await fetchFromGitHub(GITHUB_VERSION_URL);
            const remoteVersion = JSON.parse(remoteVersionData);
            const updateAvailable = remoteVersion.version !== currentVersion.version;
            const message = updateAvailable
                ? `
## 🔄 UPDATE AVAILABLE

**Current Version:** ${currentVersion.version}
**Latest Version:** ${remoteVersion.version}
**Release Date:** ${remoteVersion.date.split('T')[0]}

### What's New
- Rules count updated: ${remoteVersion.rulesCount} patterns
- Last updated: ${remoteVersion.date.split('T')[0]}

### To Update
Run: \`update_rules\` tool

### Changelog
Read resource: \`critical-rules://changelog\`
`
                : `
## ✅ UP TO DATE

**Current Version:** ${currentVersion.version}
**Date:** ${currentVersion.date.split('T')[0]}

You're running the latest version of critical rules.

**Next Check:** Run \`check_for_updates\` anytime
`;
            return {
                content: [{ type: 'text', text: message }],
            };
        }
        catch (error) {
            return {
                content: [{
                        type: 'text',
                        text: `❌ Failed to check for updates: ${error instanceof Error ? error.message : 'Unknown error'}`
                    }],
            };
        }
    }
    // NEW: update_rules tool
    if (request.params.name === 'update_rules') {
        const force = request.params.arguments?.force === true;
        try {
            // Check if update needed
            const remoteVersionData = await fetchFromGitHub(GITHUB_VERSION_URL);
            const remoteVersion = JSON.parse(remoteVersionData);
            if (!force && remoteVersion.version === currentVersion.version) {
                return {
                    content: [{
                            type: 'text',
                            text: `✅ Already on latest version (${currentVersion.version})\n\nUse \`force: true\` to reinstall anyway.`
                        }],
                };
            }
            // Download new rules
            const newRules = await fetchFromGitHub(GITHUB_RAW_URL);
            // Verify integrity
            const newSHA256 = calculateSHA256(newRules);
            if (newSHA256 !== remoteVersion.sha256) {
                throw new Error('SHA256 mismatch - file may be corrupted');
            }
            // Backup current version
            const backupPath = join(__dirname, '..', `CRITICAL-RULES.backup.${currentVersion.version}.md`);
            writeFileSync(backupPath, rulesContent);
            // Write new rules
            writeFileSync(rulesPath, newRules);
            rulesContent = newRules;
            // Download changelog if available
            try {
                const changelog = await fetchFromGitHub(GITHUB_CHANGELOG_URL);
                writeFileSync(changelogPath, changelog);
            }
            catch (e) {
                // Changelog optional
            }
            // Update version
            currentVersion = remoteVersion;
            saveVersion(remoteVersion);
            const successMessage = `
## ✅ UPDATE SUCCESSFUL

**Previous Version:** ${JSON.parse(readFileSync(backupPath, 'utf-8')).version || 'Unknown'}
**New Version:** ${remoteVersion.version}
**Updated:** ${new Date().toISOString().split('T')[0]}

### Changes
- Rules count: ${remoteVersion.rulesCount} patterns
- SHA256 verified: ✅
- Backup created: ${backupPath}

### What's Next
- Read changelog: \`critical-rules://changelog\`
- View new rules: \`critical-rules://instructions\`
- Get summary: \`get_rules_summary\`

**🔄 Server restart recommended for full effect**
`;
            return {
                content: [{ type: 'text', text: successMessage }],
            };
        }
        catch (error) {
            return {
                content: [{
                        type: 'text',
                        text: `❌ Update failed: ${error instanceof Error ? error.message : 'Unknown error'}\n\nYour current rules remain unchanged.`
                    }],
            };
        }
    }
    throw new Error(`Unknown tool: ${request.params.name}`);
});
// Start server
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`Claude Critical Rules MCP server v${currentVersion.version} running on stdio`);
    console.error(`Rules loaded: ${currentVersion.rulesCount} patterns | Updated: ${currentVersion.date.split('T')[0]}`);
}
main().catch((error) => {
    console.error('Fatal error:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map