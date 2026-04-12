import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from './Rating';
import { useState } from 'react';

const meta: Meta<typeof Rating> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Rating>;

export const Default: Story = {
  args: {
    defaultValue: 0,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: 3.5,
    precision: 0.5,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating size="sm" defaultValue={4} />
      <Rating size="md" defaultValue={4} />
      <Rating size="lg" defaultValue={4} />
    </div>
  ),
};

export const ReadOnly: Story = {
  args: {
    value: 4.5,
    precision: 0.5,
    readOnly: true,
  },
};

export const Disabled: Story = {
  args: {
    value: 3,
    disabled: true,
  },
};

export const HalfStars: Story = {
  render: () => {
    const [value, setValue] = useState(2.5);

    return (
      <div className="space-y-2">
        <Rating value={value} onChange={setValue} precision={0.5} />
        <p className="text-sm text-neutral-600">Selected: {value} stars</p>
      </div>
    );
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(3);

    return (
      <div className="space-y-4">
        <Rating value={value} onChange={setValue} />
        <div className="space-x-2">
          <button
            onClick={() => setValue(Math.max(0, value - 1))}
            className="px-3 py-1 text-sm bg-neutral-200 rounded hover:bg-neutral-300"
          >
            Decrease
          </button>
          <button
            onClick={() => setValue(Math.min(5, value + 1))}
            className="px-3 py-1 text-sm bg-neutral-200 rounded hover:bg-neutral-300"
          >
            Increase
          </button>
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1 text-sm bg-neutral-200 rounded hover:bg-neutral-300"
          >
            Reset
          </button>
        </div>
        <p className="text-sm text-neutral-600">Rating: {value}/5</p>
      </div>
    );
  },
};

export const CustomMax: Story = {
  args: {
    max: 10,
    defaultValue: 7,
  },
};

export const ProductRating: Story = {
  render: () => (
    <div className="max-w-md border border-neutral-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-2">Wireless Headphones</h3>
      <div className="flex items-center gap-2 mb-4">
        <Rating value={4.5} precision={0.5} readOnly />
        <span className="text-sm text-neutral-600">(1,234 reviews)</span>
      </div>
      <p className="text-neutral-600 text-sm mb-4">
        Premium wireless headphones with active noise cancellation and 30-hour battery life.
      </p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold">$299.99</span>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600">
          Add to Cart
        </button>
      </div>
    </div>
  ),
};
