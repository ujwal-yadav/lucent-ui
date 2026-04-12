# Contributing to Lucent UI

Thank you for your interest in contributing to Lucent UI! This guide will help you get started.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Guidelines](#component-guidelines)
- [Testing Requirements](#testing-requirements)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)
- [Documentation](#documentation)

## Code of Conduct

- Be respectful and constructive in discussions
- Focus on code quality and user experience
- Help others learn and grow
- Follow the project's technical standards

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor with TypeScript support (VS Code recommended)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-org/lucent-ui.git
cd lucent-ui

# Install dependencies
npm install

# Start Storybook for development
npm run dev
```

### Project Structure

```
lucent-ui/
├── src/
│   ├── components/       # UI components
│   ├── hooks/           # Reusable React hooks
│   ├── utils/           # Utility functions
│   └── styles.css       # Global styles
├── .storybook/          # Storybook configuration
├── public/              # Static assets
└── docs/                # Additional documentation
```

## Development Workflow

### 1. Create a Branch

```bash
git checkout -b feature/component-name
# or
git checkout -b fix/issue-description
```

### 2. Make Changes

- Write code following our [Component Guidelines](#component-guidelines)
- Add tests for all new functionality
- Update documentation as needed

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run linting
npm run lint

# Format code
npm run format
```

### 4. Commit Your Changes

```bash
git add .
git commit -m "feat: add new Button variant"
```

**Commit Message Format:**

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### 5. Push and Create PR

```bash
git push origin feature/component-name
```

Then create a Pull Request on GitHub.

## Component Guidelines

### File Structure

Every component should have:

```
ComponentName/
├── ComponentName.tsx          # Implementation
├── ComponentName.types.ts     # TypeScript definitions
├── ComponentName.stories.tsx  # Storybook stories
├── ComponentName.test.tsx     # Tests
├── README.md                  # Documentation (optional)
└── index.ts                   # Exports
```

### Component Template

```tsx
import { forwardRef } from 'react';
import { ComponentNameProps } from './ComponentName.types';
import { cn } from '../../utils/cn';

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'base-classes',
          // variant styles
          // size styles
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ComponentName.displayName = 'ComponentName';
```

### Types Template

```tsx
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface ComponentNameProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
}
```

## Testing Requirements

### Minimum Requirements

1. **Accessibility Tests** - All components must pass axe tests
2. **Unit Tests** - Test all props and states
3. **Interaction Tests** - Test user interactions
4. **Coverage** - Minimum 80% code coverage

### Test Template

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = render(<ComponentName>Test</ComponentName>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  describe('Rendering', () => {
    it('should render with children', () => {
      render(<ComponentName>Test Content</ComponentName>);
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });
  });

  describe('Interactions', () => {
    // Add interaction tests
  });
});
```

See [TESTING.md](./TESTING.md) for comprehensive testing guidelines.

## Code Style

### TypeScript

- Use strict mode (enabled by default)
- No `any` types unless absolutely necessary
- Export all public types
- Use type inference where possible

### React

- Use functional components with hooks
- Use `forwardRef` for components that render DOM elements
- Prefer composition over inheritance
- Keep components small and focused

### Styling

- Use Tailwind utility classes
- Use the `cn()` utility for className merging
- Shadow-as-border technique (no actual borders)
- Follow the design system colors

### Naming Conventions

- Components: `PascalCase` (e.g., `Button`, `SelectDropdown`)
- Files: `PascalCase.tsx` (e.g., `Button.tsx`)
- Utilities: `camelCase` (e.g., `cn`, `useClickOutside`)
- Constants: `UPPER_SNAKE_CASE` (e.g., `DEFAULT_TIMEOUT`)

## Pull Request Process

### Before Submitting

- [ ] All tests pass (`npm test`)
- [ ] Code is formatted (`npm run format`)
- [ ] No linting errors (`npm run lint`)
- [ ] Documentation is updated
- [ ] Storybook stories are added/updated
- [ ] Accessibility tests pass

### PR Checklist

Your PR should include:

1. **Clear description** of changes
2. **Screenshots/GIFs** for UI changes (use Storybook)
3. **Test coverage** for new features
4. **Documentation updates** if API changed
5. **Breaking changes** clearly marked

### PR Title Format

```
type(scope): description

Examples:
feat(Button): add loading state
fix(Select): resolve keyboard navigation bug
docs(README): update installation instructions
```

### Review Process

1. Automated checks run (tests, linting, coverage)
2. At least one maintainer review required
3. Address review feedback
4. Maintainer approves and merges

## Documentation

### Component Documentation

Each component should have:

1. **Storybook Stories** - Interactive examples
2. **TypeScript Definitions** - Inline JSDoc for IntelliSense
3. **README.md** (optional) - For complex components
4. **Accessibility notes** - ARIA usage, keyboard support

### Storybook Stories

Create comprehensive stories:

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentName } from './ComponentName';

const meta: Meta<typeof ComponentName> = {
  title: 'Components/ComponentName',
  component: ComponentName,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

// Default story
export const Default: Story = {
  args: {
    children: 'Example',
  },
};

// Variant stories
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem' }}>
      <ComponentName variant="primary">Primary</ComponentName>
      <ComponentName variant="secondary">Secondary</ComponentName>
      {/* ... other variants */}
    </div>
  ),
};
```

## Design System

### Colors

Use semantic color names:

- `primary` - #3535F3 (Blue)
- `success` - #1FBE5F (Green)
- `danger` - #f50031 (Red)
- `warning` - #f59e0b (Yellow)
- `premium` - #7e22ce (Purple)

Defined in `tailwind.config.js`.

### Spacing

Use Tailwind spacing scale:

- `0.5rem` increments (0.5, 1, 1.5, 2, 2.5, 3, etc.)
- Use `gap-`, `p-`, `m-` utilities

### Typography

- Font: Geist (fallback to system fonts)
- Weights: 400 (normal), 500 (medium), 600 (semibold)
- Sizes: Use Tailwind `text-` utilities

## Accessibility Standards

All components must meet WCAG 2.1 AA:

- **Keyboard Navigation** - All interactive elements accessible via keyboard
- **Screen Readers** - Proper ARIA labels and descriptions
- **Focus Management** - Visible focus indicators
- **Color Contrast** - Minimum 4.5:1 for text
- **Semantic HTML** - Use proper HTML elements

Test with:

- jest-axe (automated)
- Keyboard only navigation
- Screen reader (NVDA, VoiceOver)

## Performance Guidelines

- **Memoization** - Use React.memo, useMemo, useCallback appropriately
- **Bundle Size** - Keep dependencies minimal
- **Virtual Scrolling** - For large lists (use @tanstack/react-virtual)
- **Lazy Loading** - For heavy components

## Questions?

- Check [CLAUDE.md](./CLAUDE.md) for AI assistant context
- Read [ARCHITECTURE.md](./ARCHITECTURE.md) for technical details
- Check existing components for patterns
- Ask in GitHub Discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to Lucent UI! Your efforts help create better, more accessible web experiences for everyone.
