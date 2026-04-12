import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useState } from 'react';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: { label: 'Accept terms and conditions' },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

export const Error: Story = {
  args: {
    label: 'Accept terms',
    error: true,
    helperText: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Disabled unchecked" disabled />
      <Checkbox label="Disabled checked" disabled defaultChecked />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <div className="space-y-2">
        <Checkbox
          label="Controlled checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p className="text-sm text-gray-600">Checked: {checked ? 'Yes' : 'No'}</p>
      </div>
    );
  },
};

export const States: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Unchecked State</h3>
        <Checkbox label="Unchecked checkbox (gray border)" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Checked State</h3>
        <Checkbox label="Checked checkbox (primary border)" defaultChecked />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Error State</h3>
        <Checkbox label="Error checkbox (red border)" error helperText="This field is required" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Hover State</h3>
        <Checkbox label="Hover over this checkbox to see primary border" />
      </div>
    </div>
  ),
};

export const FocusState: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Tab through the checkboxes to see the primary blue focus ring (#3535F3)
      </p>
      <Checkbox label="First checkbox" />
      <Checkbox label="Second checkbox" defaultChecked />
      <Checkbox label="Third checkbox" />
    </div>
  ),
};

export const CheckboxList: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(['option1']);

    const options = [
      { value: 'option1', label: 'Enable notifications' },
      { value: 'option2', label: 'Enable email updates' },
      { value: 'option3', label: 'Enable SMS alerts' },
      { value: 'option4', label: 'Enable push notifications' },
    ];

    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter((v) => v !== value));
      }
    };

    return (
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-neutral-900 mb-3">Notification Settings</h3>
        {options.map((option) => (
          <Checkbox
            key={option.value}
            label={option.label}
            checked={selected.includes(option.value)}
            onChange={(e) => handleChange(option.value, e.target.checked)}
          />
        ))}
        <p className="text-sm text-gray-600 mt-4">
          Selected: {selected.length} option{selected.length !== 1 ? 's' : ''}
        </p>
      </div>
    );
  },
};

export const DesignSystem: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Vercel Design System</h3>
        <div className="space-y-3">
          <Checkbox label="Unchecked - Gray border (#808080)" />
          <Checkbox label="Checked - Primary accent (#3535F3)" defaultChecked />
          <Checkbox label="Error - Danger accent (#f50031)" error defaultChecked />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-xs font-semibold text-gray-600 mb-3">Design Features:</h4>
        <ul className="text-xs text-gray-600 space-y-2">
          <li>✅ Gray border (gray-400) when unchecked</li>
          <li>✅ Primary blue (#3535F3) background when checked</li>
          <li>✅ White checkmark icon</li>
          <li>✅ Primary blue (#3535F3) focus ring</li>
          <li>✅ Hover changes border to primary</li>
          <li>✅ Font weight 400 (normal) for labels</li>
          <li>✅ Vercel black (#171717) text</li>
          <li>✅ 150ms smooth transitions</li>
        </ul>
      </div>
    </div>
  ),
};
