import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
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
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <div>Card content goes here</div>,
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. It can contain any React components or HTML elements.</p>
      </CardContent>
      <CardFooter>
        <button className="px-4 py-2 bg-primary-500 text-white rounded-lg">Action</button>
        <button className="px-4 py-2 border border-neutral-300 rounded-lg">Cancel</button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Card variant="default">
        <CardTitle>Default Card</CardTitle>
        <p className="mt-2 text-neutral-600">With border</p>
      </Card>
      <Card variant="outlined">
        <CardTitle>Outlined Card</CardTitle>
        <p className="mt-2 text-neutral-600">With thicker border</p>
      </Card>
      <Card variant="elevated">
        <CardTitle>Elevated Card</CardTitle>
        <p className="mt-2 text-neutral-600">With shadow</p>
      </Card>
    </div>
  ),
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <>
        <CardTitle>Hoverable Card</CardTitle>
        <p className="mt-2 text-neutral-600">Hover over me to see the effect</p>
      </>
    ),
  },
};

export const Padding: Story = {
  render: () => (
    <div className="space-y-4">
      <Card padding="sm">
        <CardTitle>Small Padding</CardTitle>
      </Card>
      <Card padding="md">
        <CardTitle>Medium Padding (Default)</CardTitle>
      </Card>
      <Card padding="lg">
        <CardTitle>Large Padding</CardTitle>
      </Card>
    </div>
  ),
};
