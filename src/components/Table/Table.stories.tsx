import type { Meta, StoryObj } from '@storybook/react';
import { Table } from './Table';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Table> = {
  title: 'Components/Table',
  component: Table,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Table>;

const sampleData = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Moderator' },
];

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
];

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    getRowKey: (item) => item.id,
    bordered: true,
  },
};

export const Striped: Story = {
  args: {
    columns,
    data: sampleData,
    getRowKey: (item) => item.id,
    striped: true,
    bordered: true,
  },
};

export const Bordered: Story = {
  args: {
    columns,
    data: sampleData,
    getRowKey: (item) => item.id,
    bordered: true,
  },
};

export const Clickable: Story = {
  args: {
    columns,
    data: sampleData,
    getRowKey: (item) => item.id,
    onRowClick: (item) => alert(`Clicked: ${item.name}`),
    bordered: true,
  },
};

export const Expandable: Story = {
  args: {
    columns,
    data: sampleData,
    getRowKey: (item) => item.id,
    expandable: true,
    bordered: true,
    renderExpandedContent: (item) => (
      <div className="p-4 space-y-2">
        <p className="text-sm font-semibold text-neutral-700">Additional Details</p>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-neutral-500">User ID:</span>
            <span className="ml-2 text-neutral-900">{item.id}</span>
          </div>
          <div>
            <span className="text-neutral-500">Full Name:</span>
            <span className="ml-2 text-neutral-900">{item.name}</span>
          </div>
          <div>
            <span className="text-neutral-500">Email:</span>
            <span className="ml-2 text-neutral-900">{item.email}</span>
          </div>
          <div>
            <span className="text-neutral-500">Role:</span>
            <span className="ml-2 text-neutral-900">{item.role}</span>
          </div>
        </div>
      </div>
    ),
  },
};

export const ExpandableStriped: Story = {
  args: {
    columns,
    data: sampleData,
    getRowKey: (item) => item.id,
    expandable: true,
    striped: true,
    bordered: true,
    renderExpandedContent: (item) => (
      <div className="p-4">
        <p className="text-sm text-neutral-700">
          This is the expanded content for <strong>{item.name}</strong>. You can display any custom
          content here, such as nested tables, forms, or additional details.
        </p>
      </div>
    ),
  },
};

