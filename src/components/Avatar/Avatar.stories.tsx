import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    alt: 'User avatar',
  },
};

export const WithFallback: Story = {
  args: {
    fallback: 'JD',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <Avatar size="sm" fallback="SM" />
      <Avatar size="md" fallback="MD" />
      <Avatar size="lg" fallback="LG" />
      <Avatar size="xl" fallback="XL" />
      <Avatar size="2xl" fallback="2XL" />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex gap-4">
      <Avatar shape="circle" src="https://i.pravatar.cc/150?img=2" />
      <Avatar shape="square" src="https://i.pravatar.cc/150?img=3" />
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <div className="flex -space-x-2">
      <Avatar src="https://i.pravatar.cc/150?img=1" className="ring-2 ring-white" />
      <Avatar src="https://i.pravatar.cc/150?img=2" className="ring-2 ring-white" />
      <Avatar src="https://i.pravatar.cc/150?img=3" className="ring-2 ring-white" />
      <Avatar fallback="+3" className="ring-2 ring-white" />
    </div>
  ),
};
