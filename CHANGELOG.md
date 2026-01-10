# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2026-01-10

### Added
- **21-Rule Checklist**: `verify_compliance` now shows all 21 rules organized by category
  - Core Verification (Rules 0-5)
  - Backups & Permissions (Rules 6-8)
  - Execution & Validation (Rules 9-12)
  - Database & Security (Rules 13-15)
  - Advanced Rules (Rules 16-21)
- **Enhanced Summary**: `get_rules_summary` includes complete 21-rule reference
- **Rule Categories**: Better organization with emojis for quick scanning

### Changed
- Updated `rulesCount` from 96 (failure patterns) to 21 (numbered rules)
- Improved checklist formatting with clear rule numbers
- Better grouping of related rules for easier comprehension

### Fixed
- Checklist was showing only 11 items instead of complete 21 rules from CRITICAL-RULES.md
- Summary mismatch between document (21 rules) and tool output (11 items)

## [1.1.0] - 2026-01-08

### Added
- Auto-update system with 3 new tools:
  - `check_for_updates`: Check GitHub for new versions
  - `update_rules`: Download and install latest rules
  - `get_version_info`: Display current and remote version info
- New resource: `critical-rules://changelog`
- SHA256 verification for downloaded files
- Automatic backup before updates
- Version tracking with `version.json`

### Changed
- Package name to `@optima-quantum/claude-critical-rules-mcp-new`
- Improved error handling for network operations
- Better status messages for update operations

## [1.0.0] - 2026-01-07

### Added
- Initial release of Critical Rules MCP server
- `verify_compliance` tool for mandatory checklist
- `get_rules_summary` tool for quick reference
- Resource `critical-rules://instructions` with complete rules
- Based on analysis of 96+ documented failure patterns
- 20+ recurring error patterns identified and solved

[1.2.0]: https://github.com/optimaquantum/claude-critical-rules-mcp/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/optimaquantum/claude-critical-rules-mcp/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/optimaquantum/claude-critical-rules-mcp/releases/tag/v1.0.0
