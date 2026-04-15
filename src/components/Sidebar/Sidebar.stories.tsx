import type { Meta, StoryObj } from '@storybook/react';
import { Sidebar, SidebarItem } from './Sidebar';
import { useState } from 'react';
import React from 'react';
import { cn } from '../../utils/cn';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

// Icons for demo
const HomeIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
);

const ChartIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    />
  </svg>
);

const UsersIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const SettingsIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const InboxIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
    />
  </svg>
);

// Interactive example with state management
export const Default: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        active: activeItem === 'Dashboard',
        onClick: () => setActiveItem('Dashboard'),
      },
      {
        icon: <ChartIcon />,
        label: 'Analytics',
        badge: '12',
        active: activeItem === 'Analytics',
        onClick: () => setActiveItem('Analytics'),
      },
      {
        icon: <UsersIcon />,
        label: 'Users',
        active: activeItem === 'Users',
        onClick: () => setActiveItem('Users'),
      },
      {
        icon: <InboxIcon />,
        label: 'Messages',
        badge: '3',
        active: activeItem === 'Messages',
        onClick: () => setActiveItem('Messages'),
      },
    ];

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          items={navItems}
          header={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-semibold text-neutral-900">Lucent UI</span>
            </div>
          }
          footer={
            <div className="space-y-2">
              {/* Settings Button */}
              <button
                onClick={() => setActiveItem('Settings')}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  'outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  activeItem === 'Settings'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                )}
              >
                <span className="flex-shrink-0 w-5 h-5">
                  <SettingsIcon />
                </span>
                <span className="flex-1 text-left">Settings</span>
              </button>

              {/* Profile */}
              <div className="flex items-center gap-2 px-3 py-2">
                <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600 text-xs font-semibold">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">John Doe</p>
                  <p className="text-xs text-neutral-500 truncate">john@example.com</p>
                </div>
              </div>
            </div>
          }
        />
        <div className="ml-64 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {activeItem}
          </h1>
          <p className="text-neutral-600">
            Click on sidebar items to navigate. Currently viewing: <strong>{activeItem}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const Collapsed: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        active: activeItem === 'Dashboard',
        onClick: () => setActiveItem('Dashboard'),
      },
      {
        icon: <ChartIcon />,
        label: 'Analytics',
        badge: '12',
        active: activeItem === 'Analytics',
        onClick: () => setActiveItem('Analytics'),
      },
      {
        icon: <UsersIcon />,
        label: 'Users',
        active: activeItem === 'Users',
        onClick: () => setActiveItem('Users'),
      },
      {
        icon: <InboxIcon />,
        label: 'Messages',
        badge: '3',
        active: activeItem === 'Messages',
        onClick: () => setActiveItem('Messages'),
      },
    ];

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          collapsed={true}
          items={navItems}
          header={
            <div className="flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
            </div>
          }
          footer={
            <div className="space-y-2">
              {/* Settings Button */}
              <button
                onClick={() => setActiveItem('Settings')}
                className={cn(
                  'w-full flex items-center justify-center p-3 rounded-lg transition-colors',
                  'outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  activeItem === 'Settings'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'
                )}
                title="Settings"
              >
                <span className="w-5 h-5">
                  <SettingsIcon />
                </span>
              </button>

              {/* Profile */}
              <div className="flex items-center justify-center py-2">
                <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600 text-xs font-semibold">
                  JD
                </div>
              </div>
            </div>
          }
        />
        <div className="ml-16 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {activeItem}
          </h1>
          <p className="text-neutral-600">
            Collapsed sidebar. Hover over icons to see tooltips. Currently viewing: <strong>{activeItem}</strong>
          </p>
        </div>
      </div>
    );
  },
};

