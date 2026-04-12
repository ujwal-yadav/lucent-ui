import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanel } from './Tabs';
import { useState } from 'react';
import { Badge } from '../Badge/Badge';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Account</Tab>
        <Tab value="tab2">Password</Tab>
        <Tab value="tab3">Notifications</Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="tab1">
          <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
          <p className="text-neutral-600">
            Manage your account settings and set e-mail preferences.
          </p>
        </TabPanel>
        <TabPanel value="tab2">
          <h3 className="text-lg font-semibold mb-2">Password Settings</h3>
          <p className="text-neutral-600">Change your password and security settings here.</p>
        </TabPanel>
        <TabPanel value="tab3">
          <h3 className="text-lg font-semibold mb-2">Notification Settings</h3>
          <p className="text-neutral-600">Configure how you receive notifications.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="home">
      <TabList>
        <Tab
          value="home"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          }
        >
          Home
        </Tab>
        <Tab
          value="profile"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          }
        >
          Profile
        </Tab>
        <Tab
          value="settings"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          }
        >
          Settings
        </Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="home">
          <h3 className="text-lg font-semibold mb-2">Home</h3>
          <p className="text-neutral-600">Welcome to your dashboard.</p>
        </TabPanel>
        <TabPanel value="profile">
          <h3 className="text-lg font-semibold mb-2">Profile</h3>
          <p className="text-neutral-600">View and edit your profile information.</p>
        </TabPanel>
        <TabPanel value="settings">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-neutral-600">Manage your application settings.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="general" orientation="vertical">
      <TabList className="min-w-[200px]">
        <Tab value="general">General</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="privacy">Privacy</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <div className="flex-1 p-4 border border-neutral-200 rounded-lg">
        <TabPanel value="general">
          <h3 className="text-lg font-semibold mb-2">General Settings</h3>
          <p className="text-neutral-600">Configure general application settings.</p>
        </TabPanel>
        <TabPanel value="security">
          <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
          <p className="text-neutral-600">Manage your security preferences.</p>
        </TabPanel>
        <TabPanel value="privacy">
          <h3 className="text-lg font-semibold mb-2">Privacy Settings</h3>
          <p className="text-neutral-600">Control your privacy settings.</p>
        </TabPanel>
        <TabPanel value="billing">
          <h3 className="text-lg font-semibold mb-2">Billing Settings</h3>
          <p className="text-neutral-600">View and manage billing information.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Active Tab</Tab>
        <Tab value="tab2" disabled>
          Disabled Tab
        </Tab>
        <Tab value="tab3">Another Active Tab</Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="tab1">
          <p className="text-neutral-600">This tab is active and accessible.</p>
        </TabPanel>
        <TabPanel value="tab2">
          <p className="text-neutral-600">This content is not accessible.</p>
        </TabPanel>
        <TabPanel value="tab3">
          <p className="text-neutral-600">Another active tab content.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div>
        <div className="mb-4 p-4 bg-neutral-100 rounded">
          <p className="text-sm text-neutral-600">
            Current active tab: <strong>{activeTab}</strong>
          </p>
          <button
            onClick={() => setActiveTab('tab2')}
            className="mt-2 px-3 py-1 text-sm bg-primary-500 text-white rounded hover:bg-primary-600"
          >
            Switch to Tab 2
          </button>
        </div>
        <Tabs value={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
            <Tab value="tab3">Tab 3</Tab>
          </TabList>
          <div className="mt-4">
            <TabPanel value="tab1">
              <p className="text-neutral-600">Content for Tab 1</p>
            </TabPanel>
            <TabPanel value="tab2">
              <p className="text-neutral-600">Content for Tab 2</p>
            </TabPanel>
            <TabPanel value="tab3">
              <p className="text-neutral-600">Content for Tab 3</p>
            </TabPanel>
          </div>
        </Tabs>
      </div>
    );
  },
};

