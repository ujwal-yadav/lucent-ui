import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';
import { SelectOption } from './Select.types';

/**
 * # Select Component
 *
 * A production-ready, fully accessible select/dropdown component with advanced features.
 *
 * ## Features
 *
 * - ✅ **WCAG 2.1 AA Compliant** - Full keyboard navigation and screen reader support
 * - ✅ **Single & Multi-Select** - Support for both selection modes
 * - ✅ **Searchable** - Built-in search/filter functionality
 * - ✅ **Async Loading** - Loading states for async data
 * - ✅ **Grouped Options** - Organize options into categories
 * - ✅ **Customizable** - Custom rendering and styling
 * - ✅ **High Performance** - Optimized with memoization and virtualization support
 *
 * ## Accessibility
 *
 * ### Keyboard Navigation
 * - `Space/Enter` - Open dropdown or select highlighted option
 * - `Arrow Up/Down` - Navigate through options
 * - `Home/End` - Jump to first/last option
 * - `Escape` - Close dropdown
 * - `Type-ahead` - Jump to options by typing (when not searchable)
 *
 * ### Screen Readers
 * - Proper ARIA roles (`combobox`, `listbox`, `option`)
 * - ARIA states (`aria-expanded`, `aria-selected`, `aria-disabled`)
 * - Accessible labels and descriptions
 * - Loading and empty states announced
 *
 * ### Focus Management
 * - Visible focus indicators
 * - Focus returns to trigger on close
 * - Search input auto-focused when opened (if searchable)
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible select component with single/multi-select, search, async loading, and more.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant of the select',
    },
    variant: {
      control: 'select',
      options: ['default', 'outline', 'filled'],
      description: 'Visual style variant',
    },
    multiple: {
      control: 'boolean',
      description: 'Enable multi-select mode',
    },
    searchable: {
      control: 'boolean',
      description: 'Enable search/filter functionality',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when value is selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the select',
    },
    error: {
      control: 'boolean',
      description: 'Show error state',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Select>;

// Sample data
const basicOptions: SelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
];

const optionsWithDescriptions: SelectOption[] = [
  {
    value: 'react',
    label: 'React',
    description: 'A JavaScript library for building user interfaces',
  },
  {
    value: 'vue',
    label: 'Vue',
    description: 'The Progressive JavaScript Framework',
  },
  {
    value: 'angular',
    label: 'Angular',
    description: 'Platform for building mobile and desktop web applications',
  },
  {
    value: 'svelte',
    label: 'Svelte',
    description: 'Cybernetically enhanced web apps',
  },
];

const groupedOptions: SelectOption[] = [
  { value: 'react', label: 'React', group: 'Libraries' },
  { value: 'vue', label: 'Vue', group: 'Frameworks' },
  { value: 'angular', label: 'Angular', group: 'Frameworks' },
  { value: 'svelte', label: 'Svelte', group: 'Compilers' },
  { value: 'solid', label: 'Solid', group: 'Libraries' },
  { value: 'next', label: 'Next.js', group: 'Meta-Frameworks' },
  { value: 'nuxt', label: 'Nuxt', group: 'Meta-Frameworks' },
  { value: 'astro', label: 'Astro', group: 'Meta-Frameworks' },
];

const countriesOptions: SelectOption[] = [
  { value: 'us', label: 'United States', icon: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', icon: '🇬🇧' },
  { value: 'ca', label: 'Canada', icon: '🇨🇦' },
  { value: 'au', label: 'Australia', icon: '🇦🇺' },
  { value: 'de', label: 'Germany', icon: '🇩🇪' },
  { value: 'fr', label: 'France', icon: '🇫🇷' },
  { value: 'jp', label: 'Japan', icon: '🇯🇵' },
  { value: 'in', label: 'India', icon: '🇮🇳' },
];

// Basic example
export const Default: Story = {
  args: {
    options: basicOptions,
    placeholder: 'Select a framework...',
  },
};

// Controlled component
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState<string | undefined>('react');

    return (
      <div className="space-y-4">
        <Select
          options={basicOptions}
          value={value}
          onChange={(newValue) => setValue(newValue as string | undefined)}
          placeholder="Select a framework..."
        />
        <div className="text-sm text-neutral-600">
          Selected value: <strong>{value || 'None'}</strong>
        </div>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Small</label>
        <Select options={basicOptions} size="sm" placeholder="Small select" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Medium (Default)</label>
        <Select options={basicOptions} size="md" placeholder="Medium select" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Large</label>
        <Select options={basicOptions} size="lg" placeholder="Large select" />
      </div>
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Default</label>
        <Select options={basicOptions} variant="default" placeholder="Default variant" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Outline</label>
        <Select options={basicOptions} variant="outline" placeholder="Outline variant" />
      </div>
      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1">Filled</label>
        <Select options={basicOptions} variant="filled" placeholder="Filled variant" />
      </div>
    </div>
  ),
};

// Multi-select
export const MultiSelect: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['react', 'vue']);

    return (
      <div className="space-y-4">
        <Select
          options={basicOptions}
          value={value}
          onChange={(newValue) => setValue(newValue as string[])}
          multiple
          clearable
          placeholder="Select frameworks..."
        />
        <div className="text-sm text-neutral-600">
          Selected: <strong>{value.length > 0 ? value.join(', ') : 'None'}</strong>
        </div>
      </div>
    );
  },
};

// Searchable
export const Searchable: Story = {
  args: {
    options: countriesOptions,
    searchable: true,
    placeholder: 'Search countries...',
  },
};

// With descriptions
export const WithDescriptions: Story = {
  args: {
    options: optionsWithDescriptions,
    placeholder: 'Select a framework...',
  },
};

// Grouped options
export const GroupedOptions: Story = {
  args: {
    options: groupedOptions,
    searchable: true,
    placeholder: 'Select a technology...',
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    options: countriesOptions,
    searchable: true,
    placeholder: 'Select a country...',
  },
};

// Clearable
export const Clearable: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'react',
    clearable: true,
    placeholder: 'Select a framework...',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    options: basicOptions,
    defaultValue: 'react',
    disabled: true,
  },
};

// Disabled options
export const DisabledOptions: Story = {
  args: {
    options: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue', disabled: true },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte', disabled: true },
      { value: 'solid', label: 'Solid' },
    ],
    placeholder: 'Select a framework...',
  },
};

// Error state
export const Error: Story = {
  args: {
    options: basicOptions,
    error: true,
    placeholder: 'Select a framework...',
    'aria-describedby': 'error-message',
  },
  decorators: [
    (Story) => (
      <div>
        <Story />
        <p id="error-message" className="mt-1 text-sm text-danger-600">
          This field is required
        </p>
      </div>
    ),
  ],
};

// Loading state
export const Loading: Story = {
  args: {
    options: [],
    loading: true,
    loadingMessage: 'Loading options...',
    placeholder: 'Select...',
  },
};

// Empty state
export const Empty: Story = {
  args: {
    options: [],
    searchable: true,
    emptyMessage: 'No options available',
    placeholder: 'Select...',
  },
};

// Large list (performance)
export const LargeList: Story = {
  render: () => {
    const largeList: SelectOption[] = Array.from({ length: 1000 }, (_, i) => ({
      value: `option-${i}`,
      label: `Option ${i + 1}`,
      description: `Description for option ${i + 1}`,
    }));

    return (
      <Select
        options={largeList}
        searchable
        placeholder="Search from 1000 options..."
        maxHeight={400}
      />
    );
  },
};

// Async loading simulation
export const AsyncLoading: Story = {
  render: () => {
    const [options, setOptions] = useState<SelectOption[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const loadOptions = async () => {
      setLoading(true);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setOptions(basicOptions);
      setLoading(false);
    };

    const handleOpen = () => {
      setIsOpen(true);
      if (options.length === 0) {
        loadOptions();
      }
    };

    return (
      <Select
        options={options}
        loading={loading}
        placeholder="Click to load options..."
        onOpen={handleOpen}
      />
    );
  },
};

// Form integration
export const FormIntegration: Story = {
  render: () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = new FormData(e.currentTarget);
      const values = Object.fromEntries(data.entries());
      setFormData(values);
      setSubmitted(true);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="framework" className="block text-sm font-medium text-neutral-700 mb-1">
            Framework *
          </label>
          <Select
            id="framework"
            name="framework"
            options={basicOptions}
            placeholder="Select a framework..."
            required
            aria-label="Select framework"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium text-neutral-700 mb-1">
            Country
          </label>
          <Select
            id="country"
            name="country"
            options={countriesOptions}
            searchable
            placeholder="Select a country..."
            aria-label="Select country"
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
        >
          Submit
        </button>

        {submitted && formData && (
          <div className="p-4 bg-success-50 border border-success-200 rounded-lg">
            <h3 className="font-medium text-success-900 mb-2">Form Data:</h3>
            <pre className="text-sm text-success-800">{JSON.stringify(formData, null, 2)}</pre>
          </div>
        )}
      </form>
    );
  },
};

// Custom rendering
export const CustomRendering: Story = {
  render: () => (
    <Select
      options={basicOptions}
      placeholder="Select a framework..."
      renderValue={(value, options) => {
        const selected = options.find((opt) => opt.value === value);
        return selected ? (
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-500" />
            <strong>{selected.label}</strong>
          </span>
        ) : (
          <span>Select a framework...</span>
        );
      }}
      renderOption={(option, selected) => (
        <div className="flex items-center justify-between">
          <span className={selected ? 'font-bold' : ''}>{option.label}</span>
          {selected && <span className="text-primary-500">✓ Selected</span>}
        </div>
      )}
    />
  ),
};

// Accessibility demo
export const AccessibilityDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="p-4 bg-primary-50 border border-primary-200 rounded-lg">
        <h3 className="font-medium text-primary-900 mb-2">♿ Accessibility Features</h3>
        <ul className="text-sm text-primary-800 space-y-1">
          <li>✓ Full keyboard navigation (Arrow keys, Enter, Escape, Home, End)</li>
          <li>✓ Screen reader support with ARIA attributes</li>
          <li>✓ Focus visible indicators</li>
          <li>✓ Type-ahead search</li>
          <li>✓ Disabled states properly announced</li>
          <li>✓ Loading states communicated</li>
        </ul>
      </div>

      <div>
        <label id="accessible-label" className="block text-sm font-medium text-neutral-700 mb-1">
          Accessible Select
        </label>
        <Select
          options={basicOptions}
          placeholder="Try keyboard navigation..."
          aria-labelledby="accessible-label"
          aria-describedby="accessible-hint"
        />
        <p id="accessible-hint" className="mt-1 text-sm text-neutral-500">
          Use arrow keys to navigate, Enter to select, Escape to close
        </p>
      </div>
    </div>
  ),
};
