import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Input } from './Input';
import { SearchIcon, CloseIcon } from '../Icon/icons';

describe('Input Component', () => {
  describe('Rendering', () => {
    it('should render input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render all size variants', () => {
      const { rerender } = render(<Input size="sm" />);
      expect(screen.getByRole('textbox')).toHaveClass('h-8');

      rerender(<Input size="md" />);
      expect(screen.getByRole('textbox')).toHaveClass('h-10');

      rerender(<Input size="lg" />);
      expect(screen.getByRole('textbox')).toHaveClass('h-12');
    });

    it('should render all variant styles', () => {
      const variants = ['default', 'filled', 'outline'] as const;

      variants.forEach((variant) => {
        const { unmount } = render(<Input variant={variant} />);
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        unmount();
      });
    });

    it('should render with label', () => {
      render(<Input label="Email" />);
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('should render with required indicator', () => {
      render(<Input label="Email" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('should render with helper text', () => {
      render(<Input helperText="This is helper text" />);
      expect(screen.getByText('This is helper text')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(<Input error errorMessage="This field is required" />);
      const errorMsg = screen.getByText('This field is required');

      expect(errorMsg).toBeInTheDocument();
      expect(errorMsg).toHaveAttribute('role', 'alert');
      expect(errorMsg).toHaveClass('text-danger');
    });

    it('should show error message instead of helper text when error is true', () => {
      render(<Input error errorMessage="Error" helperText="Helper" />);

      expect(screen.getByText('Error')).toBeInTheDocument();
      expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    });

    it('should render fullWidth', () => {
      render(<Input fullWidth />);
      expect(screen.getByRole('textbox').closest('div')).toHaveClass('w-full');
    });

    it('should apply custom className', () => {
      render(<Input className="custom-class" />);
      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });

    it('should apply wrapperClassName', () => {
      render(<Input wrapperClassName="wrapper-class" />);
      expect(screen.getByRole('textbox').closest('div')).toHaveClass('wrapper-class');
    });

    it('should render with left icon', () => {
      render(<Input leftIcon={<SearchIcon size="sm" data-testid="left-icon" />} />);
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('should render with right icon', () => {
      render(<Input rightIcon={<CloseIcon size="sm" data-testid="right-icon" />} />);
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('should apply correct padding when left icon is present', () => {
      render(<Input size="md" leftIcon={<SearchIcon size="sm" />} />);
      expect(screen.getByRole('textbox')).toHaveClass('pl-11');
    });

    it('should apply correct padding when right icon is present', () => {
      render(<Input size="md" rightIcon={<SearchIcon size="sm" />} />);
      expect(screen.getByRole('textbox')).toHaveClass('pr-11');
    });
  });

  describe('States', () => {
    it('should render error state', () => {
      render(<Input error />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input.className).toMatch(/rgba\(245,0,49/);
    });

    it('should render success state', () => {
      render(<Input success />);
      const input = screen.getByRole('textbox');

      expect(input.className).toMatch(/rgba\(31,190,95/);
    });

    it('should render disabled state', () => {
      render(<Input disabled label="Disabled Input" />);
      const input = screen.getByRole('textbox');

      expect(input).toBeDisabled();
      expect(input).toHaveClass('disabled:bg-gray-50');
    });

    it('should show opacity on label when disabled', () => {
      render(<Input disabled label="Disabled" />);
      const label = screen.getByText('Disabled');

      expect(label).toHaveClass('opacity-50');
    });
  });

  describe('Input Types', () => {
    it('should render text input by default', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('should render email input', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('should render number input', () => {
      render(<Input type="number" />);
      const input = screen.getByRole('spinbutton');
      expect(input).toHaveAttribute('type', 'number');
    });

    it('should render tel input', () => {
      render(<Input type="tel" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'tel');
    });

    it('should render url input', () => {
      render(<Input type="url" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'url');
    });

    it('should render search input', () => {
      render(<Input type="search" />);
      const input = screen.getByRole('searchbox');
      expect(input).toHaveAttribute('type', 'search');
    });
  });

  describe('User Interactions', () => {
    it('should accept text input', async () => {
      const user = userEvent.setup();
      render(<Input />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello World');

      expect(input).toHaveValue('Hello World');
    });

    it('should call onChange handler', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should call onFocus handler', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();

      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(handleFocus).toHaveBeenCalled();
    });

    it('should call onBlur handler', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();

      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalled();
    });

    it('should not accept input when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(input).toHaveValue('');
    });

    it('should be focusable', async () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      input.focus();
      expect(input).toHaveFocus();
    });

    it('should not be focusable when disabled', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');

      input.focus();
      expect(input).not.toHaveFocus();
    });

    it('should support keyboard navigation', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Input data-testid="input1" />
          <Input data-testid="input2" />
        </div>
      );

      const input1 = screen.getByTestId('input1');
      const input2 = screen.getByTestId('input2');

      input1.focus();
      expect(input1).toHaveFocus();

      await user.tab();
      expect(input2).toHaveFocus();
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component', async () => {
      const user = userEvent.setup();
      render(<Input defaultValue="initial" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('initial');

      await user.clear(input);
      await user.type(input, 'new value');
      expect(input.value).toBe('new value');
    });

    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();

      const { rerender } = render(<Input value="controlled" onChange={handleChange} />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('controlled');

      await user.type(input, 'x');
      expect(handleChange).toHaveBeenCalled();

      rerender(<Input value="updated" onChange={handleChange} />);
      expect(input.value).toBe('updated');
    });
  });

  describe('Accessibility', () => {
    it('should have no accessibility violations - default', async () => {
      const { container } = render(<Input label="Input Field" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - all variants', async () => {
      const variants = ['default', 'filled', 'outline'] as const;

      for (const variant of variants) {
        const { container, unmount } = render(<Input variant={variant} label={variant} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
        unmount();
      }
    });

    it('should have no accessibility violations - error state', async () => {
      const { container } = render(<Input label="Email" error errorMessage="Email is required" />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - disabled state', async () => {
      const { container } = render(<Input label="Disabled Input" disabled />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should have no accessibility violations - with icons', async () => {
      const { container } = render(
        <Input
          label="Search"
          leftIcon={<SearchIcon size="sm" />}
          rightIcon={<CloseIcon size="sm" />}
        />
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it('should link label with input via htmlFor', () => {
      render(<Input label="Email" />);

      const label = screen.getByText('Email');
      const input = screen.getByRole('textbox');

      expect(label).toHaveAttribute('for', input.id);
    });

    it('should use custom id when provided', () => {
      render(<Input label="Email" id="custom-id" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('id', 'custom-id');
    });

    it('should generate unique id when not provided', () => {
      render(
        <div>
          <Input label="Input 1" />
          <Input label="Input 2" />
        </div>
      );

      const inputs = screen.getAllByRole('textbox');
      expect(inputs[0].id).not.toBe(inputs[1].id);
    });

    it('should link error message with aria-describedby', () => {
      render(<Input error errorMessage="Required" />);

      const input = screen.getByRole('textbox');
      const errorMsg = screen.getByText('Required');

      expect(input).toHaveAttribute('aria-describedby', errorMsg.id);
    });

    it('should link helper text with aria-describedby', () => {
      render(<Input helperText="Helper" />);

      const input = screen.getByRole('textbox');
      const helper = screen.getByText('Helper');

      expect(input).toHaveAttribute('aria-describedby', helper.id);
    });

    it('should set aria-invalid when error is true', () => {
      render(<Input error />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    it('should set aria-required when required is true', () => {
      render(<Input required />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-required', 'true');
    });

    it('should support aria-label', () => {
      render(<Input aria-label="Search input" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('aria-label', 'Search input');
    });
  });

  describe('Form Integration', () => {
    it('should submit form value', () => {
      const handleSubmit = vi.fn((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        return formData.get('email');
      });

      render(
        <form onSubmit={handleSubmit}>
          <Input name="email" defaultValue="test@example.com" />
          <button type="submit">Submit</button>
        </form>
      );

      screen.getByRole('button').click();
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('should validate required field', () => {
      render(
        <form>
          <Input name="email" required />
        </form>
      );

      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.validity.valid).toBe(false);

      userEvent.type(input, 'test@example.com');
      expect(input.validity.valid).toBe(true);
    });

    it('should validate email format', () => {
      render(<Input type="email" name="email" />);

      const input = screen.getByRole('textbox') as HTMLInputElement;

      userEvent.type(input, 'invalid');
      expect(input.validity.valid).toBe(false);

      userEvent.clear(input);
      userEvent.type(input, 'valid@example.com');
      expect(input.validity.valid).toBe(true);
    });
  });

  describe('Edge Cases', () => {
    it('should handle very long text', async () => {
      const user = userEvent.setup();
      const longText = 'a'.repeat(1000);

      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, longText);
      expect(input).toHaveValue(longText);
    });

    it('should handle special characters', async () => {
      const user = userEvent.setup();
      const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';

      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, specialChars);
      expect(input).toHaveValue(specialChars);
    });

    it('should forward ref correctly', () => {
      const ref = vi.fn();
      render(<Input ref={ref} />);
      expect(ref).toHaveBeenCalled();
    });

    it('should handle min/max for number inputs', () => {
      render(<Input type="number" min="0" max="100" />);
      const input = screen.getByRole('spinbutton');

      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
    });

    it('should handle maxLength attribute', async () => {
      const user = userEvent.setup();
      render(<Input maxLength={5} />);
      const input = screen.getByRole('textbox');

      await user.type(input, '123456789');
      expect((input as HTMLInputElement).value.length).toBeLessThanOrEqual(5);
    });

    it('should handle pattern attribute', () => {
      render(<Input pattern="[0-9]{3}" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveAttribute('pattern', '[0-9]{3}');
    });
  });

  describe('Icon Colors', () => {
    it('should show gray icon by default', () => {
      const { container } = render(<Input leftIcon={<SearchIcon size="sm" />} />);
      const iconWrapper = container.querySelector('.text-gray-400');

      expect(iconWrapper).toBeInTheDocument();
    });

    it('should show danger icon when error', () => {
      const { container } = render(<Input error leftIcon={<SearchIcon size="sm" />} />);
      const iconWrapper = container.querySelector('.text-danger');

      expect(iconWrapper).toBeInTheDocument();
    });

    it('should show success icon when success', () => {
      const { container } = render(<Input success leftIcon={<SearchIcon size="sm" />} />);
      const iconWrapper = container.querySelector('.text-success');

      expect(iconWrapper).toBeInTheDocument();
    });
  });

  describe('Style Classes', () => {
    it('should have base classes', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveClass('w-full');
      expect(input).toHaveClass('rounded-md');
      expect(input).toHaveClass('transition-all');
    });

    it('should have placeholder styles', () => {
      render(<Input placeholder="Test" />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveClass('placeholder:text-gray-400');
    });
  });
});
