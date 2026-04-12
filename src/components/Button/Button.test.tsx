import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button } from './Button';
import { PlusIcon } from '../Icon/icons';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render with children', () => {
      render(<Button>Click me</Button>);
      expect(screen.getByRole('button')).toHaveTextContent('Click me');
    });

    it('should render all size variants', () => {
      const { rerender } = render(<Button size="sm">Small</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-8');

      rerender(<Button size="md">Medium</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-10');

      rerender(<Button size="lg">Large</Button>);
      expect(screen.getByRole('button')).toHaveClass('h-12');
    });

    it('should render all variant styles', () => {
      const variants = [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'premium',
        'outline',
        'ghost',
        'accent',
      ] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>);
        expect(screen.getByRole('button')).toBeInTheDocument();
        unmount();
      });
    });

    it('should apply custom className', () => {
      render(<Button className="custom-class">Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('should render fullWidth', () => {
      render(<Button fullWidth>Full Width</Button>);
      expect(screen.getByRole('button')).toHaveClass('w-full');
    });

    it('should render with left icon', () => {
      render(<Button leftIcon={<PlusIcon size="sm" data-testid="left-icon" />}>Add Item</Button>);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByText('Add Item')).toBeInTheDocument();
    });

    it('should render with right icon', () => {
      render(<Button rightIcon={<PlusIcon size="sm" data-testid="right-icon" />}>Next</Button>);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should render with both left and right icons', () => {
      render(
        <Button
          leftIcon={<PlusIcon size="sm" data-testid="left-icon" />}
          rightIcon={<PlusIcon size="sm" data-testid="right-icon" />}
        >
          Button
        </Button>
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('States', () => {
    it('should render disabled state', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should render loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');

      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should show loading spinner and hide icons when loading', () => {
      render(
        <Button loading leftIcon={<PlusIcon size="sm" data-testid="icon" />}>
          Loading
        </Button>
      );

      expect(screen.queryByTestId('icon')).not.toBeInTheDocument();
      expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument();
    });

    it('should hide loading spinner when not loading', () => {
      const { rerender } = render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');

      expect(button.querySelector('.animate-spin')).toBeInTheDocument();

      rerender(<Button>Not Loading</Button>);
      expect(button.querySelector('.animate-spin')).not.toBeInTheDocument();
    });
  });

  describe('Button Types', () => {
    it('should render with type="button" by default', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    it('should render with type="submit"', () => {
      render(<Button type="submit">Submit</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });

    it('should render with type="reset"', () => {
      render(<Button type="reset">Reset</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('type', 'reset');
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);
      await user.click(screen.getByRole('button'));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} disabled>
          Click me
        </Button>
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(
        <Button onClick={handleClick} loading>
          Click me
        </Button>
      );
      await user.click(screen.getByRole('button'));

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should respond to Enter key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalled();
    });

    it('should respond to Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard(' ');

      expect(handleClick).toHaveBeenCalled();
    });

    it('should be focusable', () => {
      render(<Button>Focusable</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).toHaveFocus();
    });

    it('should not be focusable when disabled', () => {
      render(<Button disabled>Not focusable</Button>);
      const button = screen.getByRole('button');

      button.focus();
      expect(button).not.toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations - primary variant', async () => {
      const { container } = render(<Button>Primary Button</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - all variants', async () => {
      const variants = ['primary', 'secondary', 'success', 'danger', 'outline', 'ghost'] as const;

      for (const variant of variants) {
        const { container, unmount } = render(<Button variant={variant}>{variant}</Button>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
        unmount();
      }
    });

    it('should have no accessibility violations - disabled state', async () => {
      const { container } = render(<Button disabled>Disabled</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - loading state', async () => {
      const { container } = render(<Button loading>Loading</Button>);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - with icons', async () => {
      const { container } = render(
        <Button leftIcon={<PlusIcon size="sm" />} rightIcon={<PlusIcon size="sm" />}>
          With Icons
        </Button>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should support aria-label', () => {
      render(<Button aria-label="Custom label">Button</Button>);
      expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Custom label');
    });

    it('should support aria-labelledby', () => {
      render(
        <div>
          <span id="button-label">Button Label</span>
          <Button aria-labelledby="button-label">Button</Button>
        </div>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-labelledby', 'button-label');
    });

    it('should support aria-describedby', () => {
      render(
        <div>
          <Button aria-describedby="button-description">Button</Button>
          <span id="button-description">This button does something</span>
        </div>
      );
      expect(screen.getByRole('button')).toHaveAttribute('aria-describedby', 'button-description');
    });

    it('should have proper loading state ARIA attributes', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(button).toHaveAttribute('aria-disabled', 'true');
    });

    it('should hide loading spinner from screen readers', () => {
      render(<Button loading>Loading</Button>);
      const spinner = screen.getByRole('button').querySelector('svg');

      expect(spinner).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Form Integration', () => {
    it('should submit form when type="submit"', () => {
      const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => e.preventDefault());

      render(
        <form onSubmit={handleSubmit}>
          <Button type="submit">Submit</Button>
        </form>
      );

      screen.getByRole('button').click();
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should reset form when type="reset"', () => {
      render(
        <form>
          <input defaultValue="test" />
          <Button type="reset">Reset</Button>
        </form>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('test');

      screen.getByRole('button').click();
      expect(input.value).toBe('');
    });

    it('should not submit form when type="button"', () => {
      const handleSubmit = vi.fn();

      render(
        <form onSubmit={handleSubmit}>
          <Button type="button">Button</Button>
        </form>
      );

      screen.getByRole('button').click();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Edge Cases', () => {
    it('should render without children', () => {
      render(<Button />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with only icons, no text', () => {
      render(<Button leftIcon={<PlusIcon size="sm" data-testid="icon" />} />);
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });

    it('should handle rapid clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();

      render(<Button onClick={handleClick}>Click me</Button>);
      const button = screen.getByRole('button');

      await user.tripleClick(button);
      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('should forward ref correctly', () => {
      const ref = vi.fn();

      render(<Button ref={ref}>Button</Button>);
      expect(ref).toHaveBeenCalled();
    });

    it('should handle long text content', () => {
      const longText = 'This is a very long button text that should still render correctly';
      render(<Button>{longText}</Button>);
      expect(screen.getByRole('button')).toHaveTextContent(longText);
    });
  });

  describe('Style Classes', () => {
    it('should have base classes', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');

      expect(button).toHaveClass('inline-flex');
      expect(button).toHaveClass('items-center');
      expect(button).toHaveClass('justify-center');
      expect(button).toHaveClass('font-medium');
      expect(button).toHaveClass('rounded-sm');
    });

    it('should apply active scale animation class', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('active:scale-95');
    });

    it('should disable scale animation when disabled', () => {
      render(<Button disabled>Button</Button>);
      expect(screen.getByRole('button')).toHaveClass('disabled:active:scale-100');
    });
  });

  describe('Variant-specific Tests', () => {
    it('should render primary variant with correct colors', () => {
      render(<Button variant="primary">Primary</Button>);
      const button = screen.getByRole('button');

      expect(button.className).toMatch(/bg-primary-500/);
      expect(button.className).toMatch(/text-white/);
    });

    it('should render secondary variant with shadow-border', () => {
      render(<Button variant="secondary">Secondary</Button>);
      const button = screen.getByRole('button');

      expect(button.className).toMatch(/bg-white/);
      expect(button.className).toMatch(/box-shadow/);
    });

    it('should render danger variant with correct colors', () => {
      render(<Button variant="danger">Delete</Button>);
      const button = screen.getByRole('button');

      expect(button.className).toMatch(/bg-danger-500/);
      expect(button.className).toMatch(/text-white/);
    });

    it('should render ghost variant as transparent', () => {
      render(<Button variant="ghost">Ghost</Button>);
      const button = screen.getByRole('button');

      expect(button.className).toMatch(/bg-transparent/);
    });
  });
});
