import type { Meta, StoryObj } from '@storybook/react';
import { Timeline, TimelineItem } from './Timeline';
import React from 'react';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Timeline>;

// Icons for demos
const CheckIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const ClockIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const UserIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const RocketIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const AlertIcon = () => (
  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

export const Default: Story = {
  args: {
    items: [
      {
        title: 'Project Created',
        description: 'Initial project setup and configuration',
        time: '2 hours ago',
      },
      {
        title: 'Design Phase',
        description: 'UI/UX design and prototyping completed',
        time: '1 hour ago',
      },
      {
        title: 'Development',
        description: 'Currently in active development',
        time: 'Just now',
        active: true,
      },
      {
        title: 'Testing',
        description: 'QA and testing phase',
        time: 'Upcoming',
      },
    ],
  },
};

export const WithIcons: Story = {
  args: {
    items: [
      {
        title: 'Order Placed',
        description: 'Your order has been received',
        time: 'March 15, 2024 10:30 AM',
        icon: <CheckIcon />,
        variant: 'success',
      },
      {
        title: 'Processing',
        description: 'Order is being prepared',
        time: 'March 15, 2024 11:00 AM',
        icon: <ClockIcon />,
        variant: 'primary',
        active: true,
      },
      {
        title: 'Shipped',
        description: 'Package has been shipped',
        time: 'Pending',
        icon: <RocketIcon />,
        variant: 'default',
      },
      {
        title: 'Delivered',
        description: 'Package delivered to your address',
        time: 'Pending',
        icon: <CheckIcon />,
        variant: 'default',
      },
    ],
  },
};

export const AlternatingPositions: Story = {
  args: {
    position: 'alternate',
    items: [
      {
        title: 'Account Created',
        description: 'User registered successfully',
        time: 'Jan 1, 2024',
        icon: <UserIcon />,
        variant: 'success',
      },
      {
        title: 'Email Verified',
        description: 'Email confirmation completed',
        time: 'Jan 2, 2024',
        icon: <CheckIcon />,
        variant: 'success',
      },
      {
        title: 'Profile Updated',
        description: 'Personal information added',
        time: 'Jan 5, 2024',
        icon: <UserIcon />,
        variant: 'primary',
      },
      {
        title: 'First Purchase',
        description: 'Completed first transaction',
        time: 'Jan 10, 2024',
        icon: <RocketIcon />,
        variant: 'success',
      },
    ],
  },
};

export const Horizontal: Story = {
  render: () => (
    <div className="w-full max-w-4xl">
      <Timeline
        orientation="horizontal"
        items={[
          {
            title: 'Planning',
            time: 'Week 1',
            icon: <ClockIcon />,
            variant: 'success',
          },
          {
            title: 'Development',
            time: 'Week 2-4',
            icon: <RocketIcon />,
            variant: 'primary',
            active: true,
          },
          {
            title: 'Testing',
            time: 'Week 5',
            icon: <CheckIcon />,
            variant: 'default',
          },
          {
            title: 'Launch',
            time: 'Week 6',
            icon: <RocketIcon />,
            variant: 'default',
          },
        ]}
      />
    </div>
  ),
};

export const DeploymentLog: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline
        items={[
          {
            title: 'Build Started',
            description: 'Running npm install and build scripts',
            time: '10:30:15 AM',
            icon: <ClockIcon />,
            variant: 'primary',
          },
          {
            title: 'Build Successful',
            description: 'All tests passed, artifacts created',
            time: '10:32:48 AM',
            icon: <CheckIcon />,
            variant: 'success',
          },
          {
            title: 'Deploying to Staging',
            description: 'Pushing to staging environment',
            time: '10:33:01 AM',
            icon: <RocketIcon />,
            variant: 'primary',
            active: true,
          },
          {
            title: 'Deploy to Production',
            description: 'Awaiting approval',
            time: 'Pending',
            icon: <ClockIcon />,
            variant: 'default',
          },
        ]}
      />
    </div>
  ),
};

export const ActivityFeed: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline
        size="sm"
        items={[
          {
            title: 'John Doe commented on your post',
            description: 'Great work on the new feature!',
            time: '5 minutes ago',
            icon: <UserIcon />,
            variant: 'primary',
          },
          {
            title: 'New follower',
            description: 'Sarah Smith started following you',
            time: '1 hour ago',
            icon: <UserIcon />,
            variant: 'success',
          },
          {
            title: 'Your post was liked',
            description: '15 people liked your recent post',
            time: '3 hours ago',
            icon: <CheckIcon />,
            variant: 'default',
          },
          {
            title: 'Milestone achieved',
            description: 'You reached 1,000 followers!',
            time: '1 day ago',
            icon: <RocketIcon />,
            variant: 'success',
          },
        ]}
      />
    </div>
  ),
};

