import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from './Pagination';
import { useState } from 'react';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="space-y-4">
        <Pagination currentPage={page} totalPages={10} onPageChange={setPage} />
        <p className="text-sm text-neutral-600">Current page: {page}</p>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [page, setPage] = useState(5);
    return (
      <div className="space-y-6">
        <div>
          <p className="text-sm text-neutral-600 mb-2">Small</p>
          <Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="sm" />
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-2">Medium (default)</p>
          <Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="md" />
        </div>
        <div>
          <p className="text-sm text-neutral-600 mb-2">Large</p>
          <Pagination currentPage={page} totalPages={10} onPageChange={setPage} size="lg" />
        </div>
      </div>
    );
  },
};

export const WithFirstLast: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return <Pagination currentPage={page} totalPages={20} onPageChange={setPage} showFirstLast />;
  },
};

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div className="space-y-4">
        <Pagination currentPage={page} totalPages={100} onPageChange={setPage} showFirstLast />
        <p className="text-sm text-neutral-600">Page {page} of 100</p>
      </div>
    );
  },
};
