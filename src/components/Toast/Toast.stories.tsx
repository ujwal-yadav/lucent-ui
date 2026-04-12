import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';
import { useState } from 'react';
import { Button } from '../Button';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Info: Story = {
  args: {
    title: 'Information',
    description: 'This is an informational message.',
    variant: 'info',
  },
};

export const Success: Story = {
  args: {
    title: 'Success',
    description: 'Your changes have been saved successfully.',
    variant: 'success',
  },
};

export const Warning: Story = {
  args: {
    title: 'Warning',
    description: 'Please review your input before continuing.',
    variant: 'warning',
  },
};

export const Error: Story = {
  args: {
    title: 'Error',
    description: 'An error occurred while processing your request.',
    variant: 'error',
  },
};

export const Premium: Story = {
  args: {
    title: 'Premium Feature',
    description: 'You now have access to all premium features!',
    variant: 'premium',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Toast title="Information" description="This is an informational message." variant="info" />
      <Toast
        title="Success"
        description="Your changes have been saved successfully."
        variant="success"
      />
      <Toast
        title="Warning"
        description="Please review your input before continuing."
        variant="warning"
      />
      <Toast
        title="Error"
        description="An error occurred while processing your request."
        variant="error"
      />
      <Toast
        title="Premium Feature"
        description="You now have access to all premium features!"
        variant="premium"
      />
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: {
    description: 'This is a toast without a title.',
    variant: 'info',
  },
};

export const Dismissible: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <div>
        {!show && <Button onClick={() => setShow(true)}>Show Toast</Button>}
        {show && (
          <Toast
            title="Dismissible Toast"
            description="Click the X button to close this toast."
            variant="success"
            isVisible={show}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    );
  },
};

export const AutoDismiss: Story = {
  render: () => {
    const [show, setShow] = useState(true);
    return (
      <div>
        {!show && <Button onClick={() => setShow(true)}>Show Toast</Button>}
        {show && (
          <Toast
            title="Auto-dismiss"
            description="This toast will automatically close after 3 seconds."
            variant="info"
            duration={3000}
            isVisible={show}
            onClose={() => setShow(false)}
          />
        )}
      </div>
    );
  },
};

export const InteractiveToasts: Story = {
  render: () => {
    const [toasts, setToasts] = useState<
      Array<{ id: number; variant: 'info' | 'success' | 'warning' | 'error' | 'premium' }>
    >([]);
    let idCounter = 0;

    const addToast = (variant: 'info' | 'success' | 'warning' | 'error' | 'premium') => {
      const id = idCounter++;
      setToasts((prev) => [...prev, { id, variant }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3000);
    };

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          <Button onClick={() => addToast('info')} variant="primary">
            Show Info
          </Button>
          <Button onClick={() => addToast('success')} variant="success">
            Show Success
          </Button>
          <Button onClick={() => addToast('warning')} variant="warning">
            Show Warning
          </Button>
          <Button onClick={() => addToast('error')} variant="danger">
            Show Error
          </Button>
          <Button onClick={() => addToast('premium')} variant="premium">
            Show Premium
          </Button>
        </div>

        <div className="space-y-2 min-h-[200px]">
          {toasts.map((toast) => (
            <Toast
              key={toast.id}
              title={`${toast.variant.charAt(0).toUpperCase() + toast.variant.slice(1)} Toast`}
              description={`This is a ${toast.variant} notification.`}
              variant={toast.variant}
              isVisible
            />
          ))}
        </div>
      </div>
    );
  },
};