export const WithErrors: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline
        items={[
          {
            title: 'Request Initiated',
            description: 'Payment processing started',
            time: '14:30:00',
            icon: <ClockIcon />,
            variant: 'primary',
          },
          {
            title: 'Verification Passed',
            description: 'User authentication successful',
            time: '14:30:05',
            icon: <CheckIcon />,
            variant: 'success',
          },
          {
            title: 'Payment Failed',
            description: 'Insufficient funds in account',
            time: '14:30:12',
            icon: <AlertIcon />,
            variant: 'error',
            active: true,
          },
          {
            title: 'Transaction Cancelled',
            description: 'Payment rolled back successfully',
            time: '14:30:15',
            icon: <AlertIcon />,
            variant: 'warning',
          },
        ]}
      />
    </div>
  ),
};

export const LargeSize: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline
        size="lg"
        items={[
          {
            title: 'Sprint Planning',
            description: 'Team discussed upcoming features and set priorities for the next two weeks',
            time: 'Monday, 9:00 AM',
            icon: <ClockIcon />,
            variant: 'primary',
          },
          {
            title: 'Development Complete',
            description: 'All user stories completed and code merged to main branch',
            time: 'Friday, 5:00 PM',
            icon: <CheckIcon />,
            variant: 'success',
          },
          {
            title: 'Sprint Review',
            description: 'Demonstrated completed features to stakeholders',
            time: 'Next Monday, 2:00 PM',
            icon: <RocketIcon />,
            variant: 'default',
          },
        ]}
      />
    </div>
  ),
};

export const SmallSize: Story = {
  render: () => (
    <div className="max-w-xl">
      <Timeline
        size="sm"
        items={[
          {
            title: 'Login',
            time: '08:00 AM',
            variant: 'success',
          },
          {
            title: 'File Upload',
            time: '09:30 AM',
            variant: 'success',
          },
          {
            title: 'API Call',
            time: '10:15 AM',
            variant: 'primary',
            active: true,
          },
          {
            title: 'Logout',
            time: '05:00 PM',
            variant: 'default',
          },
        ]}
      />
    </div>
  ),
};

export const CustomContent: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline>
        <TimelineItem
          title="Version 2.0 Released"
          time="March 1, 2024"
          icon={<RocketIcon />}
          variant="success"
        >
          <div className="mt-3 p-3 bg-neutral-50 rounded-md">
            <h5 className="font-semibold text-sm mb-2">What's New:</h5>
            <ul className="text-sm text-neutral-600 space-y-1 list-disc list-inside">
              <li>New dashboard redesign</li>
              <li>Performance improvements</li>
              <li>Bug fixes and stability</li>
            </ul>
          </div>
        </TimelineItem>

        <TimelineItem
          title="Version 1.5 Released"
          time="February 1, 2024"
          icon={<CheckIcon />}
          variant="success"
        >
          <div className="mt-3 p-3 bg-neutral-50 rounded-md">
            <p className="text-sm text-neutral-600">
              Minor updates and security patches
            </p>
          </div>
        </TimelineItem>

        <TimelineItem
          title="Version 1.0 Released"
          time="January 1, 2024"
          icon={<RocketIcon />}
          variant="primary"
          isLast
        >
          <div className="mt-3 p-3 bg-primary-50 rounded-md">
            <p className="text-sm text-primary-700 font-medium">
              🎉 Initial release - Thank you for your support!
            </p>
          </div>
        </TimelineItem>
      </Timeline>
    </div>
  ),
};

export const GitHistory: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Timeline
        size="sm"
        position="left"
        items={[
          {
            title: 'feat: add user authentication',
            description: 'Implemented JWT-based authentication system',
            time: 'main • 2 hours ago • John Doe',
            variant: 'success',
          },
          {
            title: 'fix: resolve navigation bug',
            description: 'Fixed issue with sidebar navigation',
            time: 'main • 4 hours ago • Sarah Smith',
            variant: 'error',
          },
          {
            title: 'docs: update README',
            description: 'Added installation instructions',
            time: 'main • 1 day ago • Mike Johnson',
            variant: 'default',
          },
          {
            title: 'refactor: improve code structure',
            description: 'Reorganized component directory',
            time: 'main • 2 days ago • John Doe',
            variant: 'warning',
          },
        ]}
      />
    </div>
  ),
};
