# Changelog

All notable changes to Claude Critical Rules MCP will be documented in this file.

## [1.1.0] - 2026-01-08

### Added
- 🔄 **Auto-update system** - Check and install rule updates from GitHub
- ✅ **New tool:** `check_for_updates` - Verify if new version available
- ✅ **New tool:** `update_rules` - Download and install latest rules
- ✅ **New tool:** `get_version_info` - View current and remote version info
- 📝 **New resource:** `critical-rules://changelog` - View update history
- 🔒 **SHA256 verification** - Ensure file integrity on updates
- 💾 **Automatic backups** - Previous version saved before updating

### Changed
- Enhanced `verify_compliance` to show current version
- Enhanced `get_rules_summary` to include version info
- Server startup now displays version and rules count

## [1.0.0] - 2026-01-08

### Initial Release
- 📋 **96 documented failure patterns** analyzed
- 🎯 **20 recurring patterns** identified
- 📚 **636 lines** of comprehensive guidance
- ✅ **Tool:** `verify_compliance` - 11-point mandatory checklist
- ✅ **Tool:** `get_rules_summary` - Quick reference guide
- 📝 **Resource:** `critical-rules://instructions` - Complete ruleset