export const WithCollapsibleToggle: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        active: activeItem === 'Dashboard',
        onClick: () => {
          setActiveItem('Dashboard');
          console.log('Clicked: Dashboard');
        },
      },
      {
        icon: <ChartIcon />,
        label: 'Analytics',
        badge: '12',
        active: activeItem === 'Analytics',
        onClick: () => {
          setActiveItem('Analytics');
          console.log('Clicked: Analytics');
        },
      },
      {
        icon: <UsersIcon />,
        label: 'Users',
        active: activeItem === 'Users',
        onClick: () => {
          setActiveItem('Users');
          console.log('Clicked: Users');
        },
      },
      {
        icon: <InboxIcon />,
        label: 'Messages',
        badge: '3',
        active: activeItem === 'Messages',
        onClick: () => {
          setActiveItem('Messages');
          console.log('Clicked: Messages');
        },
      },
    ];

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          collapsed={collapsed}
          onCollapsedChange={(newCollapsed) => {
            setCollapsed(newCollapsed);
            console.log('Sidebar collapsed:', newCollapsed);
          }}
          items={navItems}
          header={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              {!collapsed && <span className="font-semibold text-neutral-900">Lucent UI</span>}
            </div>
          }
          footer={
            <div className="space-y-2">
              {/* Settings Button */}
              <button
                onClick={() => {
                  setActiveItem('Settings');
                  console.log('Clicked: Settings from footer');
                }}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  'outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                  activeItem === 'Settings'
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                  collapsed && 'justify-center px-0'
                )}
              >
                <span className="flex-shrink-0 w-5 h-5">
                  <SettingsIcon />
                </span>
                {!collapsed && <span className="flex-1 text-left">Settings</span>}
              </button>

              {/* Profile */}
              {!collapsed ? (
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600 text-xs font-semibold">
                    JD
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900 truncate">John Doe</p>
                    <p className="text-xs text-neutral-500 truncate">john@example.com</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center py-2">
                  <div className="w-8 h-8 bg-neutral-200 rounded-full flex items-center justify-center text-neutral-600 text-xs font-semibold">
                    JD
                  </div>
                </div>
              )}
            </div>
          }
        />
        <div className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'} p-8`}>
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            {activeItem}
          </h1>
          <p className="text-neutral-600 mb-4">
            Click the toggle button to collapse/expand the sidebar. Click on items to navigate.
          </p>
          <div className="bg-white p-4 rounded-lg shadow-border">
            <p className="text-sm text-neutral-600">
              <strong>Current state:</strong>
            </p>
            <ul className="mt-2 space-y-1 text-sm">
              <li>Active page: <strong className="text-blue-600">{activeItem}</strong></li>
              <li>Sidebar: <strong className="text-blue-600">{collapsed ? 'Collapsed' : 'Expanded'}</strong></li>
            </ul>
            <p className="mt-3 text-xs text-neutral-500">
              Open browser console to see click events
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const RightPosition: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        active: activeItem === 'Dashboard',
        onClick: () => setActiveItem('Dashboard'),
      },
      {
        icon: <ChartIcon />,
        label: 'Analytics',
        badge: '12',
        active: activeItem === 'Analytics',
        onClick: () => setActiveItem('Analytics'),
      },
      {
        icon: <UsersIcon />,
        label: 'Users',
        active: activeItem === 'Users',
        onClick: () => setActiveItem('Users'),
      },
      {
        icon: <InboxIcon />,
        label: 'Messages',
        badge: '3',
        active: activeItem === 'Messages',
        onClick: () => setActiveItem('Messages'),
      },
    ];

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          position="right"
          items={navItems}
          header={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-semibold text-neutral-900">Lucent UI</span>
            </div>
          }
        />
        <div className="mr-64 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">{activeItem}</h1>
          <p className="text-neutral-600">Sidebar positioned on the right. Currently viewing: <strong>{activeItem}</strong></p>
        </div>
      </div>
    );
  },
};

export const SmallWidth: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        active: activeItem === 'Dashboard',
        onClick: () => setActiveItem('Dashboard'),
      },
      {
        icon: <ChartIcon />,
        label: 'Analytics',
        badge: '12',
        active: activeItem === 'Analytics',
        onClick: () => setActiveItem('Analytics'),
      },
      {
        icon: <UsersIcon />,
        label: 'Users',
        active: activeItem === 'Users',
        onClick: () => setActiveItem('Users'),
      },
      {
        icon: <InboxIcon />,
        label: 'Messages',
        badge: '3',
        active: activeItem === 'Messages',
        onClick: () => setActiveItem('Messages'),
      },
    ];

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          width="sm"
          items={navItems}
          header={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-semibold text-neutral-900">Lucent UI</span>
            </div>
          }
        />
        <div className="ml-56 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">{activeItem}</h1>
          <p className="text-neutral-600">Sidebar with small width variant. Currently viewing: <strong>{activeItem}</strong></p>
        </div>
      </div>
    );
  },
};

