import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  args: {
    content: 'This is a popover!',
    children: <Button>Click me</Button>,
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex items-center justify-center gap-8 p-20">
      <Popover content="Top popover" position="top">
        <Button>Top</Button>
      </Popover>
      <Popover content="Bottom popover" position="bottom">
        <Button>Bottom</Button>
      </Popover>
      <Popover content="Left popover" position="left">
        <Button>Left</Button>
      </Popover>
      <Popover content="Right popover" position="right">
        <Button>Right</Button>
      </Popover>
    </div>
  ),
};

export const HoverTrigger: Story = {
  args: {
    content: 'Hover over me!',
    trigger: 'hover',
    children: <Button>Hover me</Button>,
  },
};

export const RichContent: Story = {
  args: {
    content: (
      <div className="space-y-2">
        <h4 className="font-semibold">User Info</h4>
        <p className="text-sm text-neutral-600">Name: John Doe</p>
        <p className="text-sm text-neutral-600">Email: john@example.com</p>
      </div>
    ),
    children: <Button>View Details</Button>,
  },
};
