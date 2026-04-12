import type { Meta, StoryObj } from '@storybook/react';
import { Drawer } from './Drawer';
import { useState } from 'react';
import { Button } from '../Button';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Drawer Title">
          <div className="space-y-4">
            <p className="text-neutral-600">
              This is the drawer content. You can put any content here.
            </p>
            <p className="text-neutral-600">
              The drawer will slide in from the right side by default.
            </p>
          </div>
        </Drawer>
      </div>
    );
  },
};

export const Positions: Story = {
  render: () => {
    const [position, setPosition] = useState<'left' | 'right' | 'top' | 'bottom'>('right');
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = (pos: 'left' | 'right' | 'top' | 'bottom') => {
      setPosition(pos);
      setIsOpen(true);
    };

    return (
      <div className="p-8 space-x-4">
        <Button onClick={() => openDrawer('left')}>Left</Button>
        <Button onClick={() => openDrawer('right')}>Right</Button>
        <Button onClick={() => openDrawer('top')}>Top</Button>
        <Button onClick={() => openDrawer('bottom')}>Bottom</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${position.charAt(0).toUpperCase()}${position.slice(1)} Drawer`}
          position={position}
        >
          <p className="text-neutral-600">This drawer slides in from the {position}.</p>
        </Drawer>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full'>('md');
    const [isOpen, setIsOpen] = useState(false);

    const openDrawer = (s: 'sm' | 'md' | 'lg' | 'xl' | 'full') => {
      setSize(s);
      setIsOpen(true);
    };

    return (
      <div className="p-8 space-x-4">
        <Button onClick={() => openDrawer('sm')}>Small</Button>
        <Button onClick={() => openDrawer('md')}>Medium</Button>
        <Button onClick={() => openDrawer('lg')}>Large</Button>
        <Button onClick={() => openDrawer('xl')}>Extra Large</Button>
        <Button onClick={() => openDrawer('full')}>Full</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${size.toUpperCase()} Drawer`}
          size={size}
        >
          <p className="text-neutral-600">This is a {size} drawer.</p>
        </Drawer>
      </div>
    );
  },
};

export const WithForm: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Edit Profile</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Edit Profile">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">Bio</label>
              <textarea
                rows={4}
                placeholder="Tell us about yourself"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div className="flex gap-3 pt-4">
              <Button type="submit" variant="primary">
                Save Changes
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </Drawer>
      </div>
    );
  },
};

export const Navigation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
      { label: 'Dashboard', icon: '📊' },
      { label: 'Projects', icon: '📁' },
      { label: 'Team', icon: '👥' },
      { label: 'Calendar', icon: '📅' },
      { label: 'Documents', icon: '📄' },
      { label: 'Reports', icon: '📈' },
      { label: 'Settings', icon: '⚙️' },
    ];

    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Menu</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="left" title="Navigation">
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.label}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-neutral-100 transition-colors flex items-center gap-3"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium text-neutral-700">{item.label}</span>
              </button>
            ))}
          </nav>
        </Drawer>
      </div>
    );
  },
};

export const LongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="p-8">
        <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Terms and Conditions">
          <div className="space-y-4 text-neutral-600">
            {Array.from({ length: 20 }).map((_, i) => (
              <p key={i}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris.
              </p>
            ))}
          </div>
        </Drawer>
      </div>
    );
  },
};
