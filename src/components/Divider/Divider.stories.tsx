import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <p>Content above divider</p>
      <Divider />
      <p>Content below divider</p>
    </div>
  ),
};

export const WithLabel: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p>Section 1</p>
        <Divider label="OR" labelPosition="center" />
        <p>Section 2</p>
      </div>
    </div>
  ),
};

export const LabelPositions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Divider label="Left Label" labelPosition="left" />
      </div>
      <div>
        <Divider label="Center Label" labelPosition="center" />
      </div>
      <div>
        <Divider label="Right Label" labelPosition="right" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="mb-2 text-sm text-neutral-600">Solid (default)</p>
        <Divider variant="solid" />
      </div>
      <div>
        <p className="mb-2 text-sm text-neutral-600">Dashed</p>
        <Divider variant="dashed" />
      </div>
      <div>
        <p className="mb-2 text-sm text-neutral-600">Dotted</p>
        <Divider variant="dotted" />
      </div>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-24 gap-4">
      <div>Content 1</div>
      <Divider orientation="vertical" />
      <div>Content 2</div>
      <Divider orientation="vertical" variant="dashed" />
      <div>Content 3</div>
    </div>
  ),
};

export const InlineActions: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <button className="text-sm text-primary-600 hover:text-primary-700">Save</button>
        <Divider orientation="vertical" className="h-4" />
        <button className="text-sm text-primary-600 hover:text-primary-700">Cancel</button>
        <Divider orientation="vertical" className="h-4" />
        <button className="text-sm text-neutral-600 hover:text-neutral-700">Delete</button>
      </div>
    </div>
  ),
};
