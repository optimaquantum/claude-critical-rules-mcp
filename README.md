# Claude Critical Rules MCP Server

> **MCP server providing automatic enforcement of critical rules for Claude AI, preventing 96 documented failure patterns**

[![npm version](https://badge.fury.io/js/@optimaquantum%2Fclaude-critical-rules-mcp.svg)](https://www.npmjs.com/package/@optima-quantum/claude-critical-rules-mcp-new)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🎯 What is this?

An MCP (Model Context Protocol) server that makes critical best practices automatically available to Claude AI in every conversation. Based on exhaustive analysis of **96 real documented failures** over 6+ months of intensive usage.

## ⚡ Quick Install

### Via npx (Recommended)

Add to your `claude_desktop_config.json`:

**macOS:** `~/Library/Application\ Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "critical-rules": {
      "command": "npx",
      "args": ["-y", "@optima-quantum/claude-critical-rules-mcp-new"]
    }
  }
}
```

### Via Global Install

```bash
npm install -g @optima-quantum/claude-critical-rules-mcp-new
```

Then configure:

```json
{
  "mcpServers": {
    "critical-rules": {
      "command": "claude-critical-rules-mcp"
    }
  }
}
```

### Restart Claude Desktop

After configuration, restart Claude Desktop to load the server.

## 🚀 What You Get

### 1. **Always-Available Critical Rules**

Claude can access the complete ruleset anytime via:
```
critical-rules://instructions
```

The rules cover:
- ✅ Pre-flight verification checks
- ✅ Mandatory backup procedures  
- ✅ Permission requirements
- ✅ Evidence-based testing
- ✅ Error handling protocols
- ✅ Database safety
- ✅ Security best practices
- ✅ Production vs development differentiation

### 2. **Compliance Verification Tool**

```
Use the verify_compliance tool before starting any technical task
```

Returns a mandatory 11-point checklist that Claude must confirm before proceeding.

### 3. **Rules Summary Tool**

```
Use get_rules_summary for a quick overview
```

Provides a concise summary of core principles and key areas.

## 📋 What Problems Does This Solve?

Based on analysis of 96 documented failures, this prevents:

1. **Assuming without verification** (~40 cases)
   - Now requires explicit checks before acting

2. **Not reading complete files** (8+ cases)
   - Mandatory complete file reading enforced

3. **Data destruction without permission** (2 critical cases)
   - Explicit permission required for deletions

4. **Erroneous diagnosis** (7+ cases)
   - Complete logs and evidence required

5. **Directionless iterations** (6+ cases)
   - Stop-and-analyze after 3 failures

**Plus 15 more recurring patterns...**

## 🎓 Key Principles Enforced

### 1. Verify, Don't Assume
```
❌ BAD: "The file probably exists"
✅ GOOD: "Checking if file exists... [verified] confirmed"
```

### 2. Evidence-Based Testing
```
❌ BAD: "Should work now"
✅ GOOD: "Verified working. Evidence: [command output]"
```

### 3. Stop on Errors
```
❌ BAD: Test failed but continuing...
✅ GOOD: Test failed. Error details. How to proceed?
```

### 4. Mandatory Backups
```
✅ ALWAYS: Create timestamped backup before modifications
```

## 🔧 How It Works

### Resource Provided

- **URI:** `critical-rules://instructions`
- **Type:** Markdown document (16,600 bytes)
- **Content:** Complete ruleset with 636 lines of guidance

### Tools Provided

#### `verify_compliance`
- **Input:** Task description
- **Output:** 11-point mandatory checklist
- **Purpose:** Ensure all safety checks before starting work

#### `get_rules_summary`
- **Input:** None
- **Output:** Concise overview of rules
- **Purpose:** Quick reference for core principles

## 📚 Full Documentation

For complete background and analysis:
- **Research Repository:** [claude-ai-best-practices](https://github.com/optimaquantum/claude-ai-best-practices)
- **Full Rules (English):** [CRITICAL-RULES.md](CRITICAL-RULES.md)
- **Rules (Spanish):** [REGLAS-CRITICAS.md](https://github.com/optimaquantum/claude-ai-best-practices/blob/main/REGLAS-CRITICAS.md)

## 🎯 Use Cases

Perfect for:
- **Cybersecurity professionals** - Server hardening, security audits
- **DevOps engineers** - Infrastructure as code, deployment automation
- **Full-stack developers** - Database migrations, API integrations
- **System administrators** - Configuration management, monitoring
- **AI power users** - Anyone doing serious technical work with Claude

## 📊 Expected Impact

Following these rules can:
- **Reduce failures by 70-80%** (eliminates most common patterns)
- **Decrease debugging time by 50%** (better diagnostics)
- **Prevent data loss** (mandatory backups)
- **Improve code quality** (validation requirements)
- **Accelerate development** (clear workflows)

## 🔍 Verification

After installation, test it works:

1. Open Claude Desktop
2. Start a new conversation
3. Ask: "What resources do you have access to?"
4. Claude should mention `critical-rules://instructions`
5. Ask: "Use the verify_compliance tool for 'testing database migration'"
6. Claude should show the 11-point checklist

## 🛠️ Development

### Build from source

```bash
git clone https://github.com/optimaquantum/claude-critical-rules-mcp.git
cd claude-critical-rules-mcp
npm install
npm run build
```

### Local testing

```bash
npm run dev
```

### Project structure

```
claude-critical-rules-mcp/
├── src/
│   └── index.ts          # MCP server implementation
├── CRITICAL-RULES.md     # Complete ruleset
├── package.json
├── tsconfig.json
└── README.md
```

## 🏢 About

Created by [Optima Quantum Services](https://optimaquantum.com) - Cybersecurity & AI consulting firm based in Dubai, UAE.

### Author

**Cesco** - Technical Director
- 15+ years cybersecurity & system administration
- Extensive Claude AI usage across enterprise projects
- Focus: Preventing AI-induced failures in production

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Website:** [optimaquantum.com](https://optimaquantum.com)
- **Research Repository:** [claude-ai-best-practices](https://github.com/optimaquantum/claude-ai-best-practices)
- **npm Package:** [@optima-quantum/claude-critical-rules-mcp-new](https://www.npmjs.com/package/@optima-quantum/claude-critical-rules-mcp-new)
- **Support:** [support@optimaquantum.com](mailto:support@optimaquantum.com)

## 🙏 Acknowledgments

- Anthropic for Claude AI and the MCP protocol
- The MCP community for excellent examples and support
- All the production incidents that taught us these lessons 😅

## 📈 Stats

- **96** documented errors analyzed
- **20** recurring patterns identified
- **636** lines of actionable guidance
- **6+** months of real-world usage
- **4** production environments tested

---

**Made with 🔒 by [Optima Quantum Services](https://optimaquantum.com)**

*Preventing AI failures through automated enforcement*
