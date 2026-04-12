import type { Meta, StoryObj } from '@storybook/react';
import { Dialog } from './Dialog';
import { Button } from '../Button';
import { useState } from 'react';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
        <Dialog isOpen={isOpen} onClose={() => setIsOpen(false)} title="Dialog Title">
          <p className="text-neutral-600">This is a simple dialog component.</p>
        </Dialog>
      </div>
    );
  },
};

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Delete Item</Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <p className="text-neutral-600">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </Dialog>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="p-8 space-x-4">
        <Button
          onClick={() => {
            setSize('sm');
            setIsOpen(true);
          }}
        >
          Small
        </Button>
        <Button
          onClick={() => {
            setSize('md');
            setIsOpen(true);
          }}
        >
          Medium
        </Button>
        <Button
          onClick={() => {
            setSize('lg');
            setIsOpen(true);
          }}
        >
          Large
        </Button>
        <Dialog
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${size.toUpperCase()} Dialog`}
          size={size}
        >
          <p className="text-neutral-600">This is a {size} dialog.</p>
        </Dialog>
      </div>
    );
  },
};
