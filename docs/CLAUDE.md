# Lucent UI - AI Assistant Context

This file provides context for AI assistants (Claude, Cursor, GitHub Copilot, etc.) working on this project.

## Project Overview

Lucent UI is an enterprise-grade React component library built with:

- **TypeScript** - Full type safety
- **Tailwind CSS** - Utility-first styling
- **Storybook** - Component documentation and development
- **Vitest** - Testing with 80%+ coverage requirement
- **Vite** - Build tooling

**Design Philosophy**: Minimal, accessible, production-ready components following modern design principles.

## Core Principles

### 1. Accessibility First (WCAG 2.1 AA)

- Every component must pass `jest-axe` accessibility tests
- Proper ARIA attributes, keyboard navigation, focus management
- Support screen readers and assistive technologies
- See [TESTING.md](./TESTING.md) for accessibility testing guidelines

### 2. Type Safety

- All components must have full TypeScript definitions
- Exported types for all props interfaces
- No `any` types unless absolutely necessary
- Strict mode enabled in `tsconfig.json`

### 3. Performance

- Memoization where appropriate (React.memo, useMemo, useCallback)
- Minimal re-renders
- Virtual scrolling for large lists (Select component uses @tanstack/react-virtual)
- Bundle size awareness

### 4. Testing

- Minimum 80% coverage (enforced in CI)
- Unit tests for all components
- Accessibility tests with jest-axe
- Integration tests for complex interactions
- See [TESTING.md](./TESTING.md) for detailed guidelines

### 5. Minimal Design

- Shadow-as-border technique (no actual borders, use box-shadow)
- 6px border radius (`rounded-sm` in Tailwind)
- Geist typography
- Subtle animations and transitions
- No unnecessary decorations

## Project Structure

```
lucent-ui/
├── src/
│   ├── components/          # All UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx          # Component implementation
│   │   │   ├── Button.types.ts     # TypeScript definitions
│   │   │   ├── Button.stories.tsx  # Storybook stories
│   │   │   ├── Button.test.tsx     # Vitest tests
│   │   │   ├── README.md           # Component documentation
│   │   │   └── index.ts            # Export file
│   │   └── [ComponentName]/        # Same structure for all components
│   ├── hooks/               # Reusable React hooks
│   ├── utils/               # Utility functions (cn, etc.)
│   ├── styles.css           # Global Tailwind styles
│   ├── index.ts             # Library exports
│   └── Introduction.stories.tsx  # Storybook welcome page
├── .storybook/              # Storybook configuration
├── public/                  # Static assets (favicon, etc.)
├── TESTING.md               # Testing guidelines
├── ARCHITECTURE.md          # Architecture documentation
├── CONTRIBUTING.md          # Contribution guidelines
└── CLAUDE.md                # This file
```

## Color System

### Semantic Colors

