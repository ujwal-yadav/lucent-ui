import type { Meta, StoryObj } from '@storybook/react';
import { Radio, RadioGroup } from './Radio';
import { useState } from 'react';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  args: { label: 'Radio option', name: 'radio' },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio size="sm" label="Small radio" name="size" />
      <Radio size="md" label="Medium radio" name="size" />
      <Radio size="lg" label="Large radio" name="size" />
    </div>
  ),
};

export const Group: Story = {
  render: () => {
    const [value, setValue] = useState('option1');
    return (
      <div className="space-y-4">
        <RadioGroup
          name="example"
          value={value}
          onChange={setValue}
          options={[
            { value: 'option1', label: 'Option 1' },
            { value: 'option2', label: 'Option 2' },
            { value: 'option3', label: 'Option 3' },
          ]}
        />
        <p className="text-sm text-gray-600">Selected: {value}</p>
      </div>
    );
  },
};

export const Horizontal: Story = {
  render: () => (
    <RadioGroup
      name="horizontal"
      direction="horizontal"
      options={[
        { value: '1', label: 'Yes' },
        { value: '2', label: 'No' },
        { value: '3', label: 'Maybe' },
      ]}
    />
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <RadioGroup
      name="disabled"
      options={[
        { value: '1', label: 'Enabled option' },
        { value: '2', label: 'Disabled option', disabled: true },
        { value: '3', label: 'Another enabled' },
      ]}
    />
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Unchecked State</h3>
        <Radio name="unchecked" label="Unchecked radio (gray border)" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Checked State</h3>
        <Radio name="checked" label="Checked radio (primary border)" defaultChecked />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Hover State</h3>
        <Radio name="hover" label="Hover over this radio to see primary border" />
      </div>
    </div>
  ),
};

export const FocusState: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Tab through the radio buttons to see the primary blue focus ring (#3535F3)
      </p>
      <RadioGroup
        name="focus-demo"
        options={[
          { value: 'option1', label: 'First radio' },
          { value: 'option2', label: 'Second radio' },
          { value: 'option3', label: 'Third radio' },
        ]}
      />
    </div>
  ),
};

export const PaymentMethod: Story = {
  render: () => {
    const [method, setMethod] = useState('card');
    return (
      <div className="space-y-4 max-w-sm">
        <h3 className="text-sm font-semibold text-neutral-900">Payment Method</h3>
        <RadioGroup
          name="payment"
          value={method}
          onChange={setMethod}
          options={[
            { value: 'card', label: 'Credit or Debit Card' },
            { value: 'paypal', label: 'PayPal' },
            { value: 'bank', label: 'Bank Transfer' },
            { value: 'crypto', label: 'Cryptocurrency' },
          ]}
        />
        <p className="text-sm text-gray-600 mt-4">
          Selected: <span className="font-medium text-neutral-900">{method}</span>
        </p>
      </div>
    );
  },
};

export const DesignSystem: Story = {
  render: () => {
    const [value, setValue] = useState('checked');
    return (
      <div className="space-y-6 max-w-md">
        <div>
          <h3 className="text-sm font-semibold text-gray-600 mb-3">Vercel Design System</h3>
          <RadioGroup
            name="design-demo"
            value={value}
            onChange={setValue}
            options={[
              { value: 'unchecked', label: 'Unchecked - Gray border (#808080)' },
              { value: 'checked', label: 'Checked - Primary accent (#3535F3)' },
            ]}
          />
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h4 className="text-xs font-semibold text-gray-600 mb-3">Design Features:</h4>
          <ul className="text-xs text-gray-600 space-y-2">
            <li>✅ Gray border (gray-400) when unchecked</li>
            <li>✅ Primary blue (#3535F3) filled dot when checked</li>
            <li>✅ Primary blue (#3535F3) focus ring</li>
            <li>✅ Hover changes border to primary</li>
            <li>✅ Font weight 400 (normal) for labels</li>
            <li>✅ Vercel black (#171717) text</li>
            <li>✅ 150ms smooth transitions</li>
          </ul>
        </div>
      </div>
    );
  },
};
