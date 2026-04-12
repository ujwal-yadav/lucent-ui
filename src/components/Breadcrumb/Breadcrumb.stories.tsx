import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'Electronics', href: '/products/electronics' },
      { label: 'Laptops' },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        label: 'Home',
        href: '/',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        ),
      },
      {
        label: 'Documents',
        href: '/documents',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
            />
          </svg>
        ),
      },
      {
        label: 'Project Files',
        icon: (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        ),
      },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Blog', href: '/blog' },
      { label: 'Article', href: '/blog/article' },
      { label: 'Comments' },
    ],
    separator: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    ),
  },
};

export const Collapsed: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level-1' },
      { label: 'Level 2', href: '/level-1/level-2' },
      { label: 'Level 3', href: '/level-1/level-2/level-3' },
      { label: 'Level 4', href: '/level-1/level-2/level-3/level-4' },
      { label: 'Current Page' },
    ],
    maxItems: 3,
  },
};

export const Interactive: Story = {
  render: () => {
    const handleItemClick = (item: any, index: number) => {
      alert(`Clicked: ${item.label} (index: ${index})`);
    };

    return (
      <Breadcrumb
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Settings', href: '/dashboard/settings' },
          { label: 'Profile' },
        ]}
        onItemClick={handleItemClick}
      />
    );
  },
};

export const LongPath: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Organizations', href: '/organizations' },
      { label: 'Acme Corp', href: '/organizations/acme' },
      { label: 'Projects', href: '/organizations/acme/projects' },
      { label: 'Website Redesign', href: '/organizations/acme/projects/website' },
      { label: 'Design', href: '/organizations/acme/projects/website/design' },
      { label: 'Components', href: '/organizations/acme/projects/website/design/components' },
      { label: 'Buttons' },
    ],
    maxItems: 4,
  },
};

export const ShortPath: Story = {
  args: {
    items: [{ label: 'Home', href: '/' }, { label: 'About' }],
  },
};
