import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    label: 'Chip',
  },
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Primary" color="primary" />
      <Chip label="Secondary" color="secondary" />
      <Chip label="Success" color="success" />
      <Chip label="Warning" color="warning" />
      <Chip label="Error" color="error" />
      <Chip label="Neutral" color="neutral" />
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Primary" color="primary" variant="outlined" />
      <Chip label="Secondary" color="secondary" variant="outlined" />
      <Chip label="Success" color="success" variant="outlined" />
      <Chip label="Warning" color="warning" variant="outlined" />
      <Chip label="Error" color="error" variant="outlined" />
      <Chip label="Neutral" color="neutral" variant="outlined" />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Chip label="Small" size="sm" />
      <Chip label="Medium" size="md" />
      <Chip label="Large" size="lg" />
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip
        label="Starred"
        icon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        }
        color="warning"
      />
      <Chip
        label="Favorite"
        icon={
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
              clipRule="evenodd"
            />
          </svg>
        }
        color="error"
      />
    </div>
  ),
};

export const Deletable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="React" onDelete={() => alert('Delete React')} color="primary" />
      <Chip label="TypeScript" onDelete={() => alert('Delete TypeScript')} color="primary" />
      <Chip label="Tailwind" onDelete={() => alert('Delete Tailwind')} color="primary" />
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Click me" clickable onClick={() => alert('Chip clicked!')} />
      <Chip label="Or me" onClick={() => alert('Clicked!')} color="primary" />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Chip label="Disabled" disabled />
      <Chip label="Disabled Clickable" disabled clickable onClick={() => {}} />
      <Chip label="Disabled Deletable" disabled onDelete={() => {}} />
    </div>
  ),
};

export const TagList: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['JavaScript', 'Python', 'Java', 'C++', 'Go', 'Rust'].map((tag) => (
        <Chip
          key={tag}
          label={tag}
          color="primary"
          variant="outlined"
          onDelete={() => console.log(`Delete ${tag}`)}
        />
      ))}
    </div>
  ),
};
