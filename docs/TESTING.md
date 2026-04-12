# Testing Guidelines

This document outlines testing standards and best practices for Lucent UI components to ensure enterprise-grade quality and reliability.

## Testing Philosophy

All components must be:

- **Thoroughly tested**: Unit tests covering all props, states, and interactions
- **Accessible**: WCAG 2.1 AA compliant with axe-core validation
- **Type-safe**: Full TypeScript coverage
- **Performance-optimized**: No unnecessary re-renders or memory leaks

## Coverage Requirements

**Minimum coverage thresholds (enforced in CI):**

- Lines: 80%
- Functions: 80%
- Branches: 75%
- Statements: 80%

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:ui

# Generate coverage report
npm run test:coverage

# Run tests for a specific file
npm test Button.test.tsx
```

## Test Structure

Each component test file should follow this structure:

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  describe('Rendering', () => {
    // Test all visual variants, states, and props
  });

  describe('Interactions', () => {
    // Test user interactions (clicks, keyboard, etc.)
  });

  describe('Accessibility', () => {
    // Test ARIA attributes, keyboard navigation, screen reader support
  });

  describe('Edge Cases', () => {
    // Test error states, loading states, empty states
  });

  describe('Performance', () => {
    // Test memoization, unnecessary re-renders (optional)
  });
});
```

## What to Test

### 1. Rendering

- All prop variations (size, variant, color, etc.)
- Different states (default, hover, active, disabled, loading, error)
- Conditional rendering based on props
- Custom className application
- Default props
- Edge cases (empty children, undefined props)

### 2. User Interactions

- Click events
- Keyboard navigation (Tab, Enter, Space, Arrows, Escape, etc.)
- Focus management
- Form submission
- Hover/active states
- Touch interactions (mobile)

### 3. Accessibility (WCAG 2.1 AA)

- No axe-core violations
- Proper ARIA attributes (`role`, `aria-label`, `aria-labelledby`, etc.)
- Keyboard navigation
- Focus indicators
- Screen reader announcements
- Color contrast (tested via axe)
- Semantic HTML

### 4. State Management

- Controlled vs uncontrolled modes
- State updates trigger re-renders correctly
- Callbacks fire with correct arguments
- State persistence across interactions

### 5. Form Integration

- `name` attribute for form submission
- `required` validation
- Error state handling
- Value serialization

## Testing Patterns

### Basic Rendering Test

```tsx
it('should render with default props', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByRole('button')).toHaveTextContent('Click me');
});
```

### Interaction Test