// Rich data with avatars, badges, and custom rendering
const ordersData = [
  {
    id: 1,
    customer: {
      name: 'Alex Johnson',
      email: 'alex@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    amount: 459.97,
    status: 'shipped',
    items: 12,
    date: '2024-04-08',
  },
  {
    id: 2,
    customer: {
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    amount: 299.5,
    status: 'pending',
    items: 5,
    date: '2024-04-10',
  },
  {
    id: 3,
    customer: {
      name: 'Michael Chen',
      email: 'michael@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    amount: 1250.0,
    status: 'delivered',
    items: 24,
    date: '2024-04-05',
  },
  {
    id: 4,
    customer: {
      name: 'Emma Davis',
      email: 'emma@example.com',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    amount: 89.99,
    status: 'cancelled',
    items: 3,
    date: '2024-04-11',
  },
];

const statusVariants = {
  shipped: 'primary',
  pending: 'warning',
  delivered: 'success',
  cancelled: 'danger',
} as const;

export const RichColumns: Story = {
  args: {
    columns: [
      {
        key: 'customer',
        header: 'Customer',
        render: (item) => (
          <div className="flex items-center gap-3">
            <img
              src={item.customer.avatar}
              alt={item.customer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-neutral-900">{item.customer.name}</div>
              <div className="text-sm text-neutral-500">{item.customer.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'amount',
        header: 'Amount',
        sortable: true,
        render: (item) => (
          <span className="font-semibold text-neutral-900">${item.amount.toFixed(2)}</span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (item) => (
          <Badge variant={statusVariants[item.status as keyof typeof statusVariants]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        ),
      },
      {
        key: 'date',
        header: 'Order Date',
        sortable: true,
        render: (item) => <span className="text-neutral-600">{item.date}</span>,
      },
      {
        key: 'items',
        header: 'Items',
        sortable: true,
        render: (item) => <span className="text-neutral-700">{item.items} items</span>,
      },
    ],
    data: ordersData,
    getRowKey: (item) => item.id,
    hoverable: true,
    bordered: true,
  },
};

export const RichColumnsExpandable: Story = {
  args: {
    columns: [
      {
        key: 'customer',
        header: 'Customer',
        render: (item) => (
          <div className="flex items-center gap-3">
            <img
              src={item.customer.avatar}
              alt={item.customer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-neutral-900">{item.customer.name}</div>
              <div className="text-sm text-neutral-500">{item.customer.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'amount',
        header: 'Amount',
        sortable: true,
        render: (item) => (
          <span className="font-semibold text-neutral-900">${item.amount.toFixed(2)}</span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (item) => (
          <Badge variant={statusVariants[item.status as keyof typeof statusVariants]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        ),
      },
      {
        key: 'date',
        header: 'Order Date',
        sortable: true,
        render: (item) => <span className="text-neutral-600">{item.date}</span>,
      },
      {
        key: 'items',
        header: 'Items',
        sortable: true,
        render: (item) => <span className="text-neutral-700">{item.items} items</span>,
      },
    ],
    data: ordersData,
    getRowKey: (item) => item.id,
    hoverable: true,
    bordered: true,
    expandable: true,
    renderExpandedContent: (item) => (
      <div className="p-4 space-y-3">
        <h4 className="font-semibold text-neutral-900">Order Details</h4>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-neutral-500">Order ID</div>
            <div className="text-neutral-900 font-medium">
              #{item.id.toString().padStart(6, '0')}
            </div>
          </div>
          <div>
            <div className="text-neutral-500">Customer Email</div>
            <div className="text-neutral-900">{item.customer.email}</div>
          </div>
          <div>
            <div className="text-neutral-500">Total Items</div>
            <div className="text-neutral-900">{item.items} items</div>
          </div>
          <div>
            <div className="text-neutral-500">Order Amount</div>
            <div className="text-neutral-900 font-semibold">${item.amount.toFixed(2)}</div>
          </div>
          <div>
            <div className="text-neutral-500">Status</div>
            <div className="text-neutral-900 capitalize">{item.status}</div>
          </div>
          <div>
            <div className="text-neutral-500">Shipping Address</div>
            <div className="text-neutral-900">123 Main St, City, State 12345</div>
          </div>
        </div>
      </div>
    ),
  },
};

// Larger dataset for pagination demo
const largeDataset = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Moderator'][i % 3],
}));

export const WithPagination: Story = {
  args: {
    columns,
    data: largeDataset,
    getRowKey: (item) => item.id,
    bordered: true,
    pagination: true,
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 20, 50],
  },
};

export const PaginatedStriped: Story = {
  args: {
    columns,
    data: largeDataset,
    getRowKey: (item) => item.id,
    bordered: true,
    striped: true,
    pagination: true,
    defaultPageSize: 10,
  },
};

// Large order dataset for rich columns with pagination
const largeOrdersData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  customer: {
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@example.com`,
    avatar: `https://i.pravatar.cc/150?img=${(i % 70) + 1}`,
  },
  amount: Math.random() * 1000 + 50,
  status: ['shipped', 'pending', 'delivered', 'cancelled'][i % 4],
  items: Math.floor(Math.random() * 20) + 1,
  date: `2024-04-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
}));

export const RichColumnsPaginated: Story = {
  args: {
    columns: [
      {
        key: 'customer',
        header: 'Customer',
        render: (item) => (
          <div className="flex items-center gap-3">
            <img
              src={item.customer.avatar}
              alt={item.customer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-neutral-900">{item.customer.name}</div>
              <div className="text-sm text-neutral-500">{item.customer.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'amount',
        header: 'Amount',
        sortable: true,
        render: (item) => (
          <span className="font-semibold text-neutral-900">${item.amount.toFixed(2)}</span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        sortable: true,
        render: (item) => (
          <Badge variant={statusVariants[item.status as keyof typeof statusVariants]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        ),
      },
      {
        key: 'date',
        header: 'Order Date',
        sortable: true,
        render: (item) => <span className="text-neutral-600">{item.date}</span>,
      },
      {
        key: 'items',
        header: 'Items',
        sortable: true,
        render: (item) => <span className="text-neutral-700">{item.items} items</span>,
      },
    ],
    data: largeOrdersData,
    getRowKey: (item) => item.id,
    hoverable: true,
    bordered: true,
    pagination: true,
    defaultPageSize: 5,
    pageSizeOptions: [5, 10, 20],
  },
};

// Wide table data for sticky columns demo
const wideTableData = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ['Admin', 'User', 'Moderator'][i % 3],
  department: ['Engineering', 'Sales', 'Marketing', 'Support'][i % 4],
  location: ['New York', 'London', 'Tokyo', 'Sydney'][i % 4],
  joined: `2024-0${(i % 9) + 1}-15`,
  status: ['Active', 'Inactive'][i % 2],
  projects: Math.floor(Math.random() * 20) + 1,
  tasks: Math.floor(Math.random() * 50) + 1,
  salary: `$${(Math.random() * 100000 + 50000).toFixed(0)}`,
  experience: `${Math.floor(Math.random() * 15) + 1} years`,
  team: ['Alpha', 'Beta', 'Gamma', 'Delta'][i % 4],
  manager: `Manager ${(i % 5) + 1}`,
  phone: `+1 555-${String(1000 + i).padStart(4, '0')}`,
  extension: String(1000 + i),
}));

export const StickyColumns: Story = {
  args: {
    columns: [
      {
        key: 'id',
        header: 'ID',
        sticky: 'left',
        width: '80px',
        render: (item) => <span className="font-mono text-neutral-600">#{item.id}</span>,
      },
      {
        key: 'name',
        header: 'Name',
        sticky: 'left',
        width: '180px',
        sortable: true,
        render: (item) => <span className="font-medium text-neutral-900">{item.name}</span>,
      },
      {
        key: 'email',
        header: 'Email',
        width: '250px',
      },
      {
        key: 'role',
        header: 'Role',
        width: '140px',
        sortable: true,
      },
      {
        key: 'department',
        header: 'Department',
        width: '160px',
        sortable: true,
      },
      {
        key: 'team',
        header: 'Team',
        width: '120px',
      },
      {
        key: 'manager',
        header: 'Manager',
        width: '150px',
      },
      {
        key: 'location',
        header: 'Location',
        width: '140px',
      },
      {
        key: 'phone',
        header: 'Phone',
        width: '160px',
      },
      {
        key: 'extension',
        header: 'Ext',
        width: '100px',
      },
      {
        key: 'salary',
        header: 'Salary',
        width: '130px',
        sortable: true,
      },
      {
        key: 'experience',
        header: 'Experience',
        width: '140px',
      },
      {
        key: 'joined',
        header: 'Joined Date',
        width: '140px',
        sortable: true,
      },
      {
        key: 'status',
        header: 'Status',
        width: '120px',
        render: (item) => (
          <Badge variant={item.status === 'Active' ? 'success' : 'neutral'}>{item.status}</Badge>
        ),
      },
      {
        key: 'projects',
        header: 'Projects',
        width: '110px',
        sortable: true,
      },
      {
        key: 'tasks',
        header: 'Tasks',
        sticky: 'right',
        width: '100px',
        sortable: true,
        render: (item) => <span className="font-semibold text-primary-600">{item.tasks}</span>,
      },
    ],
    data: wideTableData,
    getRowKey: (item) => item.id,
    bordered: true,
    hoverable: true,
    pagination: true,
    defaultPageSize: 10,
  },
};

export const StickyColumnsRich: Story = {
  args: {
    columns: [
      {
        key: 'customer',
        header: 'Customer',
        sticky: 'left',
        width: '300px',
        render: (item) => (
          <div className="flex items-center gap-3">
            <img
              src={item.customer.avatar}
              alt={item.customer.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <div className="font-medium text-neutral-900">{item.customer.name}</div>
              <div className="text-sm text-neutral-500">{item.customer.email}</div>
            </div>
          </div>
        ),
      },
      {
        key: 'id',
        header: 'Order ID',
        width: '130px',
        render: (item) => (
          <span className="font-mono text-neutral-600">#{item.id.toString().padStart(6, '0')}</span>
        ),
      },
      {
        key: 'date',
        header: 'Order Date',
        width: '160px',
        render: () => (
          <span className="text-neutral-700">2024-04-{Math.floor(Math.random() * 28) + 1}</span>
        ),
      },
      {
        key: 'amount',
        header: 'Amount',
        width: '140px',
        sortable: true,
        render: (item) => (
          <span className="font-semibold text-neutral-900">${item.amount.toFixed(2)}</span>
        ),
      },
      {
        key: 'payment',
        header: 'Payment Method',
        width: '160px',
        render: () => {
          const methods = ['Credit Card', 'PayPal', 'Bank Transfer', 'Cash'];
          return (
            <span className="text-neutral-700">
              {methods[Math.floor(Math.random() * methods.length)]}
            </span>
          );
        },
      },
      {
        key: 'shipping',
        header: 'Shipping',
        width: '140px',
        render: () => {
          const methods = ['Express', 'Standard', 'Economy'];
          return (
            <span className="text-neutral-700">
              {methods[Math.floor(Math.random() * methods.length)]}
            </span>
          );
        },
      },
      {
        key: 'tracking',
        header: 'Tracking Number',
        width: '180px',
        render: () => (
          <span className="font-mono text-xs text-neutral-600">
            TRK{Math.floor(Math.random() * 1000000000)}
          </span>
        ),
      },
      {
        key: 'status',
        header: 'Status',
        width: '130px',
        sortable: true,
        render: (item) => (
          <Badge variant={statusVariants[item.status as keyof typeof statusVariants]}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        ),
      },
      {
        key: 'items',
        header: 'Items',
        sticky: 'right',
        width: '100px',
        sortable: true,
        render: (item) => <span className="font-semibold text-primary-600">{item.items}</span>,
      },
    ],
    data: largeOrdersData,
    getRowKey: (item) => item.id,
    hoverable: true,
    bordered: true,
    pagination: true,
    defaultPageSize: 8,
  },
};

export const MultipleStickyColumns: Story = {
  args: {
    columns: [
      {
        key: 'id',
        header: 'ID',
        sticky: 'left',
        width: '70px',
        render: (item) => <span className="font-mono text-xs text-neutral-600">#{item.id}</span>,
      },
      {
        key: 'name',
        header: 'Name',
        sticky: 'left',
        width: '160px',
        sortable: true,
        render: (item) => <span className="font-semibold text-neutral-900">{item.name}</span>,
      },
      {
        key: 'email',
        header: 'Email Address',
        width: '240px',
        render: (item) => <span className="text-neutral-600">{item.email}</span>,
      },
      {
        key: 'role',
        header: 'Role',
        width: '130px',
        sortable: true,
        render: (item) => <Badge variant="secondary">{item.role}</Badge>,
      },
      {
        key: 'department',
        header: 'Department',
        width: '150px',
        sortable: true,
      },
      {
        key: 'team',
        header: 'Team',
        width: '110px',
        render: (item) => <Badge variant="accent">{item.team}</Badge>,
      },
      {
        key: 'manager',
        header: 'Direct Manager',
        width: '160px',
      },
      {
        key: 'location',
        header: 'Office Location',
        width: '150px',
      },
      {
        key: 'phone',
        header: 'Phone Number',
        width: '150px',
        render: (item) => <span className="font-mono text-sm text-neutral-600">{item.phone}</span>,
      },
      {
        key: 'extension',
        header: 'Extension',
        width: '110px',
        render: (item) => (
          <span className="font-mono text-sm text-neutral-600">{item.extension}</span>
        ),
      },
      {
        key: 'salary',
        header: 'Annual Salary',
        width: '140px',
        sortable: true,
        render: (item) => <span className="font-semibold text-neutral-900">{item.salary}</span>,
      },
      {
        key: 'experience',
        header: 'Experience',
        width: '130px',
        render: (item) => <span className="text-neutral-700">{item.experience}</span>,
      },
      {
        key: 'joined',
        header: 'Join Date',
        width: '130px',
        sortable: true,
        render: (item) => <span className="text-neutral-600">{item.joined}</span>,
      },
      {
        key: 'projects',
        header: 'Projects',
        sticky: 'right',
        width: '100px',
        sortable: true,
        render: (item) => <span className="font-semibold text-success-600">{item.projects}</span>,
      },
      {
        key: 'tasks',
        header: 'Tasks',
        sticky: 'right',
        width: '90px',
        sortable: true,
        render: (item) => <span className="font-semibold text-primary-600">{item.tasks}</span>,
      },
    ],
    data: wideTableData,
    getRowKey: (item) => item.id,
    bordered: true,
    striped: true,
    hoverable: true,
    pagination: true,
    defaultPageSize: 8,
  },
};
