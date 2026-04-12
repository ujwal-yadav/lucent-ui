/**
 * Select Component Tests
 *
 * This is an example test file showing best practices for testing the Select component.
 * To run these tests, you'll need to install testing dependencies:
 *
 * npm install --save-dev @testing-library/react @testing-library/user-event @testing-library/jest-dom vitest jsdom
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Select } from './Select';
import { SelectOption } from './Select.types';

const mockOptions: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

describe('Select Component', () => {
  describe('Rendering', () => {
    it('should render with placeholder', () => {
      render(<Select options={mockOptions} placeholder="Select framework" />);
      expect(screen.getByText('Select framework')).toBeInTheDocument();
    });

    it('should render with initial value', () => {
      render(<Select options={mockOptions} defaultValue="react" placeholder="Select framework" />);
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('should render all size variants', () => {
      const { rerender } = render(<Select options={mockOptions} size="sm" placeholder="Small" />);
      expect(screen.getByRole('combobox')).toHaveClass('h-8');

      rerender(<Select options={mockOptions} size="md" placeholder="Medium" />);
      expect(screen.getByRole('combobox')).toHaveClass('h-10');

      rerender(<Select options={mockOptions} size="lg" placeholder="Large" />);
      expect(screen.getByRole('combobox')).toHaveClass('h-12');
    });

    it('should render disabled state', () => {
      render(<Select options={mockOptions} disabled placeholder="Disabled" />);
      expect(screen.getByRole('combobox')).toBeDisabled();
      expect(screen.getByRole('combobox')).toHaveClass('opacity-50');
    });

    it('should render error state', () => {
      render(<Select options={mockOptions} error placeholder="Error" />);
      expect(screen.getByRole('combobox')).toHaveClass('border-danger-500');
    });
  });

  describe('Interactions', () => {
    it('should open dropdown on click', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="Select" />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('should close dropdown on outside click', async () => {
      const user = userEvent.setup();
      render(
        <div>
          <Select options={mockOptions} placeholder="Select" />
          <button>Outside</button>
        </div>
      );

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.click(screen.getByText('Outside'));
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should select an option', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Select options={mockOptions} onChange={onChange} placeholder="Select" />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('React'));

      expect(onChange).toHaveBeenCalledWith('react');
      expect(screen.getByText('React')).toBeInTheDocument();
    });

    it('should clear selection when clearable', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Select
          options={mockOptions}
          defaultValue="react"
          onChange={onChange}
          clearable
          placeholder="Select"
        />
      );

      const clearButton = screen.getByLabelText('Clear selection');
      await user.click(clearButton);

      expect(onChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Multi-select', () => {
    it('should allow multiple selections', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Select options={mockOptions} multiple onChange={onChange} placeholder="Select" />);

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('React'));
      await user.click(screen.getByText('Vue'));

      expect(onChange).toHaveBeenLastCalledWith(['react', 'vue']);
    });

    it('should remove option from multi-select', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(
        <Select
          options={mockOptions}
          multiple
          defaultValue={['react', 'vue']}
          onChange={onChange}
          placeholder="Select"
        />
      );

      const removeButton = screen.getByLabelText('Remove React');
      await user.click(removeButton);

      expect(onChange).toHaveBeenCalledWith(['vue']);
    });
  });

  describe('Search functionality', () => {
    it('should filter options based on search query', async () => {
      const user = userEvent.setup();

      render(<Select options={mockOptions} searchable placeholder="Search" />);

      await user.click(screen.getByRole('combobox'));
      const searchInput = screen.getByRole('searchbox');

      await user.type(searchInput, 'react');

      const listbox = screen.getByRole('listbox');
      expect(within(listbox).getByText('React')).toBeInTheDocument();
      expect(within(listbox).queryByText('Vue')).not.toBeInTheDocument();
    });

    it('should show empty message when no results', async () => {
      const user = userEvent.setup();

      render(
        <Select options={mockOptions} searchable emptyMessage="No matches" placeholder="Search" />
      );

      await user.click(screen.getByRole('combobox'));
      await user.type(screen.getByRole('searchbox'), 'xyz');

      expect(screen.getByText('No matches')).toBeInTheDocument();
    });
  });

  describe('Keyboard navigation', () => {
    it('should open on Enter key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="Select" />);

      const trigger = screen.getByRole('combobox');
      trigger.focus();
      await user.keyboard('{Enter}');

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
    });

    it('should close on Escape key', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="Select" />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      expect(trigger).toHaveAttribute('aria-expanded', 'true');

      await user.keyboard('{Escape}');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
    });

    it('should navigate options with arrow keys', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="Select" />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      await user.keyboard('{ArrowDown}');
      await user.keyboard('{ArrowDown}');

      // Second option (Vue) should be highlighted
      const options = screen.getAllByRole('option');
      expect(options[1]).toHaveClass('bg-primary-50');
    });

    it('should select option with Enter key', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      render(<Select options={mockOptions} onChange={onChange} placeholder="Select" />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(onChange).toHaveBeenCalledWith('react');
    });

    it('should jump to first/last option with Home/End', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="Select" />);

      await user.click(screen.getByRole('combobox'));

      await user.keyboard('{End}');
      const options = screen.getAllByRole('option');
      expect(options[options.length - 1]).toHaveClass('bg-primary-50');

      await user.keyboard('{Home}');
      expect(options[0]).toHaveClass('bg-primary-50');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<Select options={mockOptions} aria-label="Select framework" placeholder="Select" />);

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-expanded', 'false');
      expect(trigger).toHaveAttribute('aria-label', 'Select framework');
    });

    it('should have proper ARIA attributes when open', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} placeholder="Select" />);

      const trigger = screen.getByRole('combobox');
      await user.click(trigger);

      expect(trigger).toHaveAttribute('aria-expanded', 'true');
      expect(trigger).toHaveAttribute('aria-controls');

      const listbox = screen.getByRole('listbox');
      expect(listbox).toBeInTheDocument();
    });

    it('should mark selected option with aria-selected', async () => {
      const user = userEvent.setup();
      render(<Select options={mockOptions} defaultValue="react" placeholder="Select" />);

      await user.click(screen.getByRole('combobox'));

      const selectedOption = screen.getByRole('option', { name: /react/i });
      expect(selectedOption).toHaveAttribute('aria-selected', 'true');
    });

    it('should mark disabled options with aria-disabled', async () => {
      const user = userEvent.setup();
      const optionsWithDisabled = [
        ...mockOptions,
        { value: 'disabled', label: 'Disabled', disabled: true },
      ];

      render(<Select options={optionsWithDisabled} placeholder="Select" />);

      await user.click(screen.getByRole('combobox'));

      const disabledOption = screen.getByText('Disabled').closest('li');
      expect(disabledOption).toHaveAttribute('aria-disabled', 'true');
    });

    it('should support aria-labelledby', () => {
      render(
        <div>
          <label id="select-label">Framework</label>
          <Select options={mockOptions} aria-labelledby="select-label" placeholder="Select" />
        </div>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-labelledby', 'select-label');
    });

    it('should support aria-describedby for errors', () => {
      render(
        <div>
          <Select
            options={mockOptions}
            error
            aria-describedby="error-message"
            placeholder="Select"
          />
          <span id="error-message">This field is required</span>
        </div>
      );

      const trigger = screen.getByRole('combobox');
      expect(trigger).toHaveAttribute('aria-describedby', 'error-message');
    });
  });

  describe('Loading state', () => {
    it('should show loading message', async () => {
      const user = userEvent.setup();

      render(
        <Select options={[]} loading loadingMessage="Loading options..." placeholder="Select" />
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Loading options...')).toBeInTheDocument();
    });
  });

  describe('Form integration', () => {
    it('should include hidden input for form submission', () => {
      const { container } = render(
        <Select options={mockOptions} name="framework" defaultValue="react" placeholder="Select" />
      );

      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toBeInTheDocument();
      expect(hiddenInput).toHaveAttribute('name', 'framework');
      expect(hiddenInput).toHaveValue('react');
    });

    it('should support required attribute', () => {
      const { container } = render(
        <Select options={mockOptions} name="framework" required placeholder="Select" />
      );

      const hiddenInput = container.querySelector('input[type="hidden"]');
      expect(hiddenInput).toHaveAttribute('required');
    });
  });

  describe('Controlled vs Uncontrolled', () => {
    it('should work as uncontrolled component', async () => {
      const user = userEvent.setup();

      render(<Select options={mockOptions} defaultValue="react" placeholder="Select" />);

      expect(screen.getByText('React')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Vue'));

      expect(screen.getByText('Vue')).toBeInTheDocument();
    });

    it('should work as controlled component', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();

      const { rerender } = render(
        <Select options={mockOptions} value="react" onChange={onChange} placeholder="Select" />
      );

      expect(screen.getByText('React')).toBeInTheDocument();

      await user.click(screen.getByRole('combobox'));
      await user.click(screen.getByText('Vue'));

      expect(onChange).toHaveBeenCalledWith('vue');

      // Simulate parent component updating the value
      rerender(
        <Select options={mockOptions} value="vue" onChange={onChange} placeholder="Select" />
      );

      expect(screen.getByText('Vue')).toBeInTheDocument();
    });
  });

  describe('Custom rendering', () => {
    it('should use custom renderValue function', () => {
      render(
        <Select
          options={mockOptions}
          defaultValue="react"
          renderValue={(value, options) => {
            const option = options.find((opt) => opt.value === value);
            return <span>Custom: {option?.label}</span>;
          }}
          placeholder="Select"
        />
      );

      expect(screen.getByText('Custom: React')).toBeInTheDocument();
    });

    it('should use custom renderOption function', async () => {
      const user = userEvent.setup();

      render(
        <Select
          options={mockOptions}
          renderOption={(option) => <div>Option: {option.label}</div>}
          placeholder="Select"
        />
      );

      await user.click(screen.getByRole('combobox'));
      expect(screen.getByText('Option: React')).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onOpen when dropdown opens', async () => {
      const user = userEvent.setup();
      const onOpen = vi.fn();

      render(<Select options={mockOptions} onOpen={onOpen} placeholder="Select" />);

      await user.click(screen.getByRole('combobox'));
      expect(onOpen).toHaveBeenCalled();
    });

    it('should call onClose when dropdown closes', async () => {
      const user = userEvent.setup();
      const onClose = vi.fn();

      render(<Select options={mockOptions} onClose={onClose} placeholder="Select" />);

      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{Escape}');

      expect(onClose).toHaveBeenCalled();
    });
  });
});