export const KeepMounted: Story = {
  render: () => (
    <Tabs defaultValue="tab1">
      <TabList>
        <Tab value="tab1">Tab 1</Tab>
        <Tab value="tab2">Tab 2</Tab>
        <Tab value="tab3">Tab 3</Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="tab1" keepMounted>
          <input
            type="text"
            placeholder="This input keeps its value when switching tabs"
            className="border border-neutral-300 rounded px-3 py-2"
          />
        </TabPanel>
        <TabPanel value="tab2" keepMounted>
          <input
            type="text"
            placeholder="This input also persists"
            className="border border-neutral-300 rounded px-3 py-2"
          />
        </TabPanel>
        <TabPanel value="tab3" keepMounted>
          <input
            type="text"
            placeholder="And this one too"
            className="border border-neutral-300 rounded px-3 py-2"
          />
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const PillsVariant: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList variant="pills">
        <Tab value="overview">Overview</Tab>
        <Tab value="analytics">Analytics</Tab>
        <Tab value="reports">Reports</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="overview">
          <h3 className="text-lg font-semibold mb-2">Overview</h3>
          <p className="text-neutral-600">
            Get a quick overview of your dashboard metrics and key performance indicators.
          </p>
        </TabPanel>
        <TabPanel value="analytics">
          <h3 className="text-lg font-semibold mb-2">Analytics</h3>
          <p className="text-neutral-600">
            Dive deep into your analytics data and discover insights.
          </p>
        </TabPanel>
        <TabPanel value="reports">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <p className="text-neutral-600">View and generate detailed reports for your business.</p>
        </TabPanel>
        <TabPanel value="settings">
          <h3 className="text-lg font-semibold mb-2">Settings</h3>
          <p className="text-neutral-600">Configure your dashboard and preferences.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const EnclosedVariant: Story = {
  render: () => (
    <Tabs defaultValue="code">
      <TabList variant="enclosed">
        <Tab value="code">Code</Tab>
        <Tab value="preview">Preview</Tab>
        <Tab value="issues">Issues</Tab>
        <Tab value="pull-requests">Pull Requests</Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="code">
          <h3 className="text-lg font-semibold mb-2">Code Repository</h3>
          <p className="text-neutral-600">Browse your source code and repository files.</p>
        </TabPanel>
        <TabPanel value="preview">
          <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
          <p className="text-neutral-600">See a live preview of your application.</p>
        </TabPanel>
        <TabPanel value="issues">
          <h3 className="text-lg font-semibold mb-2">Issues Tracker</h3>
          <p className="text-neutral-600">Track and manage project issues and bugs.</p>
        </TabPanel>
        <TabPanel value="pull-requests">
          <h3 className="text-lg font-semibold mb-2">Pull Requests</h3>
          <p className="text-neutral-600">Review and merge pull requests.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="all">
      <TabList>
        <Tab value="all">
          <div className="flex items-center gap-2">
            All
            <Badge variant="neutral" size="sm">
              24
            </Badge>
          </div>
        </Tab>
        <Tab value="active">
          <div className="flex items-center gap-2">
            Active
            <Badge variant="success" size="sm">
              12
            </Badge>
          </div>
        </Tab>
        <Tab value="pending">
          <div className="flex items-center gap-2">
            Pending
            <Badge variant="warning" size="sm">
              8
            </Badge>
          </div>
        </Tab>
        <Tab value="closed">
          <div className="flex items-center gap-2">
            Closed
            <Badge variant="neutral" size="sm">
              4
            </Badge>
          </div>
        </Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="all">
          <h3 className="text-lg font-semibold mb-2">All Items (24)</h3>
          <p className="text-neutral-600">Showing all 24 items across all statuses.</p>
        </TabPanel>
        <TabPanel value="active">
          <h3 className="text-lg font-semibold mb-2">Active Items (12)</h3>
          <p className="text-neutral-600">Currently active items that need attention.</p>
        </TabPanel>
        <TabPanel value="pending">
          <h3 className="text-lg font-semibold mb-2">Pending Items (8)</h3>
          <p className="text-neutral-600">Items waiting for approval or action.</p>
        </TabPanel>
        <TabPanel value="closed">
          <h3 className="text-lg font-semibold mb-2">Closed Items (4)</h3>
          <p className="text-neutral-600">Completed and closed items.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const PillsWithIcons: Story = {
  render: () => (
    <Tabs defaultValue="dashboard">
      <TabList variant="pills">
        <Tab
          value="dashboard"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1v-7z"
              />
            </svg>
          }
        >
          Dashboard
        </Tab>
        <Tab
          value="projects"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
              />
            </svg>
          }
        >
          Projects
        </Tab>
        <Tab
          value="team"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          }
        >
          Team
        </Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="dashboard">
          <h3 className="text-lg font-semibold mb-2">Dashboard Overview</h3>
          <p className="text-neutral-600">
            Your personalized dashboard with key metrics and insights.
          </p>
        </TabPanel>
        <TabPanel value="projects">
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <p className="text-neutral-600">Manage and view all your active projects.</p>
        </TabPanel>
        <TabPanel value="team">
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          <p className="text-neutral-600">Collaborate with your team members.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <Tabs defaultValue="inbox">
      <TabList className="w-full">
        <Tab value="inbox" className="flex-1 justify-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            Inbox
            <Badge variant="primary" size="sm">
              3
            </Badge>
          </div>
        </Tab>
        <Tab value="sent" className="flex-1 justify-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
            Sent
          </div>
        </Tab>
        <Tab value="drafts" className="flex-1 justify-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Drafts
            <Badge variant="neutral" size="sm">
              2
            </Badge>
          </div>
        </Tab>
        <Tab value="archive" className="flex-1 justify-center">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
            Archive
          </div>
        </Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="inbox">
          <h3 className="text-lg font-semibold mb-2">Inbox (3 new messages)</h3>
          <p className="text-neutral-600">You have 3 unread messages in your inbox.</p>
        </TabPanel>
        <TabPanel value="sent">
          <h3 className="text-lg font-semibold mb-2">Sent Messages</h3>
          <p className="text-neutral-600">View all your sent messages.</p>
        </TabPanel>
        <TabPanel value="drafts">
          <h3 className="text-lg font-semibold mb-2">Draft Messages (2)</h3>
          <p className="text-neutral-600">Continue editing your draft messages.</p>
        </TabPanel>
        <TabPanel value="archive">
          <h3 className="text-lg font-semibold mb-2">Archived Messages</h3>
          <p className="text-neutral-600">Browse your archived messages.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const ScrollableTabs: Story = {
  render: () => (
    <Tabs defaultValue="jan">
      <div className="overflow-x-auto">
        <TabList>
          <Tab value="jan">January 2024</Tab>
          <Tab value="feb">February 2024</Tab>
          <Tab value="mar">March 2024</Tab>
          <Tab value="apr">April 2024</Tab>
          <Tab value="may">May 2024</Tab>
          <Tab value="jun">June 2024</Tab>
          <Tab value="jul">July 2024</Tab>
          <Tab value="aug">August 2024</Tab>
          <Tab value="sep">September 2024</Tab>
          <Tab value="oct">October 2024</Tab>
          <Tab value="nov">November 2024</Tab>
          <Tab value="dec">December 2024</Tab>
        </TabList>
      </div>
      <div className="mt-4">
        <TabPanel value="jan">
          <h3 className="text-lg font-semibold mb-2">January 2024</h3>
          <p className="text-neutral-600">Monthly report for January 2024.</p>
        </TabPanel>
        <TabPanel value="feb">
          <h3 className="text-lg font-semibold mb-2">February 2024</h3>
          <p className="text-neutral-600">Monthly report for February 2024.</p>
        </TabPanel>
        <TabPanel value="mar">
          <h3 className="text-lg font-semibold mb-2">March 2024</h3>
          <p className="text-neutral-600">Monthly report for March 2024.</p>
        </TabPanel>
        <TabPanel value="apr">
          <h3 className="text-lg font-semibold mb-2">April 2024</h3>
          <p className="text-neutral-600">Monthly report for April 2024.</p>
        </TabPanel>
        <TabPanel value="may">
          <h3 className="text-lg font-semibold mb-2">May 2024</h3>
          <p className="text-neutral-600">Monthly report for May 2024.</p>
        </TabPanel>
        <TabPanel value="jun">
          <h3 className="text-lg font-semibold mb-2">June 2024</h3>
          <p className="text-neutral-600">Monthly report for June 2024.</p>
        </TabPanel>
        <TabPanel value="jul">
          <h3 className="text-lg font-semibold mb-2">July 2024</h3>
          <p className="text-neutral-600">Monthly report for July 2024.</p>
        </TabPanel>
        <TabPanel value="aug">
          <h3 className="text-lg font-semibold mb-2">August 2024</h3>
          <p className="text-neutral-600">Monthly report for August 2024.</p>
        </TabPanel>
        <TabPanel value="sep">
          <h3 className="text-lg font-semibold mb-2">September 2024</h3>
          <p className="text-neutral-600">Monthly report for September 2024.</p>
        </TabPanel>
        <TabPanel value="oct">
          <h3 className="text-lg font-semibold mb-2">October 2024</h3>
          <p className="text-neutral-600">Monthly report for October 2024.</p>
        </TabPanel>
        <TabPanel value="nov">
          <h3 className="text-lg font-semibold mb-2">November 2024</h3>
          <p className="text-neutral-600">Monthly report for November 2024.</p>
        </TabPanel>
        <TabPanel value="dec">
          <h3 className="text-lg font-semibold mb-2">December 2024</h3>
          <p className="text-neutral-600">Monthly report for December 2024.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const SegmentedVariant: Story = {
  render: () => (
    <Tabs defaultValue="list">
      <TabList variant="segmented">
        <Tab
          value="list"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 10h16M4 14h16M4 18h16"
              />
            </svg>
          }
        >
          List View
        </Tab>
        <Tab
          value="grid"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 15a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"
              />
            </svg>
          }
        >
          Grid View
        </Tab>
        <Tab
          value="calendar"
          icon={
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          }
        >
          Calendar
        </Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="list">
          <h3 className="text-lg font-semibold mb-2">List View</h3>
          <p className="text-neutral-600">
            View items in a vertical list format with detailed information.
          </p>
        </TabPanel>
        <TabPanel value="grid">
          <h3 className="text-lg font-semibold mb-2">Grid View</h3>
          <p className="text-neutral-600">Browse items in a grid layout for visual overview.</p>
        </TabPanel>
        <TabPanel value="calendar">
          <h3 className="text-lg font-semibold mb-2">Calendar View</h3>
          <p className="text-neutral-600">See your items organized by date in calendar format.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const SolidVariant: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabList variant="solid">
        <Tab value="active">
          <div className="flex items-center gap-2">
            Active Projects
            <Badge variant="success" size="sm">
              5
            </Badge>
          </div>
        </Tab>
        <Tab value="pending">
          <div className="flex items-center gap-2">
            Pending Review
            <Badge variant="warning" size="sm">
              3
            </Badge>
          </div>
        </Tab>
        <Tab value="completed">Completed</Tab>
        <Tab value="archived">Archived</Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="active">
          <h3 className="text-lg font-semibold mb-2">Active Projects (5)</h3>
          <p className="text-neutral-600">
            Projects currently in progress and actively being worked on.
          </p>
        </TabPanel>
        <TabPanel value="pending">
          <h3 className="text-lg font-semibold mb-2">Pending Review (3)</h3>
          <p className="text-neutral-600">
            Projects awaiting review or approval before proceeding.
          </p>
        </TabPanel>
        <TabPanel value="completed">
          <h3 className="text-lg font-semibold mb-2">Completed Projects</h3>
          <p className="text-neutral-600">Successfully completed projects and deliverables.</p>
        </TabPanel>
        <TabPanel value="archived">
          <h3 className="text-lg font-semibold mb-2">Archived Projects</h3>
          <p className="text-neutral-600">Historical projects that have been archived.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const SoftVariant: Story = {
  render: () => (
    <Tabs defaultValue="personal">
      <TabList variant="soft">
        <Tab value="personal">Personal Info</Tab>
        <Tab value="account">Account Settings</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="notifications">Notifications</Tab>
        <Tab value="integrations">Integrations</Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="personal">
          <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
          <p className="text-neutral-600">Manage your personal details and profile information.</p>
        </TabPanel>
        <TabPanel value="account">
          <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
          <p className="text-neutral-600">Configure your account preferences and settings.</p>
        </TabPanel>
        <TabPanel value="security">
          <h3 className="text-lg font-semibold mb-2">Security Settings</h3>
          <p className="text-neutral-600">Update your password and two-factor authentication.</p>
        </TabPanel>
        <TabPanel value="notifications">
          <h3 className="text-lg font-semibold mb-2">Notification Preferences</h3>
          <p className="text-neutral-600">Choose how and when you want to receive notifications.</p>
        </TabPanel>
        <TabPanel value="integrations">
          <h3 className="text-lg font-semibold mb-2">Third-party Integrations</h3>
          <p className="text-neutral-600">Connect and manage external services and apps.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const VerticalSegmented: Story = {
  render: () => (
    <Tabs defaultValue="overview" orientation="vertical">
      <TabList variant="segmented" className="min-w-[200px]">
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="members">Team Members</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <div className="flex-1 p-6 border border-neutral-200 rounded-lg bg-white">
        <TabPanel value="overview">
          <h3 className="text-lg font-semibold mb-2">Project Overview</h3>
          <p className="text-neutral-600">
            Get a high-level view of your project status and key metrics.
          </p>
        </TabPanel>
        <TabPanel value="activity">
          <h3 className="text-lg font-semibold mb-2">Activity Feed</h3>
          <p className="text-neutral-600">Recent activity and updates from your team.</p>
        </TabPanel>
        <TabPanel value="members">
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          <p className="text-neutral-600">Manage your team members and their permissions.</p>
        </TabPanel>
        <TabPanel value="settings">
          <h3 className="text-lg font-semibold mb-2">Project Settings</h3>
          <p className="text-neutral-600">Configure project-specific settings and preferences.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};

export const CompactTabs: Story = {
  render: () => (
    <Tabs defaultValue="code">
      <TabList variant="pills" className="bg-transparent p-0 gap-2">
        <Tab value="code" className="px-3 py-1.5 text-xs">
          Code
        </Tab>
        <Tab value="issues" className="px-3 py-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            Issues
            <Badge variant="neutral" size="sm">
              12
            </Badge>
          </div>
        </Tab>
        <Tab value="prs" className="px-3 py-1.5 text-xs">
          <div className="flex items-center gap-1.5">
            Pull Requests
            <Badge variant="primary" size="sm">
              3
            </Badge>
          </div>
        </Tab>
        <Tab value="actions" className="px-3 py-1.5 text-xs">
          Actions
        </Tab>
      </TabList>
      <div className="mt-4">
        <TabPanel value="code">
          <h3 className="text-lg font-semibold mb-2">Source Code</h3>
          <p className="text-neutral-600">Browse the repository files and folders.</p>
        </TabPanel>
        <TabPanel value="issues">
          <h3 className="text-lg font-semibold mb-2">Issues (12)</h3>
          <p className="text-neutral-600">Track bugs, enhancements, and tasks.</p>
        </TabPanel>
        <TabPanel value="prs">
          <h3 className="text-lg font-semibold mb-2">Pull Requests (3)</h3>
          <p className="text-neutral-600">Review and merge code changes.</p>
        </TabPanel>
        <TabPanel value="actions">
          <h3 className="text-lg font-semibold mb-2">GitHub Actions</h3>
          <p className="text-neutral-600">View CI/CD workflows and their status.</p>
        </TabPanel>
      </div>
    </Tabs>
  ),
};
