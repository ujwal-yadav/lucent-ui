import React from 'react';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';

/**
 * Table Demo
 *
 * This file demonstrates the Table component with sticky columns,
 * pagination, sorting, and rich content rendering.
 */

// Sample customer data matching the screenshot
const customersData = [
  {
    id: 'ORD00001',
    customer: {
      name: 'Customer 1',
      email: 'customer1@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
    },
    orderDate: '2024-04-27',
    amount: 277.82,
    paymentMethod: 'PayPal',
    shipping: 'Economy',
    trackingNumber: 'TRK175353752',
    items: 5,
  },
  {
    id: 'ORD00002',
    customer: {
      name: 'Customer 2',
      email: 'customer2@example.com',
      avatar: 'https://i.pravatar.cc/150?img=2',
    },
    orderDate: '2024-04-18',
    amount: 542.2,
    paymentMethod: 'PayPal',
    shipping: 'Economy',
    trackingNumber: 'TRK216692294',
    items: 16,
  },
  {
    id: 'ORD00003',
    customer: {
      name: 'Customer 3',
      email: 'customer3@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
    },
    orderDate: '2024-04-03',
    amount: 560.28,
    paymentMethod: 'PayPal',
    shipping: 'Economy',
    trackingNumber: 'TRK65166456',
    items: 6,
  },
  {
    id: 'ORD00004',
    customer: {
      name: 'Customer 4',
      email: 'customer4@example.com',
      avatar: 'https://i.pravatar.cc/150?img=4',
    },
    orderDate: '2024-04-16',
    amount: 560.77,
    paymentMethod: 'PayPal',
    shipping: 'Standard',
    trackingNumber: 'TRK62128871',
    items: 4,
  },
  {
    id: 'ORD00005',
    customer: {
      name: 'Customer 5',
      email: 'customer5@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
    },
    orderDate: '2024-04-24',
    amount: 218.11,
    paymentMethod: 'Cash',
    shipping: 'Standard',
    trackingNumber: 'TRK48945331',
    items: 16,
  },
  {
    id: 'ORD00006',
    customer: {
      name: 'Customer 6',
      email: 'customer6@example.com',
      avatar: 'https://i.pravatar.cc/150?img=6',
    },
    orderDate: '2024-04-18',
    amount: 864.27,
    paymentMethod: 'Cash',
    shipping: 'Express',
    trackingNumber: 'TRK91379337',
    items: 19,
  },
  {
    id: 'ORD00007',
    customer: {
      name: 'Customer 7',
      email: 'customer7@example.com',
      avatar: 'https://i.pravatar.cc/150?img=7',
    },
    orderDate: '2024-04-27',
    amount: 484.99,
    paymentMethod: 'Cash',
    shipping: 'Standard',
    trackingNumber: 'TRK94216435',
    items: 14,
  },
  {
    id: 'ORD00008',
    customer: {
      name: 'Customer 8',
      email: 'customer8@example.com',
      avatar: 'https://i.pravatar.cc/150?img=8',
    },
    orderDate: '2024-04-20',
    amount: 713.3,
    paymentMethod: 'Bank Transfer',
    shipping: 'Standard',
    trackingNumber: 'TRK23884678',
    items: 13,
  },
];

const paymentMethodColors: Record<string, 'primary' | 'success' | 'warning' | 'neutral'> = {
  PayPal: 'primary',
  'Bank Transfer': 'success',
  Cash: 'warning',
  'Credit Card': 'neutral',
};

const shippingColors: Record<string, 'primary' | 'success' | 'warning' | 'neutral'> = {
  Express: 'primary',
  Standard: 'neutral',
  Economy: 'warning',
};

export const StickyColumnsDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Orders Table Demo</h1>
        <p className="text-neutral-600 mb-6">
          Demonstrates sticky columns with customer information pinned to the left and items count
          pinned to the right.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={[
            {
              key: 'customer',
              header: 'Customer',
              sticky: 'left',
              width: '280px',
              render: (item) => (
                <div className="flex items-center gap-3">
                  <Avatar src={item.customer.avatar} alt={item.customer.name} size="md" />
                  <div className="min-w-0">
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
                <span className="font-mono text-sm text-neutral-600">{item.id}</span>
              ),
            },
            {
              key: 'orderDate',
              header: 'Order Date',
              width: '150px',
              sortable: true,
              render: (item) => <span className="text-neutral-700">{item.orderDate}</span>,
            },
            {
              key: 'amount',
              header: 'Amount',
              width: '130px',
              sortable: true,
              render: (item) => (
                <span className="font-semibold text-neutral-900">${item.amount.toFixed(2)}</span>
              ),
            },
            {
              key: 'paymentMethod',
              header: 'Payment Method',
              width: '160px',
              render: (item) => (
                <Badge variant={paymentMethodColors[item.paymentMethod]}>
                  {item.paymentMethod}
                </Badge>
              ),
            },
            {
              key: 'shipping',
              header: 'Shipping',
              width: '130px',
              render: (item) => (
                <Badge variant={shippingColors[item.shipping]}>{item.shipping}</Badge>
              ),
            },
            {
              key: 'trackingNumber',
              header: 'Tracking Number',
              width: '180px',
              render: (item) => (
                <span className="font-mono text-xs text-neutral-600">{item.trackingNumber}</span>
              ),
            },
            {
              key: 'items',
              header: 'Items',
              sticky: 'right',
              width: '100px',
              sortable: true,
              render: (item) => (
                <span className="font-semibold text-primary-600">{item.items}</span>
              ),
            },
          ]}
          data={customersData}
          getRowKey={(item) => item.id}
          bordered={true}
          hoverable={true}
          striped={false}
        />
      </div>
    </div>
  );
};