- **Primary** (#3535F3) - Interactive elements, CTAs, focus states
- **Success** (#1FBE5F) - Success states, confirmations
- **Danger** (#f50031) - Errors, destructive actions
- **Warning** (#f59e0b) - Warnings, important notices
- **Premium** (#7e22ce) - Premium features, special highlights

### Neutrals

- **Neutral 900** (#171717) - Primary text (NOT pure black)
- **White** (#ffffff) - Backgrounds, surfaces
- **Gray scale** - 50, 100, 200, 400, 500, 600 (see tailwind.config.js)

### Workflow Colors (Context-Specific Only)

- **Develop** (#0a72ef) - Development workflow
- **Preview** (#de1d8d) - Preview deployment
- **Ship** (#ff5b4f) - Production deployment

**Rule**: Use semantic colors for UI states. Workflow colors only for workflow-specific contexts.

## Component Patterns

### 1. Component Structure

```tsx
import { forwardRef } from 'react';
import { ComponentProps } from './Component.types';
import { cn } from '../../utils/cn';

export const Component = forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'primary', size = 'md', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-base',
      lg: 'h-12 px-6 text-lg',
    };

    return <div ref={ref} className={cn('base-classes', sizeStyles[size], className)} {...props} />;
  }
);

Component.displayName = 'Component';
```

### 2. Styling Conventions

- Use Tailwind utility classes (never inline CSS unless required)
- Shadow-as-border: `[box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px]`
- Border radius: `rounded-sm` (6px)
- Font weight: `font-medium` (500) for UI elements
- Transitions: `transition-all duration-200`

### 3. State Management

- Use `useControllableState` hook for controlled/uncontrolled components
- Support both `value/onChange` (controlled) and `defaultValue` (uncontrolled)
- Example: Select, Input, Checkbox components

### 4. TypeScript Patterns

```tsx
// Export types for external use
export type ComponentVariant = 'primary' | 'secondary' | 'success' | 'danger';
export type ComponentSize = 'sm' | 'md' | 'lg';

export interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ComponentVariant;
  size?: ComponentSize;
  // ... other props
}
```

## Do's and Don'ts

### ✅ DO

1. **Always use forwardRef** for components that render DOM elements
2. **Use the `cn()` utility** for className merging
3. **Add proper ARIA attributes** (aria-label, aria-describedby, role, etc.)
4. **Write accessibility tests** with jest-axe
5. **Support keyboard navigation** (Tab, Enter, Escape, Arrows)
6. **Use semantic HTML** (button, nav, header, etc.)
7. **Memoize expensive calculations** (useMemo, useCallback)
8. **Test all user interactions** (click, keyboard, focus)
9. **Keep components focused** - Single responsibility principle
10. **Document complex logic** with comments

### ❌ DON'T

1. **Don't add features not requested** - No premature optimization
2. **Don't use `any` type** - Always define proper types
3. **Don't skip tests** - Every component needs tests
4. **Don't use emojis** in code or documentation (unless explicitly requested)
5. **Don't create unnecessary abstractions** - Keep it simple
6. **Don't use workflow colors decoratively** - Only in workflow context
7. **Don't skip accessibility** - WCAG 2.1 AA is mandatory
8. **Don't use inline styles** unless absolutely necessary (Storybook stories are an exception)
9. **Don't create large components** - Split into smaller, reusable pieces
10. **Don't ignore Prettier/ESLint** - Always format code

## Common Tasks

### Adding a New Component

1. Create folder: `src/components/NewComponent/`
2. Create files:
   - `NewComponent.tsx` - Implementation
   - `NewComponent.types.ts` - TypeScript definitions
   - `NewComponent.stories.tsx` - Storybook stories
   - `NewComponent.test.tsx` - Tests
   - `index.ts` - Exports
3. Add tests with accessibility checks
4. Export from `src/index.ts`
5. Run tests: `npm test`
6. Format: `npm run format`

### Modifying Existing Components

1. **Read the component file first** - Understand current implementation
2. **Check existing tests** - Understand expected behavior
3. **Add tests for new behavior** before implementing
4. **Update TypeScript types** if props change
5. **Update Storybook stories** to showcase changes
6. **Run full test suite** before committing

### Running Tests

```bash
npm test                    # Run all tests
npm run test:coverage       # Generate coverage report
npm run test:ui             # Open Vitest UI

# Test specific file
npm test Button.test.tsx
```

### Storybook Development

```bash
npm run dev                 # Start Storybook on :6006
npm run build-storybook     # Build static Storybook
```

## Git Workflow

1. **Never force push** to main/master
2. **Create commits with descriptive messages**
3. **Include "Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"** in commits made by AI
4. **Run tests before committing** (pre-commit hooks will enforce this)
5. **Format code before committing** (Prettier + ESLint)

## Key Files to Reference

- **tailwind.config.js** - Theme colors, spacing, typography
- **tsconfig.json** - TypeScript configuration
- **vitest.config.ts** - Test configuration, coverage thresholds
- **.eslintrc.cjs** - Linting rules
- **.prettierrc** - Code formatting rules
- **src/utils/cn.ts** - ClassName utility (using clsx)
- **src/hooks/** - Reusable hooks (useClickOutside, useControllableState)

## Storybook Story Pattern

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Component } from './Component';

const meta: Meta<typeof Component> = {
  title: 'Components/Component',
  component: Component,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Component>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};
```

## Testing Pattern

See [TESTING.md](./TESTING.md) for comprehensive testing guidelines.

Quick example:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Component } from './Component';

describe('Component', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Component>Test</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should handle user interactions', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Component onClick={onClick}>Click me</Component>);

    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalled();
  });
});
```

## Questions to Ask Before Making Changes

1. **Does this change maintain accessibility?** (Run jest-axe tests)
2. **Does this break existing API?** (Check if it's a breaking change)
3. **Are there tests?** (Add tests for new behavior)
4. **Is it typed correctly?** (No `any` types)
5. **Does it follow the design system?** (Colors, spacing, shadows)
6. **Is it documented?** (Update stories, README if needed)
7. **Does it pass linting?** (Run `npm run lint`)

## Performance Considerations

- **Select component**: Uses virtual scrolling for 1000+ items
- **Memoization**: Use React.memo for expensive renders
- **Event handlers**: Use useCallback to prevent re-creation
- **Computed values**: Use useMemo for expensive calculations
- **Bundle size**: Keep dependencies minimal (avoid heavy libraries)

## When in Doubt

1. **Check existing components** for similar patterns
2. **Read TESTING.md** for testing approach
3. **Look at recent commits** for code style
4. **Run the full test suite** to catch regressions
5. **Ask the user** if requirements are unclear

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest Documentation](https://vitest.dev)

---

**Remember**: This is a production-grade component library. Quality, accessibility, and performance are non-negotiable. Every line of code should be intentional and well-tested.
