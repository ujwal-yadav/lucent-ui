import React, { useState } from 'react';
import { Table } from '../components/Table';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { FilterPill } from '../components/FilterPill';
import { Menu } from '../components/Menu';

/**
 * Orders Management Page
 *
 * A complete example page demonstrating the Table component in a real-world scenario
 * with filters, search, actions, and sticky columns.
 */

// Sample orders data
const ordersData = [
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
    status: 'delivered',
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
    status: 'shipped',
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
    status: 'pending',
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
    status: 'delivered',
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
    status: 'shipped',
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
    status: 'delivered',
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
    status: 'pending',
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
    status: 'cancelled',
  },
  {
    id: 'ORD00009',
    customer: {
      name: 'Customer 9',
      email: 'customer9@example.com',
      avatar: 'https://i.pravatar.cc/150?img=9',
    },
    orderDate: '2024-04-15',
    amount: 392.45,
    paymentMethod: 'Credit Card',
    shipping: 'Express',
    trackingNumber: 'TRK88765432',
    items: 8,
    status: 'shipped',
  },
  {
    id: 'ORD00010',
    customer: {
      name: 'Customer 10',
      email: 'customer10@example.com',
      avatar: 'https://i.pravatar.cc/150?img=10',
    },
    orderDate: '2024-04-22',
    amount: 156.99,
    paymentMethod: 'PayPal',
    shipping: 'Economy',
    trackingNumber: 'TRK99887766',
    items: 3,
    status: 'delivered',
  },
];

const statusColors = {
  pending: 'warning',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'danger',
} as const;

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

export const OrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [paymentFilter, setPaymentFilter] = useState('');
  const [shippingFilter, setShippingFilter] = useState('');

  // Filter data based on search and filters
  const filteredData = ordersData.filter((order) => {
    const matchesSearch =
      searchQuery === '' ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter.length === 0 || statusFilter.includes(order.status);
    const matchesPayment = paymentFilter === '' || order.paymentMethod === paymentFilter;
    const matchesShipping = shippingFilter === '' || order.shipping === shippingFilter;

    return matchesSearch && matchesStatus && matchesPayment && matchesShipping;
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter([]);
    setPaymentFilter('');
    setShippingFilter('');
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (statusFilter.length > 0 ? 1 : 0) +
    (paymentFilter ? 1 : 0) +
    (shippingFilter ? 1 : 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200">
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Orders</h1>
              <p className="text-sm text-neutral-600 mt-1">
                Manage and track all customer orders
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline">Export</Button>
              <Button>New Order</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-screen-2xl mx-auto px-6 py-6">
        <div className="bg-white rounded-lg border border-neutral-200 p-4 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search by customer name, email, or order ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <Select
              options={[
                { value: '', label: 'All Payment Methods' },
                { value: 'PayPal', label: 'PayPal' },
                { value: 'Credit Card', label: 'Credit Card' },
                { value: 'Bank Transfer', label: 'Bank Transfer' },
                { value: 'Cash', label: 'Cash' },
              ]}
              value={paymentFilter}
              onChange={setPaymentFilter}
              placeholder="Payment Method"
              className="w-48"
            />
            <Select
              options={[
                { value: '', label: 'All Shipping' },
                { value: 'Express', label: 'Express' },
                { value: 'Standard', label: 'Standard' },
                { value: 'Economy', label: 'Economy' },
              ]}
              value={shippingFilter}
              onChange={setShippingFilter}
              placeholder="Shipping"
              className="w-48"
            />
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600">Status:</span>
            <div className="flex gap-2">
              <FilterPill
                label="Pending"
                isActive={statusFilter.includes('pending')}
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev.includes('pending')
                      ? prev.filter((s) => s !== 'pending')
                      : [...prev, 'pending']
                  )
                }
              />
              <FilterPill
                label="Shipped"
                isActive={statusFilter.includes('shipped')}
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev.includes('shipped')
                      ? prev.filter((s) => s !== 'shipped')
                      : [...prev, 'shipped']
                  )
                }
              />
              <FilterPill
                label="Delivered"
                isActive={statusFilter.includes('delivered')}
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev.includes('delivered')
                      ? prev.filter((s) => s !== 'delivered')
                      : [...prev, 'delivered']
                  )
                }
              />
              <FilterPill
                label="Cancelled"
                isActive={statusFilter.includes('cancelled')}
                onClick={() =>
                  setStatusFilter((prev) =>
                    prev.includes('cancelled')
                      ? prev.filter((s) => s !== 'cancelled')
                      : [...prev, 'cancelled']
                  )
                }
              />
            </div>
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                Clear All ({activeFiltersCount})
              </Button>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600 mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-neutral-900">{filteredData.length}</div>
          </div>
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600 mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-neutral-900">
              ${filteredData.reduce((sum, order) => sum + order.amount, 0).toFixed(2)}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600 mb-1">Avg Order Value</div>
            <div className="text-2xl font-bold text-neutral-900">
              $
              {filteredData.length > 0
                ? (filteredData.reduce((sum, order) => sum + order.amount, 0) / filteredData.length).toFixed(2)
                : '0.00'}
            </div>
          </div>
          <div className="bg-white rounded-lg border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600 mb-1">Total Items</div>
            <div className="text-2xl font-bold text-neutral-900">
              {filteredData.reduce((sum, order) => sum + order.items, 0)}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm">
          <Table
            columns={[
              {
                key: 'customer',
                header: 'Customer',
                sticky: 'left',
                width: '300px',
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
                width: '140px',
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
                key: 'status',
                header: 'Status',
                width: '130px',
                sortable: true,
                render: (item) => (
                  <Badge variant={statusColors[item.status as keyof typeof statusColors]}>
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
                render: (item) => (
                  <span className="font-semibold text-primary-600">{item.items}</span>
                ),
              },
              {
                key: 'actions',
                header: '',
                sticky: 'right',
                width: '80px',
                render: (item) => (
                  <Menu
                    items={[
                      {
                        label: 'View Details',
                        onClick: () => alert(`View details for ${item.id}`),
                      },
                      {
                        label: 'Edit Order',
                        onClick: () => alert(`Edit ${item.id}`),
                      },
                      {
                        label: 'Download Invoice',
                        onClick: () => alert(`Download invoice for ${item.id}`),
                      },
                      {
                        label: 'Track Shipment',
                        onClick: () => alert(`Track shipment: ${item.trackingNumber}`),
                      },
                      { label: 'Refund', onClick: () => alert(`Refund ${item.id}`), divider: true },
                      {
                        label: 'Cancel Order',
                        onClick: () => alert(`Cancel ${item.id}`),
                        danger: true,
                      },
                    ]}
                    trigger={
                      <Button variant="ghost" size="sm">
                        ⋯
                      </Button>
                    }
                  />
                ),
              },
            ]}
            data={filteredData}
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
                    <div className="text-neutral-900 font-semibold">
                      ${item.amount.toFixed(2)}
                    </div>
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
                <div className="mt-6 flex gap-3">
                  <Button size="sm" variant="outline">
                    Download Invoice
                  </Button>
                  <Button size="sm" variant="outline">
                    Track Shipment
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact Customer
                  </Button>
                </div>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
