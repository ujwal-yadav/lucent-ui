import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text here...',
    rows: 4,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter a description...',
    rows: 4,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'Maximum 500 characters',
    rows: 4,
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    placeholder: 'Enter your message...',
    error: 'This field is required',
    rows: 4,
  },
};

export const Required: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments...',
    isRequired: true,
    rows: 4,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea size="sm" placeholder="Small textarea" rows={3} />
      <Textarea size="md" placeholder="Medium textarea (default)" rows={4} />
      <Textarea size="lg" placeholder="Large textarea" rows={5} />
    </div>
  ),
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-4">
      <Textarea label="No resize" resize="none" rows={3} />
      <Textarea label="Vertical resize (default)" resize="vertical" rows={3} />
      <Textarea label="Horizontal resize" resize="horizontal" rows={3} />
      <Textarea label="Both directions" resize="both" rows={3} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: 'Disabled textarea',
    placeholder: 'This is disabled...',
    disabled: true,
    rows: 4,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Content',
    defaultValue: 'This textarea has some initial content that can be edited.',
    rows: 4,
  },
};
