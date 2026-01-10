# Claude Critical Rules MCP Server

> **MCP server providing automatic enforcement of 21 critical rules for Claude AI, based on 96+ documented failure patterns**

[![npm version](https://badge.fury.io/js/@optimaquantum%2Fclaude-critical-rules-mcp-new.svg)](https://www.npmjs.com/package/@optima-quantum/claude-critical-rules-mcp-new)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.2.0-blue.svg)](https://github.com/optimaquantum/claude-critical-rules-mcp/releases)

## 🎯 What is this?

An MCP (Model Context Protocol) server that makes critical best practices automatically available to Claude AI in every conversation. Based on exhaustive analysis of **96+ real documented failures** over 6+ months of intensive production usage.

The system provides **21 numbered rules** organized into 5 categories, with automatic verification checklists, rule summaries, and auto-update capabilities.

## ✨ Features

- **21 Critical Rules** - Comprehensive checklist preventing common AI assistant failures
- **5 Rule Categories** - Organized by: Verification, Backups, Execution, Database, Advanced
- **Pre-flight Verification** - Mandatory checklist before technical tasks
- **Auto-Update System** - Check and install rule updates from GitHub automatically
- **Version Tracking** - SHA256 verification and changelog integration
- **Evidence-based** - Every rule derived from real production failures

## ⚡ Quick Install

### Via npx (Recommended)

Add to your `claude_desktop_config.json`:

**macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`  
**Windows:** `%APPDATA%\Claude\claude_desktop_config.json`  
**Linux:** `~/.config/Claude/claude_desktop_config.json`

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

After configuration, restart Claude Desktop to load the MCP server.

## 📋 Usage Instructions

### **CRITICAL: Two Mandatory Steps Before Any Technical Task**

#### 1. **ALWAYS Read, Understand, and Execute Compliance Check**

```
Before starting ANY technical task, execute:
critical-rules:verify_compliance

This displays a 21-point checklist organized in 5 categories.
Do NOT proceed until you confirm ALL 21 items.
```

#### 2. **ALWAYS Read Appropriate Skill Documentation**

```
Before creating documents or working with specific technologies:
- Read the appropriate skill file first
- Common location: /mnt/skills/user/sysadmin-professional/SKILL.md
- If skill doesn't exist: search online, verify reliability, propose installation
```

**Example Workflow:**
```
User: "Deploy the new API to production"

Claude:
1. Executes: critical-rules:verify_compliance
2. Reviews all 21 rules checklist
3. Reads: /mnt/skills/user/sysadmin-professional/SKILL.md
4. THEN proceeds with deployment
```

## 🛠️ Available Tools

### `verify_compliance`
Displays mandatory 21-rule checklist before technical tasks.

**Usage:**
```javascript
critical-rules:verify_compliance
task_description: "Deploy API to production"
```

**Returns:**
- 21-point checklist organized by category
- Rule numbers and descriptions
- Confirmation requirements
- Version information

### `get_rules_summary`
Quick reference of all 21 rules with descriptions.

**Usage:**
```javascript
critical-rules:get_rules_summary
```

**Returns:**
- Core principles (5 items)
- All 21 rules by category
- 6-step mandatory workflow
- Update instructions

### `get_version_info`
Display current version and check for updates.

**Usage:**
```javascript
critical-rules:get_version_info
check_remote: true  // Optional, default true
```

**Returns:**
- Current version details
- Remote version comparison
- Update availability status
- SHA256 hash information

### `check_for_updates`
Check GitHub for new rule versions.

**Usage:**
```javascript
critical-rules:check_for_updates
```

**Returns:**
- Update availability status
- Version comparison
- Release date
- Changelog reference

### `update_rules`
Download and install latest rules from GitHub.

**Usage:**
```javascript
critical-rules:update_rules
force: false  // Optional, force reinstall
```

**Returns:**
- Update status
- SHA256 verification
- Backup location
- Next steps

## 📚 Available Resources

### `critical-rules://instructions`
Complete CRITICAL-RULES.md document with all 21 rules, examples, and detailed explanations.

### `critical-rules://changelog`
Full changelog with version history and update details.

## 📖 The 21 Rules (Quick Reference)

### 🔍 VERIFICATION (Rules 0-5)
0. Never act without reading instructions completely
1. Search current best practices (web_search mandatory)
2. Read skills before creating documents
3. Read ENTIRE file before modifying
4. VERIFY, not assume structures/locations
5. Check correct file/server

### 💾 BACKUPS & PERMISSIONS (Rules 6-8)
6. Search previous context if mentioned
7. Backups with timestamp in standardized directories
8. ASK before deleting/modifying critical items

### 🔧 EXECUTION & VALIDATION (Rules 9-12)
9. Ask SCOPE before implementing
10. STOP if something fails (no cascading)
11. Validate with EVIDENCE
12. Complete logs (not just last 20 lines)

### 🗃️ DATABASE & SECURITY (Rules 13-15)
13. Database: backup → test → verify rollback
14. Production vs Dev differentiation
15. Security verification (IPs, fail2ban, firewall)

### ⚡ ADVANCED RULES (Rules 16-21)
16. Long commands (>30s) → background execution
17. NEVER use sed (python/awk/perl instead)
18. Verify file line count before/after editing
19. Follow instructions EXACTLY
20. Check MCPs/skills/context FIRST
21. Mandatory 21-point confirmation

## 🎯 Core Principles

1. **🔍 VERIFY, DON'T ASSUME** - Always check before acting
2. **💾 BACKUP EVERYTHING** - Before any modification
3. **🚫 ASK PERMISSION** - For deletions and critical changes
4. **📊 EVIDENCE-BASED** - Test with proof, not assumptions
5. **🛑 STOP ON ERRORS** - Don't continue after failures

## 🔄 6-Step Mandatory Workflow

0. **Ask scope** before starting
1. **Analyze** completely
2. **Plan** and explain
3. **Create backups**
4. **Execute** carefully
5. **Validate** with evidence
6. **Document** changes

## 📊 Evidence Base

Based on comprehensive analysis of:
- **96+ documented failures** in production environments
- **20+ recurring patterns** identified and categorized
- **6+ months** of intensive Claude AI usage
- **Multiple production systems** (servers, databases, APIs, deployments)

## 🔐 Auto-Update Security

- **SHA256 verification** - All downloaded rules verified for integrity
- **Automatic backups** - Previous versions saved before updates
- **Version tracking** - Complete changelog and version history
- **Manual override** - Force parameter for explicit reinstalls

## 🤝 Contributing

Contributions are welcome! If you've identified additional failure patterns or improvements:

1. Fork the repository
2. Create a feature branch
3. Document the failure pattern with examples
4. Submit a pull request

## 📄 License

MIT License - See [LICENSE](LICENSE) file for details.

## 🏢 Author

**Óptima Quantum Services FZCO**  
Dubai, UAE

- Website: [optimaquantum.com](https://optimaquantum.com)
- Email: support@optimaquantum.com
- GitHub: [@optimaquantum](https://github.com/optimaquantum)

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.

## 🔗 Links

- [npm Package](https://www.npmjs.com/package/@optima-quantum/claude-critical-rules-mcp-new)
- [GitHub Repository](https://github.com/optimaquantum/claude-critical-rules-mcp)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Claude AI](https://claude.ai)

## ⭐ Star History

If this MCP server has helped prevent errors in your workflow, please consider starring the repository!

---

**Version:** 1.2.0  
**Last Updated:** 2026-01-10  
**Rules Count:** 21 numbered rules  
**Failure Patterns Analyzed:** 96+
