import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from './Progress';

const meta: Meta<typeof Progress> = {
  title: 'Components/Progress',
  component: Progress,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Progress>;

export const Default: Story = {
  args: { value: 60 },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Progress value={40} variant="primary" />
      <Progress value={60} variant="secondary" />
      <Progress value={80} variant="success" />
      <Progress value={30} variant="danger" />
      <Progress value={50} variant="warning" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Progress value={60} size="sm" />
      <Progress value={60} size="md" />
      <Progress value={60} size="lg" />
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-6 w-full">
      <Progress value={45} showLabel labelPosition="outside" />
      <Progress value={70} size="lg" showLabel labelPosition="inside" />
    </div>
  ),
};
