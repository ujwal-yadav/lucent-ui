import type { Meta, StoryObj } from '@storybook/react';
import { OrdersPage } from './OrdersPage';

const meta: Meta = {
  title: 'Examples/Complete Pages',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj;

export const OrderManagementPage: Story = {
  render: () => <OrdersPage />,
  parameters: {
    docs: {
      description: {
        story:
          'A complete order management page demonstrating real-world usage of the Table component with sticky columns, filters, search, pagination, expandable rows, and action menus. This example shows how multiple Lucent UI components work together to create a functional admin interface.',
      },
    },
  },
};