export const LargeWidth: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        active: activeItem === 'Dashboard',
        onClick: () => setActiveItem('Dashboard'),
      },
      {
        icon: <ChartIcon />,
        label: 'Analytics',
        badge: '12',
        active: activeItem === 'Analytics',
        onClick: () => setActiveItem('Analytics'),
      },
      {
        icon: <UsersIcon />,
        label: 'Users',
        active: activeItem === 'Users',
        onClick: () => setActiveItem('Users'),
      },
      {
        icon: <InboxIcon />,
        label: 'Messages',
        badge: '3',
        active: activeItem === 'Messages',
        onClick: () => setActiveItem('Messages'),
      },
    ];

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          width="lg"
          items={navItems}
          header={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-semibold text-neutral-900">Lucent UI</span>
            </div>
          }
        />
        <div className="ml-80 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">{activeItem}</h1>
          <p className="text-neutral-600">Sidebar with large width variant. Currently viewing: <strong>{activeItem}</strong></p>
        </div>
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const navItems = [
      {
        icon: <HomeIcon />,
        label: 'Dashboard',
        active: activeItem === 'Dashboard',
        onClick: () => setActiveItem('Dashboard'),
      },
      {
        icon: <ChartIcon />,
        label: 'Analytics',
        badge: '12',
        disabled: true,
        onClick: () => setActiveItem('Analytics'),
      },
      {
        icon: <UsersIcon />,
        label: 'Users',
        active: activeItem === 'Users',
        onClick: () => setActiveItem('Users'),
      },
      {
        icon: <InboxIcon />,
        label: 'Messages',
        badge: '3',
        disabled: true,
        onClick: () => setActiveItem('Messages'),
      },
    ];

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          items={navItems}
          header={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-semibold text-neutral-900">Lucent UI</span>
            </div>
          }
        />
        <div className="ml-64 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">{activeItem}</h1>
          <p className="text-neutral-600 mb-4">
            Some items are disabled and cannot be clicked. Currently viewing: <strong>{activeItem}</strong>
          </p>
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Analytics and Messages items are disabled and cannot be interacted with.
            </p>
          </div>
        </div>
      </div>
    );
  },
};

export const CustomContent: Story = {
  render: () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    return (
      <div className="h-screen bg-neutral-50">
        <Sidebar
          header={
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
                L
              </div>
              <span className="font-semibold text-neutral-900">Lucent UI</span>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Navigation
              </h3>
              <div className="space-y-1">
                <SidebarItem
                  icon={<HomeIcon />}
                  label="Dashboard"
                  active={activeItem === 'Dashboard'}
                  onClick={() => setActiveItem('Dashboard')}
                />
                <SidebarItem
                  icon={<ChartIcon />}
                  label="Analytics"
                  badge="12"
                  active={activeItem === 'Analytics'}
                  onClick={() => setActiveItem('Analytics')}
                />
              </div>
            </div>

            <div>
              <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Management
              </h3>
              <div className="space-y-1">
                <SidebarItem
                  icon={<UsersIcon />}
                  label="Users"
                  active={activeItem === 'Users'}
                  onClick={() => setActiveItem('Users')}
                />
                <SidebarItem
                  icon={<InboxIcon />}
                  label="Messages"
                  badge="3"
                  active={activeItem === 'Messages'}
                  onClick={() => setActiveItem('Messages')}
                />
              </div>
            </div>

            <div>
              <h3 className="px-3 text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
                Settings
              </h3>
              <div className="space-y-1">
                <SidebarItem
                  icon={<SettingsIcon />}
                  label="Settings"
                  active={activeItem === 'Settings'}
                  onClick={() => setActiveItem('Settings')}
                />
              </div>
            </div>
          </div>
        </Sidebar>
        <div className="ml-64 p-8">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">{activeItem}</h1>
          <p className="text-neutral-600">
            Sidebar with custom grouped navigation sections. Currently viewing: <strong>{activeItem}</strong>
          </p>
        </div>
      </div>
    );
  },
};
