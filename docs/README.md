# Lucent UI Documentation Index

Welcome to the Lucent UI documentation! This directory contains additional documentation and guides.

## 📖 Documentation Structure

### Root Documentation

- **[README.md](../README.md)** - Project overview and quick start (in project root)

### Documentation Files (in this directory)

- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Contributing guidelines for developers
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Technical architecture and design decisions
- **[TESTING.md](./TESTING.md)** - Comprehensive testing guidelines
- **[CLAUDE.md](./CLAUDE.md)** - Context for AI assistants (Claude, Cursor, Copilot)

### Component Documentation

Each component has its own documentation:

```
src/components/[ComponentName]/
├── ComponentName.tsx          # Implementation
├── ComponentName.types.ts     # Type definitions
├── ComponentName.stories.tsx  # Storybook documentation
├── ComponentName.test.tsx     # Test suite
└── README.md                  # Additional docs (if needed)
```

Components with README files:

- **[Icon](../src/components/Icon/README.md)** - Icon library usage and available icons
- **[FilterPill](../src/components/FilterPill/README.md)** - Advanced filter component
- **[Select](../src/components/Select/README.md)** - Dropdown/Select component
- **[Alert](../src/components/Alert/README.md)** - Alert/notification component

### Storybook Documentation

Interactive component documentation is available in Storybook:

```bash
npm run dev
# Visit http://localhost:6006
```

Storybook includes:

- Live component demos
- Interactive props playground
- Code examples
- Accessibility documentation
- Design system overview

## 🚀 Getting Started

### For Users

If you're using Lucent UI in your project:

1. Start with the [README.md](../README.md) for installation and basic usage
2. Browse components in [Storybook](http://localhost:6006)
3. Check component-specific READMEs for advanced features

### For Contributors

If you're contributing to Lucent UI:

1. Read [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines
2. Review [ARCHITECTURE.md](./ARCHITECTURE.md) for technical context
3. Follow [TESTING.md](./TESTING.md) for testing standards
4. Check [CLAUDE.md](./CLAUDE.md) if using AI assistants

### For AI Assistants

If you're an AI assistant working on this project:

1. Start with [CLAUDE.md](./CLAUDE.md) for project context
2. Reference [ARCHITECTURE.md](./ARCHITECTURE.md) for patterns
3. Follow [TESTING.md](./TESTING.md) for test requirements
4. Check [CONTRIBUTING.md](./CONTRIBUTING.md) for workflow

## 📋 Documentation Guidelines

### When to Create Documentation

- **Component README**: For complex components with advanced features
- **Root Documentation**: For project-wide guidelines and architecture
- **Inline Comments**: For complex logic or non-obvious code
- **Storybook Stories**: For all components (required)

### Documentation Standards

1. **Clear and Concise** - Get to the point quickly
2. **Examples First** - Show code examples before explaining
3. **Accessible** - Use clear language, avoid jargon
4. **Up to Date** - Update docs when code changes
5. **Searchable** - Use keywords users might search for

### Markdown Style

- Use proper heading hierarchy (# → ## → ###)
- Include table of contents for long documents
- Use code blocks with syntax highlighting
- Add emoji sparingly for visual breaks (📖 🚀 ⚠️)
- Link between related documents

## 🔍 Finding Information

### By Topic

- **Getting Started** → [README.md](../README.md)
- **Architecture** → [ARCHITECTURE.md](./ARCHITECTURE.md)
- **Contributing** → [CONTRIBUTING.md](./CONTRIBUTING.md)
- **Testing** → [TESTING.md](./TESTING.md)
- **AI Context** → [CLAUDE.md](./CLAUDE.md)
- **Design System** → Storybook Introduction
- **Components** → Storybook + Component READMEs

### By Role

**I'm a User**
→ README.md → Storybook → Component READMEs

**I'm a Contributor**
→ CONTRIBUTING.md → ARCHITECTURE.md → TESTING.md → Component code

**I'm an AI Assistant**
→ CLAUDE.md → ARCHITECTURE.md → Component code

**I'm a Designer**
→ Storybook → Design System → Component demos

## 🛠️ Tools & Resources

### Development

- **Storybook** - Component development and documentation
- **Vitest** - Testing framework
- **TypeScript** - Type checking
- **ESLint + Prettier** - Code quality

### External Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Testing Library Docs](https://testing-library.com/)

## 📝 Contributing to Documentation

Found a typo or want to improve documentation?

1. Edit the relevant file
2. Follow the markdown style guide
3. Test any code examples
4. Submit a PR with clear description

## ❓ Questions?

- Check the documentation first
- Search Storybook component docs
- Look at component test files for examples
- Check CLAUDE.md for AI-specific context

---

**Last Updated**: 2026-04-12

This index is maintained to help developers quickly find the information they need. If you find something missing or unclear, please contribute an improvement!
