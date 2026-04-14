import React, { useState } from 'react';
import { Modal } from '../components/Modal';
import { Dialog } from '../components/Dialog';
import { Drawer } from '../components/Drawer';
import { Tooltip } from '../components/Tooltip';
import { Popover } from '../components/Popover';
import { Menu } from '../components/Menu';
import { Select } from '../components/Select';
import { Toast, ToastContainer } from '../components/Toast';
import { Button } from '../components/Button';

/**
 * Portal Examples
 *
 * This file demonstrates how portals are used across Lucent UI components
 * to render content outside the DOM hierarchy.
 */

export const ModalExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Example Modal">
        <p>This modal is rendered using a portal at document.body level.</p>
        <p>It appears above all other content regardless of parent z-index.</p>
      </Modal>
    </div>
  );
};

export const DialogExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>
      <Dialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
        footer={
          <>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p>Dialog uses portals to ensure proper layering.</p>
      </Dialog>
    </div>
  );
};

export const DrawerExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} position="right" title="Settings">
        <div className="space-y-4">
          <p>Drawer content is rendered in a portal.</p>
          <p>This allows it to slide in from any edge.</p>
        </div>
      </Drawer>
    </div>
  );
};

export const SelectExample = () => {
  const [value, setValue] = useState('');

  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">With Portal (Default)</h4>
        <Select
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Select a framework"
          portal={true}
        />
        <p className="text-sm text-neutral-500 mt-1">
          Dropdown rendered in portal - won't be clipped by parent overflow
        </p>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Without Portal</h4>
        <Select
          options={options}
          value={value}
          onChange={setValue}
          placeholder="Select a framework"
          portal={false}
        />
        <p className="text-sm text-neutral-500 mt-1">
          Dropdown rendered inline - may be clipped by parent containers
        </p>
      </div>
    </div>
  );
};

export const TooltipExample = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">With Portal (Default)</h4>
        <Tooltip content="This tooltip uses a portal" portal={true}>
          <Button>Hover for tooltip</Button>
        </Tooltip>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Without Portal</h4>
        <Tooltip content="This tooltip is inline" portal={false}>
          <Button>Hover for tooltip</Button>
        </Tooltip>
      </div>
    </div>
  );
};

export const PopoverExample = () => {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">With Portal (Default)</h4>
        <Popover
          content={
            <div className="space-y-2">
              <h4 className="font-semibold">Popover Title</h4>
              <p>This popover uses a portal for positioning</p>
            </div>
          }
          portal={true}
        >
          <Button>Click for popover</Button>
        </Popover>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Without Portal</h4>
        <Popover
          content={
            <div className="space-y-2">
              <h4 className="font-semibold">Popover Title</h4>
              <p>This popover is inline</p>
            </div>
          }
          portal={false}
        >
          <Button>Click for popover</Button>
        </Popover>
      </div>
    </div>
  );
};

export const MenuExample = () => {
  const menuItems = [
    { label: 'Profile', onClick: () => alert('Profile clicked') },
    { label: 'Settings', onClick: () => alert('Settings clicked') },
    { label: 'Logout', onClick: () => alert('Logout clicked'), divider: true },
  ];

  return (
    <div className="space-y-4">
      <div>
        <h4 className="font-semibold mb-2">With Portal (Default)</h4>
        <Menu items={menuItems} trigger={<Button>Open Menu</Button>} portal={true} />
      </div>

      <div>
        <h4 className="font-semibold mb-2">Without Portal</h4>
        <Menu items={menuItems} trigger={<Button>Open Menu</Button>} portal={false} />
      </div>
    </div>
  );
};

export const ToastExample = () => {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <Button onClick={() => setShowToast(true)}>Show Toast</Button>

      {showToast && (
        <ToastContainer position="top-right">
          <Toast
            variant="success"
            title="Success"
            description="Toast notifications always use portals via ToastContainer"
            duration={3000}
            onClose={() => setShowToast(false)}
          />
        </ToastContainer>
      )}
    </div>
  );
};

/**
 * Overflow Container Example
 *
 * This demonstrates why portals are important for components
 * that need to escape parent container constraints.
 */
export const OverflowContainerExample = () => {
  const [value, setValue] = useState('');

  const options = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h4 className="font-semibold mb-2">Container with overflow: hidden</h4>
        <div
          className="border-2 border-dashed border-neutral-300 p-4"
          style={{ overflow: 'hidden', height: '150px' }}
        >
          <p className="mb-4 text-sm text-neutral-600">
            With portal=true, dropdown escapes this container
          </p>
          <Select
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Select with portal"
            portal={true}
          />
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Container with overflow: hidden</h4>
        <div
          className="border-2 border-dashed border-neutral-300 p-4"
          style={{ overflow: 'hidden', height: '150px' }}
        >
          <p className="mb-4 text-sm text-neutral-600">
            With portal=false, dropdown is clipped (not recommended)
          </p>
          <Select
            options={options}
            value={value}
            onChange={setValue}
            placeholder="Select without portal"
            portal={false}
          />
        </div>
      </div>
    </div>
  );
};

// Export all examples
export const PortalExamples = {
  ModalExample,
  DialogExample,
  DrawerExample,
  SelectExample,
  TooltipExample,
  PopoverExample,
  MenuExample,
  ToastExample,
  OverflowContainerExample,
};

export default PortalExamples;
