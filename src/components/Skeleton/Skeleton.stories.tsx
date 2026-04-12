import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const MultipleLines: Story = {
  args: {
    variant: 'text',
    lines: 3,
  },
};

export const Circular: Story = {
  args: {
    variant: 'circular',
  },
};

export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: 200,
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Skeleton variant="text" width={100} />
      <Skeleton variant="text" width={200} />
      <Skeleton variant="text" width="50%" />
      <Skeleton variant="circular" width={64} height={64} />
      <Skeleton variant="rectangular" width={300} height={150} />
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div className="border border-neutral-200 rounded-lg p-6 max-w-sm">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton variant="circular" width={48} height={48} />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="60%" />
          <Skeleton variant="text" width="40%" />
        </div>
      </div>
      <Skeleton variant="rectangular" height={200} className="mb-4" />
      <Skeleton variant="text" lines={3} />
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div className="space-y-4 max-w-md">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="50%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const NoAnimation: Story = {
  args: {
    variant: 'text',
    lines: 3,
    animate: false,
  },
};
