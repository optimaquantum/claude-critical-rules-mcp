# Contributing to Claude Critical Rules MCP

Thank you for your interest in contributing! This MCP server helps prevent real failures documented from production usage.

## 🎯 How to Contribute

### Report New Failure Patterns

If you've experienced Claude AI failures not covered in the current rules:

1. Open an issue with template "New Failure Pattern"
2. Include:
   - What went wrong
   - What Claude should have done
   - Frequency (how often it happens)
   - Impact (severity)
   - Your proposed rule addition

### Improve Existing Rules

1. Fork the repository
2. Make your changes to `CRITICAL-RULES.md`
3. Update the main repository: [claude-ai-best-practices](https://github.com/optimaquantum/claude-ai-best-practices)
4. Submit a Pull Request

### Add New MCP Tools

Have ideas for additional tools to enforce compliance?

1. Add tool definition in `src/index.ts`
2. Update README with usage examples
3. Add tests (coming soon)
4. Submit PR

## 🔧 Development Setup

```bash
git clone https://github.com/optimaquantum/claude-critical-rules-mcp.git
cd claude-critical-rules-mcp
npm install
npm run build
```

## 📝 Code Style

- TypeScript strict mode
- ESModules (not CommonJS)
- Follow existing patterns in `src/index.ts`

## 🚀 Release Process

1. Update version in `package.json`
2. Update CHANGELOG.md
3. Create git tag
4. Publish to npm (maintainers only)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

- Open an issue
- Email: support@optimaquantum.com
