import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';
import { useState } from 'react';
import type { AlertProps } from './Alert';
import { LightningIcon, HeartIcon, BellIcon, CodeIcon } from '../Icon';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children: 'This is an informational alert message.',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully!',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your input before proceeding.',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    children: 'An error occurred while processing your request.',
  },
};

export const Premium: Story = {
  args: {
    variant: 'premium',
    title: 'Premium Feature',
    children: 'Upgrade to premium to unlock this exclusive feature!',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information">
        This is an informational message with default icon.
      </Alert>
      <Alert variant="success" title="Success">
        Your changes have been saved successfully!
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review your input before proceeding.
      </Alert>
      <Alert variant="danger" title="Error">
        An error occurred while processing your request.
      </Alert>
      <Alert variant="premium" title="Premium Feature">
        Upgrade to premium to unlock this exclusive feature!
      </Alert>
    </div>
  ),
};

export const CustomIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="info"
        title="New Feature"
        icon={<LightningIcon size="md" color="workflow-develop" />}
      >
        Check out our new feature that just shipped!
      </Alert>
      <Alert variant="success" title="Favorite Added" icon={<HeartIcon size="md" color="danger" />}>
        This item has been added to your favorites.
      </Alert>
      <Alert variant="warning" title="Notification" icon={<BellIcon size="md" color="warning" />}>
        You have 3 unread notifications.
      </Alert>
      <Alert
        variant="premium"
        title="Premium Access"
        icon={
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        }
      >
        You now have access to all premium features!
      </Alert>
      <Alert
        variant="info"
        title="Code Updated"
        icon={<CodeIcon size="md" color="workflow-develop" />}
      >
        Your repository has been updated with the latest changes.
      </Alert>
    </div>
  ),
};

export const WithoutIcon: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information" showIcon={false}>
        This alert has no icon.
      </Alert>
      <Alert variant="success" title="Success" showIcon={false}>
        This alert has no icon either.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <div className="space-y-4">
        {show && (
          <Alert variant="info" title="Dismissible Alert" onClose={() => setShow(false)}>
            You can close this alert by clicking the X button. It animates out smoothly!
          </Alert>
        )}
        {!show && (
          <button
            onClick={() => setShow(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors"
          >
            Show Alert Again
          </button>
        )}
      </div>
    );
  },
};

export const AutoDismiss: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <div className="space-y-4">
        {show && (
          <Alert
            variant="success"
            title="Auto-Dismissing Alert"
            onClose={() => setShow(false)}
            autoDismiss={5000}
          >
            This alert will automatically dismiss after 5 seconds.
          </Alert>
        )}
        {!show && (
          <button
            onClick={() => setShow(true)}
            className="px-4 py-2 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors"
          >
            Show Alert Again
          </button>
        )}
      </div>
    );
  },
};

export const AnimatedStack: Story = {
  render: () => {
    const [alerts, setAlerts] = useState<Array<{ id: number; variant: AlertProps['variant'] }>>([]);
    let idCounter = 0;

    const addAlert = (variant: AlertProps['variant']) => {
      setAlerts((prev) => [...prev, { id: idCounter++, variant }]);
    };

    const removeAlert = (id: number) => {
      setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => addAlert('info')}
            className="px-4 py-2 bg-primary-500 text-white rounded-md font-medium hover:bg-primary-600 transition-colors"
          >
            Add Info
          </button>
          <button
            onClick={() => addAlert('success')}
            className="px-4 py-2 bg-success text-white rounded-md font-medium hover:bg-success/90 transition-colors"
          >
            Add Success
          </button>
          <button
            onClick={() => addAlert('warning')}
            className="px-4 py-2 bg-warning text-neutral-900 rounded-md font-medium hover:bg-warning/90 transition-colors"
          >
            Add Warning
          </button>
          <button
            onClick={() => addAlert('danger')}
            className="px-4 py-2 bg-danger text-white rounded-md font-medium hover:bg-danger/90 transition-colors"
          >
            Add Danger
          </button>
          <button
            onClick={() => addAlert('premium')}
            className="px-4 py-2 bg-premium-600 text-white rounded-md font-medium hover:bg-premium-700 transition-colors"
          >
            Add Premium
          </button>
        </div>

        <div className="space-y-2">
          {alerts.map((alert) => (
            <Alert
              key={alert.id}
              variant={alert.variant}
              title={`${alert.variant?.toUpperCase()} Alert`}
              onClose={() => removeAlert(alert.id)}
            >
              This alert slides in smoothly with animation!
            </Alert>
          ))}
        </div>
      </div>
    );
  },
};

export const WithoutTitle: Story = {
  args: {
    variant: 'success',
    children: "This alert doesn't have a title.",
  },
};

export const WorkflowAlerts: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert
        variant="info"
        title="Development Update"
        icon={<CodeIcon size="md" color="workflow-develop" />}
      >
        Your code has been successfully pushed to the development branch.
      </Alert>
      <Alert
        variant="warning"
        title="Preview Deployment"
        icon={<LightningIcon size="md" color="workflow-preview" />}
      >
        Preview deployment is ready at preview-abc123.vercel.app
      </Alert>
      <Alert
        variant="success"
        title="Shipped to Production"
        icon={<LightningIcon size="md" color="workflow-ship" />}
      >
        Your changes have been deployed to production successfully!
      </Alert>
    </div>
  ),
};

export const CompactAlerts: Story = {
  render: () => (
    <div className="space-y-2">
      <Alert variant="info">Quick informational message without a title.</Alert>
      <Alert variant="success">Operation completed successfully.</Alert>
      <Alert variant="warning">Please verify your email address.</Alert>
      <Alert variant="danger">Authentication failed. Please try again.</Alert>
      <Alert variant="premium">Unlock premium features with our exclusive plan.</Alert>
    </div>
  ),
};