```tsx
it('should call onClick when clicked', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);
  await user.click(screen.getByRole('button'));

  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Accessibility Test

```tsx
it('should have no accessibility violations', async () => {
  const { container } = render(<Button>Click me</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

it('should support keyboard navigation', async () => {
  const user = userEvent.setup();
  const handleClick = vi.fn();

  render(<Button onClick={handleClick}>Click me</Button>);

  const button = screen.getByRole('button');
  button.focus();
  await user.keyboard('{Enter}');

  expect(handleClick).toHaveBeenCalled();
});
```

### State Management Test

```tsx
it('should work as controlled component', async () => {
  const user = userEvent.setup();
  const onChange = vi.fn();

  const { rerender } = render(<Checkbox checked={false} onChange={onChange} />);

  await user.click(screen.getByRole('checkbox'));
  expect(onChange).toHaveBeenCalledWith(true);

  rerender(<Checkbox checked={true} onChange={onChange} />);
  expect(screen.getByRole('checkbox')).toBeChecked();
});
```

### Multiple Variants Test

```tsx
it('should render all size variants', () => {
  const { rerender } = render(<Button size="sm">Small</Button>);
  expect(screen.getByRole('button')).toHaveClass('h-8');

  rerender(<Button size="md">Medium</Button>);
  expect(screen.getByRole('button')).toHaveClass('h-10');

  rerender(<Button size="lg">Large</Button>);
  expect(screen.getByRole('button')).toHaveClass('h-12');
});
```

## Accessibility Testing

### Using jest-axe

Every component should have at least one axe test:

```tsx
import { axe } from 'jest-axe';

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should have no violations in different states', async () => {
    const { container } = render(<Component disabled error />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### ARIA Attributes

Test critical ARIA attributes:

```tsx
it('should have proper ARIA attributes', () => {
  render(<Select aria-label="Choose option" />);

  const combobox = screen.getByRole('combobox');
  expect(combobox).toHaveAttribute('aria-label', 'Choose option');
  expect(combobox).toHaveAttribute('aria-expanded', 'false');
});
```

### Keyboard Navigation

Test all keyboard interactions:

```tsx
it('should support keyboard navigation', async () => {
  const user = userEvent.setup();

  render(<Menu />);
  const trigger = screen.getByRole('button');

  // Open with Enter
  trigger.focus();
  await user.keyboard('{Enter}');
  expect(trigger).toHaveAttribute('aria-expanded', 'true');

  // Navigate with arrows
  await user.keyboard('{ArrowDown}');
  expect(screen.getAllByRole('menuitem')[0]).toHaveFocus();

  // Close with Escape
  await user.keyboard('{Escape}');
  expect(trigger).toHaveAttribute('aria-expanded', 'false');
});
```

## Testing Best Practices

### DO ✅

- Use `screen` queries from Testing Library
- Prefer `getByRole` over `getByTestId`
- Use `userEvent` for interactions (not `fireEvent`)
- Test user behavior, not implementation
- Use `await` for all async operations
- Clean up side effects in tests
- Test error boundaries and edge cases
- Use descriptive test names (should/when pattern)
- Group related tests in `describe` blocks
- Mock external dependencies (APIs, timers)
- Test both controlled and uncontrolled modes

### DON'T ❌

- Test implementation details
- Access internal state directly
- Use `act()` manually (userEvent handles it)
- Skip accessibility tests
- Ignore TypeScript errors in tests
- Use `any` type in test code
- Test third-party library functionality
- Write tests that depend on other tests
- Use brittle selectors (CSS classes, IDs)
- Forget to await async operations
- Leave console errors/warnings in tests

## Mock Setup

Common mocks are in `src/test/setup.ts`:

- `window.matchMedia` - For responsive hooks
- `IntersectionObserver` - For visibility detection

Add component-specific mocks as needed:

```tsx
import { vi } from 'vitest';

vi.mock('./expensiveCalculation', () => ({
  calculateValue: vi.fn(() => 42),
}));
```

## Performance Testing

For components with performance concerns:

```tsx
import { renderHook } from '@testing-library/react';

it('should memoize expensive calculations', () => {
  const spy = vi.fn();

  const { rerender } = renderHook(({ data }) => useMemo(() => spy(data), [data]), {
    initialProps: { data: 'test' },
  });

  expect(spy).toHaveBeenCalledTimes(1);

  // Same props - should not recalculate
  rerender({ data: 'test' });
  expect(spy).toHaveBeenCalledTimes(1);

  // Different props - should recalculate
  rerender({ data: 'new' });
  expect(spy).toHaveBeenCalledTimes(2);
});
```

## CI/CD Integration

Tests run automatically on:

- Every pull request
- Every commit to main
- Pre-commit hooks (via Husky)

**PR Requirements:**

- All tests must pass
- Coverage thresholds must be met
- No accessibility violations
- No TypeScript errors
- No ESLint/Prettier errors

## Test Coverage Reports

Coverage reports are generated in:

- Terminal output (`npm run test:coverage`)
- HTML report: `coverage/index.html`
- LCOV format for CI: `coverage/lcov.info`

View detailed coverage:

```bash
npm run test:coverage
open coverage/index.html
```

## Common Testing Utilities

### Rendering with Providers

```tsx
import { render } from '@testing-library/react';

function renderWithProviders(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
```

### Custom Queries

```tsx
import { screen, within } from '@testing-library/react';

// Query within a specific container
const dialog = screen.getByRole('dialog');
const closeButton = within(dialog).getByRole('button', { name: /close/i });
```

### Waiting for Async Updates

```tsx
import { waitFor } from '@testing-library/react';

await waitFor(() => {
  expect(screen.getByText('Loaded')).toBeInTheDocument();
});
```

## Resources

- [Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Vitest API](https://vitest.dev/api/)
- [jest-axe](https://github.com/nickcolley/jest-axe)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

## Examples

See `src/components/Select/Select.test.tsx` for a comprehensive example covering:

- Rendering all variants
- User interactions
- Keyboard navigation
- Accessibility
- Form integration
- Controlled/uncontrolled modes
- Custom rendering
- Callbacks

---

**Remember**: Tests are not just for catching bugs - they're documentation of how your component should behave. Write tests that future developers (including yourself) will thank you for.
