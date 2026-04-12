import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';
import { useState } from 'react';
import { Button } from '../Button';
import { Input } from '../Input';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    animation: {
      control: 'select',
      options: ['fade', 'scale', 'slideUp', 'slideDown'],
      description: 'Animation style for modal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <p className="text-neutral-600">This is the modal content. You can put anything here!</p>
          <p className="text-neutral-600 mt-2">
            The modal has smooth animations and focus management.
          </p>
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const Animations: Story = {
  render: () => {
    const [animation, setAnimation] = useState<'fade' | 'scale' | 'slideUp' | 'slideDown'>('scale');
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2 flex-wrap">
          {(['fade', 'scale', 'slideUp', 'slideDown'] as const).map((anim) => (
            <Button
              key={anim}
              variant={animation === anim ? 'primary' : 'outline'}
              onClick={() => {
                setAnimation(anim);
                setIsOpen(true);
              }}
            >
              {anim.charAt(0).toUpperCase() + anim.slice(1)}
            </Button>
          ))}
        </div>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${animation.charAt(0).toUpperCase() + animation.slice(1)} Animation`}
          animation={animation}
        >
          <p className="text-neutral-600">
            This modal uses the <strong>{animation}</strong> animation.
          </p>
          <p className="text-neutral-600 mt-2">Try different animations to see the effects!</p>
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </Modal>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex gap-2 flex-wrap">
        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Button
            key={s}
            onClick={() => {
              setSize(s);
              setIsOpen(true);
            }}
          >
            {s.toUpperCase()}
          </Button>
        ))}
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${size.toUpperCase()} Modal`}
          size={size}
        >
          <p className="text-neutral-600">
            This is a <strong>{size}</strong> sized modal.
          </p>
          <p className="text-neutral-600 mt-2">Modal sizes: sm, md, lg, xl, and full.</p>
        </Modal>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      alert(`Submitted: ${formData.name}, ${formData.email}`);
      setIsOpen(false);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Create Account"
          animation="slideUp"
        >
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <div className="flex gap-2 pt-2">
              <Button type="submit">Submit</Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Modal>
      </>
    );
  },
};

export const ConfirmDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
      alert('Item deleted!');
      setIsOpen(false);
    };

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Deletion"
          size="sm"
          animation="scale"
          closeOnOverlayClick={false}
        >
          <p className="text-neutral-600">Are you sure you want to delete this item?</p>
          <p className="text-neutral-600 mt-2 text-sm">This action cannot be undone.</p>
          <div className="flex gap-2 mt-6">
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const NestedModals: Story = {
  render: () => {
    const [firstOpen, setFirstOpen] = useState(false);
    const [secondOpen, setSecondOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setFirstOpen(true)}>Open First Modal</Button>

        <Modal isOpen={firstOpen} onClose={() => setFirstOpen(false)} title="First Modal">
          <p className="text-neutral-600">This is the first modal.</p>
          <p className="text-neutral-600 mt-2">You can open another modal from here!</p>
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setSecondOpen(true)}>Open Second Modal</Button>
            <Button variant="outline" onClick={() => setFirstOpen(false)}>
              Close
            </Button>
          </div>
        </Modal>

        <Modal
          isOpen={secondOpen}
          onClose={() => setSecondOpen(false)}
          title="Second Modal"
          animation="slideDown"
        >
          <p className="text-neutral-600">This is a nested modal!</p>
          <p className="text-neutral-600 mt-2">Focus management still works correctly.</p>
          <div className="flex gap-2 mt-6">
            <Button onClick={() => setSecondOpen(false)}>Close</Button>
          </div>
        </Modal>
      </>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Long Content Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Terms and Conditions"
          size="lg"
        >
          <div className="prose max-h-96 overflow-y-auto">
            <p className="text-neutral-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-neutral-600 mt-4">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <p className="text-neutral-600 mt-4">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            <p className="text-neutral-600 mt-4">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p className="text-neutral-600 mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>
            <p className="text-neutral-600 mt-4">
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
          </div>
          <div className="flex gap-2 mt-6 pt-4 border-t border-neutral-200">
            <Button onClick={() => setIsOpen(false)}>Accept</Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Decline
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};