export const ExpandableTableDemo = () => {
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Expandable Table Demo</h1>
        <p className="text-neutral-600 mb-6">
          Table with expandable rows to show additional order details.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={[
            {
              key: 'customer',
              header: 'Customer',
              sticky: 'left',
              width: '280px',
              render: (item) => (
                <div className="flex items-center gap-3">
                  <Avatar src={item.customer.avatar} alt={item.customer.name} size="md" />
                  <div className="min-w-0">
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
                <span className="font-mono text-sm text-neutral-600">{item.id}</span>
              ),
            },
            {
              key: 'orderDate',
              header: 'Order Date',
              width: '150px',
              sortable: true,
            },
            {
              key: 'amount',
              header: 'Amount',
              width: '130px',
              sortable: true,
              render: (item) => (
                <span className="font-semibold text-neutral-900">${item.amount.toFixed(2)}</span>
              ),
            },
            {
              key: 'paymentMethod',
              header: 'Payment Method',
              width: '160px',
              render: (item) => (
                <Badge variant={paymentMethodColors[item.paymentMethod]}>
                  {item.paymentMethod}
                </Badge>
              ),
            },
            {
              key: 'items',
              header: 'Items',
              sticky: 'right',
              width: '100px',
              sortable: true,
              render: (item) => (
                <span className="font-semibold text-primary-600">{item.items}</span>
              ),
            },
          ]}
          data={customersData}
          getRowKey={(item) => item.id}
          bordered={true}
          hoverable={true}
          expandable={true}
          renderExpandedContent={(item) => (
            <div className="p-6 bg-neutral-50/50">
              <h4 className="font-semibold text-neutral-900 mb-4">Order Details</h4>
              <div className="grid grid-cols-4 gap-6">
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Order ID</div>
                  <div className="text-neutral-900 font-medium">{item.id}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Customer Email</div>
                  <div className="text-neutral-900">{item.customer.email}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Total Items</div>
                  <div className="text-neutral-900">{item.items} items</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Order Amount</div>
                  <div className="text-neutral-900 font-semibold">${item.amount.toFixed(2)}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Shipping Method</div>
                  <div className="text-neutral-900">{item.shipping}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Tracking Number</div>
                  <div className="text-neutral-900 font-mono text-sm">{item.trackingNumber}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Payment Method</div>
                  <div className="text-neutral-900">{item.paymentMethod}</div>
                </div>
                <div>
                  <div className="text-sm text-neutral-500 mb-1">Order Date</div>
                  <div className="text-neutral-900">{item.orderDate}</div>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export const PaginatedTableDemo = () => {
  // Generate more data for pagination demo
  const largeDataset = Array.from({ length: 30 }, (_, i) => {
    const customerNum = (i % 8) + 1;
    return {
      id: `ORD${String(i + 1).padStart(5, '0')}`,
      customer: {
        name: `Customer ${i + 1}`,
        email: `customer${i + 1}@example.com`,
        avatar: `https://i.pravatar.cc/150?img=${customerNum}`,
      },
      orderDate: `2024-04-${String((i % 28) + 1).padStart(2, '0')}`,
      amount: Math.random() * 800 + 100,
      paymentMethod: ['PayPal', 'Bank Transfer', 'Cash', 'Credit Card'][i % 4],
      shipping: ['Express', 'Standard', 'Economy'][i % 3],
      trackingNumber: `TRK${Math.floor(Math.random() * 100000000)}`,
      items: Math.floor(Math.random() * 20) + 1,
    };
  });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Paginated Table Demo</h1>
        <p className="text-neutral-600 mb-6">
          Large dataset with pagination, sticky columns, and sorting.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <Table
          columns={[
            {
              key: 'customer',
              header: 'Customer',
              sticky: 'left',
              width: '280px',
              render: (item) => (
                <div className="flex items-center gap-3">
                  <Avatar src={item.customer.avatar} alt={item.customer.name} size="md" />
                  <div className="min-w-0">
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
                <span className="font-mono text-sm text-neutral-600">{item.id}</span>
              ),
            },
            {
              key: 'orderDate',
              header: 'Order Date',
              width: '150px',
              sortable: true,
            },
            {
              key: 'amount',
              header: 'Amount',
              width: '130px',
              sortable: true,
              render: (item) => (
                <span className="font-semibold text-neutral-900">${item.amount.toFixed(2)}</span>
              ),
            },
            {
              key: 'paymentMethod',
              header: 'Payment Method',
              width: '160px',
              render: (item) => (
                <Badge variant={paymentMethodColors[item.paymentMethod]}>
                  {item.paymentMethod}
                </Badge>
              ),
            },
            {
              key: 'shipping',
              header: 'Shipping',
              width: '130px',
              render: (item) => (
                <Badge variant={shippingColors[item.shipping]}>{item.shipping}</Badge>
              ),
            },
            {
              key: 'trackingNumber',
              header: 'Tracking Number',
              width: '180px',
              render: (item) => (
                <span className="font-mono text-xs text-neutral-600">{item.trackingNumber}</span>
              ),
            },
            {
              key: 'items',
              header: 'Items',
              sticky: 'right',
              width: '100px',
              sortable: true,
              render: (item) => (
                <span className="font-semibold text-primary-600">{item.items}</span>
              ),
            },
          ]}
          data={largeDataset}
          getRowKey={(item) => item.id}
          bordered={true}
          hoverable={true}
          striped={true}
          pagination={true}
          defaultPageSize={10}
          pageSizeOptions={[5, 10, 20, 30]}
        />
      </div>
    </div>
  );
};

// Export all demos
export const TableDemos = {
  StickyColumnsDemo,
  ExpandableTableDemo,
  PaginatedTableDemo,
};

export default TableDemos;
