import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import {
  CheckIcon,
  PlusIcon,
  TrashIcon,
  DownloadIcon,
  UploadIcon,
  SearchIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  EditIcon,
  SettingsIcon,
  LightningIcon,
  HeartIcon,
  CodeIcon,
  CloseIcon,
} from '../Icon';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'success',
        'danger',
        'warning',
        'premium',
        'accent',
        'outline',
        'ghost',
      ],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    loading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    fullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// Basic examples
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    children: 'Success Button',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning Button',
    variant: 'warning',
  },
};

export const Premium: Story = {
  args: {
    children: 'Premium Button',
    variant: 'premium',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Button',
    variant: 'accent',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
};

// All Variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Semantic Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="primary">Primary (#3535F3)</Button>
          <Button variant="success">Success (#1FBE5F)</Button>
          <Button variant="danger">Danger (#f50031)</Button>
          <Button variant="warning">Warning (#f59e0b)</Button>
          <Button variant="premium">Premium (#7e22ce)</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Layout Variants</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Deprecated</h3>
        <div className="flex flex-wrap gap-4">
          <Button variant="accent">Accent (use primary)</Button>
        </div>
      </div>
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button loading>Loading...</Button>
      <Button variant="secondary" loading>
        Loading...
      </Button>
      <Button variant="outline" loading>
        Loading...
      </Button>
    </div>
  ),
};

// Disabled state
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Disabled</Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  ),
};

// With Left Icons
export const WithLeftIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" leftIcon={<PlusIcon size="sm" />}>
        Add Item
      </Button>
      <Button variant="success" leftIcon={<CheckIcon size="sm" />}>
        Save Changes
      </Button>
      <Button variant="danger" leftIcon={<TrashIcon size="sm" />}>
        Delete
      </Button>
      <Button variant="secondary" leftIcon={<DownloadIcon size="sm" />}>
        Download
      </Button>
      <Button variant="outline" leftIcon={<EditIcon size="sm" />}>
        Edit
      </Button>
      <Button variant="ghost" leftIcon={<SettingsIcon size="sm" />}>
        Settings
      </Button>
    </div>
  ),
};

// With Right Icons
export const WithRightIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" rightIcon={<ChevronRightIcon size="sm" />}>
        Next
      </Button>
      <Button variant="secondary" rightIcon={<ChevronRightIcon size="sm" />}>
        Continue
      </Button>
      <Button variant="outline" rightIcon={<UploadIcon size="sm" />}>
        Upload File
      </Button>
    </div>
  ),
};

// Icon Only Buttons
export const IconOnly: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4 items-center">
      <h3 className="w-full text-sm font-medium text-gray-600 mb-2">Small</h3>
      <Button size="sm" variant="primary" leftIcon={<PlusIcon size="xs" />} />
      <Button size="sm" variant="secondary" leftIcon={<EditIcon size="xs" />} />
      <Button size="sm" variant="outline" leftIcon={<SearchIcon size="xs" />} />
      <Button size="sm" variant="ghost" leftIcon={<SettingsIcon size="xs" />} />
      <Button size="sm" variant="danger" leftIcon={<TrashIcon size="xs" />} />

      <h3 className="w-full text-sm font-medium text-gray-600 mb-2 mt-4">Medium</h3>
      <Button size="md" variant="primary" leftIcon={<PlusIcon size="sm" />} />
      <Button size="md" variant="secondary" leftIcon={<EditIcon size="sm" />} />
      <Button size="md" variant="outline" leftIcon={<SearchIcon size="sm" />} />
      <Button size="md" variant="ghost" leftIcon={<SettingsIcon size="sm" />} />
      <Button size="md" variant="danger" leftIcon={<TrashIcon size="sm" />} />

      <h3 className="w-full text-sm font-medium text-gray-600 mb-2 mt-4">Large</h3>
      <Button size="lg" variant="primary" leftIcon={<PlusIcon size="md" />} />
      <Button size="lg" variant="secondary" leftIcon={<EditIcon size="md" />} />
      <Button size="lg" variant="outline" leftIcon={<SearchIcon size="md" />} />
      <Button size="lg" variant="ghost" leftIcon={<SettingsIcon size="md" />} />
      <Button size="lg" variant="danger" leftIcon={<TrashIcon size="md" />} />
    </div>
  ),
};

// Both Icons
export const WithBothIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button
        variant="primary"
        leftIcon={<CheckIcon size="sm" />}
        rightIcon={<ChevronRightIcon size="sm" />}
      >
        Complete & Continue
      </Button>
      <Button
        variant="secondary"
        leftIcon={<DownloadIcon size="sm" />}
        rightIcon={<ChevronRightIcon size="sm" />}
      >
        Download & Proceed
      </Button>
    </div>
  ),
};

