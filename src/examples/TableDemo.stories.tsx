import type { Meta, StoryObj } from '@storybook/react';
import { StickyColumnsDemo, ExpandableTableDemo, PaginatedTableDemo } from './TableDemo';

const meta: Meta = {
  title: 'Examples/Table Demos',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const StickyColumns: Story = {
  render: () => <StickyColumnsDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates sticky columns with the customer column pinned to the left and items count pinned to the right. The table features rich content rendering with avatars, badges, and proper overflow handling.',
      },
    },
  },
};

export const ExpandableTable: Story = {
  render: () => <ExpandableTableDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Shows expandable rows with sticky columns. Click the arrow icon to expand a row and view additional order details in a formatted grid layout.',
      },
    },
  },
};

export const PaginatedTable: Story = {
  render: () => <PaginatedTableDemo />,
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates pagination with a large dataset (30 items), sticky columns, sorting, and striped rows. You can change the page size and navigate through pages.',
      },
    },
  },
};
