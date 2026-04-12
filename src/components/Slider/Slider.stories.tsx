import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from './Slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Default: Story = {
  args: {
    defaultValue: 50,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Volume',
    defaultValue: 75,
  },
};

export const WithValue: Story = {
  render: () => {
    const [value, setValue] = useState(50);
    return <Slider label="Progress" value={value} onChange={setValue} showValue />;
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Slider label="Small" size="sm" defaultValue={33} />
      <Slider label="Medium" size="md" defaultValue={66} />
      <Slider label="Large" size="lg" defaultValue={99} />
    </div>
  ),
};

export const CustomRange: Story = {
  args: {
    label: 'Price',
    min: 0,
    max: 1000,
    step: 50,
    defaultValue: 500,
    showValue: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 50,
    disabled: true,
  },
};