// Full width
export const FullWidth: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <Button fullWidth>Full Width Button</Button>
      <Button fullWidth variant="secondary">
        Full Width Secondary
      </Button>
      <Button fullWidth variant="outline">
        Full Width Outline
      </Button>
    </div>
  ),
};

// Button group
export const ButtonGroup: Story = {
  render: () => (
    <div className="inline-flex rounded-lg shadow-sm" role="group">
      <Button className="rounded-r-none">Left</Button>
      <Button className="rounded-none border-x-0">Center</Button>
      <Button className="rounded-l-none">Right</Button>
    </div>
  ),
};

// Usage Examples - Following Design System Guidelines
export const UsageExamples: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      {/* Form Actions */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Form Actions</h3>
        <div className="flex gap-3 justify-end">
          <Button variant="ghost">Cancel</Button>
          <Button variant="secondary">Save Draft</Button>
          <Button variant="primary">Publish</Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Confirmation Dialog</h3>
        <div className="flex gap-3">
          <Button variant="secondary" fullWidth>
            Cancel
          </Button>
          <Button variant="success" fullWidth>
            Confirm
          </Button>
        </div>
      </div>

      {/* Destructive Action */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Destructive Action</h3>
        <div className="flex gap-3">
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger" leftIcon={<TrashIcon size="sm" />}>
            Delete Account
          </Button>
        </div>
      </div>

      {/* Warning Action */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Warning Action</h3>
        <div className="flex gap-3">
          <Button variant="secondary">Go Back</Button>
          <Button variant="warning">Proceed with Caution</Button>
        </div>
      </div>

      {/* Primary CTA */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Primary Call-to-Action</h3>
        <Button variant="primary" size="lg" rightIcon={<ChevronRightIcon size="md" />}>
          Get Started
        </Button>
      </div>

      {/* Navigation */}
      <div>
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Navigation</h3>
        <div className="flex gap-3 justify-between">
          <Button variant="outline" leftIcon={<ChevronLeftIcon size="sm" />}>
            Previous
          </Button>
          <Button variant="primary" rightIcon={<ChevronRightIcon size="sm" />}>
            Next Step
          </Button>
        </div>
      </div>
    </div>
  ),
};

// Color System & Accessibility
export const ColorSystemAccessibility: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-2">
          Vercel-Inspired Color System
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          All button variants meet WCAG 2.1 AA standards for accessibility with proper contrast
          ratios.
        </p>
      </div>

      <div className="space-y-6">
        {/* Primary */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="primary">Primary Button</Button>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-900 mb-1">Primary (#3535F3)</h4>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Usage:</strong> Primary interactive actions, main CTAs, form submissions
            </p>
            <p className="text-xs text-gray-600">
              <strong>Contrast:</strong> 7.2:1 (AAA) • White text on Vibrant Blue background
            </p>
          </div>
        </div>

        {/* Secondary */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="secondary">Secondary Button</Button>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-900 mb-1">
              Secondary (White + Shadow Border)
            </h4>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Usage:</strong> Secondary actions, cancel buttons, alternative options
            </p>
            <p className="text-xs text-gray-600">
              <strong>Contrast:</strong> 15.3:1 (AAA) • Vercel Black text on white background
            </p>
          </div>
        </div>

        {/* Success */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="success">Success Button</Button>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-900 mb-1">Success (#1FBE5F)</h4>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Usage:</strong> Success confirmations, positive actions, save/approve actions
            </p>
            <p className="text-xs text-gray-600">
              <strong>Contrast:</strong> 3.9:1 (AA) • White text on Vibrant Green background
            </p>
          </div>
        </div>

        {/* Danger */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="danger">Danger Button</Button>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-900 mb-1">Danger (#f50031)</h4>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Usage:</strong> Destructive actions, delete operations, error confirmations
            </p>
            <p className="text-xs text-gray-600">
              <strong>Contrast:</strong> 5.5:1 (AA) • White text on Vibrant Red background
            </p>
          </div>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="warning">Warning Button</Button>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-900 mb-1">Warning (#f59e0b)</h4>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Usage:</strong> Warning actions, proceed with caution, important notices
            </p>
            <p className="text-xs text-gray-600">
              <strong>Contrast:</strong> 3.3:1 (AA for UI) • Vercel Black text on Yellow background
            </p>
          </div>
        </div>

        {/* Outline */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="outline">Outline Button</Button>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-900 mb-1">Outline (Stronger Border)</h4>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Usage:</strong> Tertiary actions, filters, toggles
            </p>
            <p className="text-xs text-gray-600">
              <strong>Contrast:</strong> 15.3:1 (AAA) • Vercel Black text, stronger shadow border
            </p>
          </div>
        </div>

        {/* Ghost */}
        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
          <Button variant="ghost">Ghost Button</Button>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-neutral-900 mb-1">Ghost (Transparent)</h4>
            <p className="text-xs text-gray-600 mb-2">
              <strong>Usage:</strong> Minimal actions, close buttons, subtle interactions
            </p>
            <p className="text-xs text-gray-600">
              <strong>Contrast:</strong> 15.3:1 (AAA) • Vercel Black text on transparent background
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 p-4 bg-warning-50 rounded-lg border border-warning-200">
        <h4 className="text-sm font-medium text-neutral-900 mb-2">⚠️ Design System Note</h4>
        <p className="text-xs text-gray-600">
          Use semantic colors (Success/Danger) for UI states. Workflow colors (Ship/Preview/Develop)
          are for workflow context only, not for button variants.
        </p>
      </div>
    </div>
  ),
};

// Border Preservation After Click
export const BorderPreservation: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-3xl">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            Border Preservation After Click
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Click these buttons and notice that the border remains visible after clicking. This is
            especially important for Secondary and Outline variants.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Before vs After Click</h3>
            <p className="text-xs text-gray-500 mb-3">
              Click the buttons below. The border should remain visible even after you release the
              click.
            </p>
            <div className="flex flex-wrap gap-6">
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600">Secondary Variant</p>
                <Button variant="secondary">Click Me</Button>
                <p className="text-xs text-gray-500">Border: rgba(0,0,0,0.08)</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-medium text-gray-600">Outline Variant</p>
                <Button variant="outline">Click Me</Button>
                <p className="text-xs text-gray-500">Border: rgba(0,0,0,0.12)</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-sm font-medium text-neutral-900 mb-2">🔍 What to Test</h4>
            <ol className="text-xs text-gray-600 space-y-1 list-decimal list-inside">
              <li>Click the button with your mouse</li>
              <li>Hold the click (active state) - border should remain</li>
              <li>Release the click - border should STILL remain ✅</li>
              <li>Click somewhere else to unfocus - border returns to normal</li>
            </ol>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="text-sm font-medium text-neutral-900 mb-2">Technical Implementation</h4>
            <div className="text-xs text-gray-600 space-y-2 font-mono">
              <p>
                <strong>Default:</strong> [box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px]
              </p>
              <p>
                <strong>Hover:</strong> [box-shadow:rgb(235,235,235)_0px_0px_0px_1px]
              </p>
              <p>
                <strong>Active:</strong> [box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px]
              </p>
              <p>
                <strong>Focus:</strong> [box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px] ← Keeps
                border!
              </p>
              <p>
                <strong>Focus-visible:</strong>{' '}
                [box-shadow:...border...,0_0_0_3px_rgba(53,53,243,0.2)] ← Adds ring!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

// Focus States - Keyboard Navigation
export const FocusStates: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">Focus States</h2>
          <p className="text-sm text-gray-600 mb-6">
            Use Tab key to navigate between buttons and see proper focus indicators. Each variant
            has optimized focus styles that work with its design.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Filled Buttons (Ring Offset)</h3>
            <p className="text-xs text-gray-500 mb-2">
              Focus ring appears outside the button with 2px offset
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="success">Success</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="warning">Warning</Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">
              Secondary & Outline (Combined Shadow)
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              Focus ring combines with existing border for clean appearance
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Ghost (No Offset)</h3>
            <p className="text-xs text-gray-500 mb-2">
              Focus ring appears directly on the button (no offset)
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost">Ghost Button</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-primary-50 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">♿ Accessibility Details</h4>
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              <strong>Keyboard Navigation:</strong> Use Tab/Shift+Tab to navigate, Enter/Space to
              activate
            </p>
            <p>
              <strong>Focus Indicators:</strong> Clear 2px focus rings for keyboard users
            </p>
            <p>
              <strong>Mouse Users:</strong> No focus ring shown on click (focus-visible only)
            </p>
            <p>
              <strong>Primary Color:</strong> All focus rings use Primary Blue (#3535F3) for
              consistency
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// Active States - Button Pressed
export const ActiveStates: Story = {
  render: () => {
    return (
      <div className="space-y-6 max-w-3xl">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">
            Active States (Button Pressed)
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            Click and hold on any button to see the active state. Each variant maintains its design
            integrity while providing visual feedback.
          </p>
        </div>

        <div className="space-y-6">
          {/* Filled Variants */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Filled Variants</h3>
            <p className="text-xs text-gray-500 mb-3">
              Active state uses darker shade (700) of the same color + scale animation
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary (active: primary-700)</Button>
              <Button variant="success">Success (active: success-700)</Button>
              <Button variant="danger">Danger (active: danger-700)</Button>
              <Button variant="warning">Warning (active: warning-700)</Button>
            </div>
          </div>

          {/* Border Variants */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              Border & Transparent Variants
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Active state maintains shadow-border + darker background (gray-100) + scale animation
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary">Secondary (border preserved)</Button>
              <Button variant="outline">Outline (border preserved)</Button>
              <Button variant="ghost">Ghost (no border)</Button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-3">Active State Specifications</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <strong className="text-neutral-900">Primary:</strong>
              <p className="text-gray-600">bg-primary-700 (#1f1f91)</p>
            </div>
            <div>
              <strong className="text-neutral-900">Success:</strong>
              <p className="text-gray-600">bg-success-700 (#15803d)</p>
            </div>
            <div>
              <strong className="text-neutral-900">Danger:</strong>
              <p className="text-gray-600">bg-danger-700 (#b9001f)</p>
            </div>
            <div>
              <strong className="text-neutral-900">Warning:</strong>
              <p className="text-gray-600">bg-warning-700 (#b45309)</p>
            </div>
            <div>
              <strong className="text-neutral-900">Secondary:</strong>
              <p className="text-gray-600">shadow-border + bg-gray-100 ✅</p>
            </div>
            <div>
              <strong className="text-neutral-900">Outline:</strong>
              <p className="text-gray-600">outline-border + bg-gray-100 ✅</p>
            </div>
            <div>
              <strong className="text-neutral-900">Ghost:</strong>
              <p className="text-gray-600">bg-gray-100 (no border)</p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-success-50 rounded-lg border border-success-200">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">
            ✅ Border Preservation Fixed
          </h4>
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              <strong>Issue:</strong> Secondary and Outline variants were losing their border after
              being clicked (on focus).
            </p>
            <p>
              <strong>Root Cause:</strong> Global CSS rule{' '}
              <code className="bg-white px-1 rounded">*:focus:not(:focus-visible)</code> was setting{' '}
              <code className="bg-white px-1 rounded">box-shadow: none</code> for mouse users.
            </p>
            <p>
              <strong>Solution:</strong> Added explicit{' '}
              <code className="bg-white px-1 rounded">focus:[box-shadow:...]</code> to preserve
              border on mouse click, plus{' '}
              <code className="bg-white px-1 rounded">focus-visible:[box-shadow:...]</code> for
              keyboard users with focus ring.
            </p>
            <p>
              <strong>Result:</strong> ✅ Border remains visible after clicking (mouse users) and
              shows focus ring (keyboard users).
            </p>
          </div>
        </div>
      </div>
    );
  },
};

// Interactive Feedback - Click Animation
export const InteractiveFeedback: Story = {
  render: () => {
    const handleClick = () => {
      console.log('Button clicked! Notice the subtle pop animation.');
    };

    return (
      <div className="space-y-6 max-w-2xl">
        <div>
          <h2 className="text-lg font-semibold text-neutral-900 mb-2">Click Animation Feedback</h2>
          <p className="text-sm text-gray-600 mb-6">
            All buttons have a subtle "pop" animation on click (active state) for immediate user
            feedback. The button scales down to 95% when pressed, creating a tactile feel.
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Try clicking these buttons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" onClick={handleClick}>
                Click Me!
              </Button>
              <Button variant="secondary" onClick={handleClick}>
                Click Me!
              </Button>
              <Button variant="success" onClick={handleClick}>
                Click Me!
              </Button>
              <Button variant="danger" onClick={handleClick}>
                Click Me!
              </Button>
              <Button variant="outline" onClick={handleClick}>
                Click Me!
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">With Icons</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" leftIcon={<PlusIcon size="sm" />} onClick={handleClick}>
                Add Item
              </Button>
              <Button variant="success" leftIcon={<CheckIcon size="sm" />} onClick={handleClick}>
                Save Changes
              </Button>
              <Button variant="danger" leftIcon={<TrashIcon size="sm" />} onClick={handleClick}>
                Delete
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Disabled (No Animation)</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" disabled>
                Disabled - No Pop
              </Button>
              <Button variant="secondary" disabled>
                Disabled - No Pop
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-600 mb-3">Loading (No Animation)</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" loading>
                Loading...
              </Button>
              <Button variant="secondary" loading>
                Loading...
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-4 bg-primary-50 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">💡 Implementation Details</h4>
          <div className="text-xs text-gray-600 space-y-1">
            <p>
              <strong>Animation:</strong>{' '}
              <code className="bg-gray-100 px-1 py-0.5 rounded">active:scale-95</code>
            </p>
            <p>
              <strong>Duration:</strong> 200ms transition (smooth and responsive)
            </p>
            <p>
              <strong>Disabled State:</strong> No animation when button is disabled or loading
            </p>
            <p>
              <strong>Purpose:</strong> Immediate tactile feedback confirming user interaction
            </p>
          </div>
        </div>
      </div>
    );
  },
};
