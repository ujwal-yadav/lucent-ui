import type { Meta, StoryObj } from '@storybook/react';
import { Menu } from './Menu';
import { Button } from '../Button';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  args: {
    trigger: <Button>Open Menu</Button>,
    items: [
      { label: 'Profile', onClick: () => alert('Profile clicked') },
      { label: 'Settings', onClick: () => alert('Settings clicked') },
      { label: 'Logout', onClick: () => alert('Logout clicked'), divider: true },
      { label: 'Help', onClick: () => alert('Help clicked') },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    trigger: <Button>Actions</Button>,
    items: [
      {
        label: 'Edit',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        ),
        onClick: () => alert('Edit'),
      },
      {
        label: 'Delete',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        ),
        onClick: () => alert('Delete'),
      },
    ],
  },
};

export const WithDisabled: Story = {
  args: {
    trigger: <Button>Options</Button>,
    items: [
      { label: 'Available Option', onClick: () => {} },
      { label: 'Disabled Option', onClick: () => {}, disabled: true },
      { label: 'Another Option', onClick: () => {} },
    ],
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <Menu
        trigger={<Button>Bottom Left</Button>}
        position="bottom-left"
        items={[
          { label: 'Option 1', onClick: () => {} },
          { label: 'Option 2', onClick: () => {} },
        ]}
      />
      <Menu
        trigger={<Button>Bottom Right</Button>}
        position="bottom-right"
        items={[
          { label: 'Option 1', onClick: () => {} },
          { label: 'Option 2', onClick: () => {} },
        ]}
      />
    </div>
  ),
};
