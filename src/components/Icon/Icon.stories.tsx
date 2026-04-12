import type { Meta, StoryObj } from '@storybook/react';
import * as Icons from './icons';

const meta: Meta = {
  title: 'Components/Icon',
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// All Icons Gallery
export const AllIcons: Story = {
  render: () => {
    const iconList = Object.entries(Icons).filter(([name]) => name.endsWith('Icon'));

    return (
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-neutral-900 tracking-heading mb-6">
          Icon Library
        </h2>
        <p className="text-gray-600 mb-8">
          {iconList.length} icons available. All icons follow the Vercel design system.
        </p>

        <div className="grid grid-cols-6 gap-6">
          {iconList.map(([name, IconComponent]) => (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-4 rounded-md hover:bg-gray-50 transition-colors"
            >
              <div className="w-10 h-10 flex items-center justify-center">
                <IconComponent size="lg" color="neutral" />
              </div>
              <span className="text-xs text-gray-600 text-center">{name.replace('Icon', '')}</span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6 p-8">
      <div className="flex flex-col items-center gap-2">
        <Icons.CheckIcon size="xs" color="neutral" />
        <span className="text-xs text-gray-600">xs (12px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icons.CheckIcon size="sm" color="neutral" />
        <span className="text-xs text-gray-600">sm (16px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icons.CheckIcon size="md" color="neutral" />
        <span className="text-xs text-gray-600">md (20px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icons.CheckIcon size="lg" color="neutral" />
        <span className="text-xs text-gray-600">lg (24px)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Icons.CheckIcon size="xl" color="neutral" />
        <span className="text-xs text-gray-600">xl (32px)</span>
      </div>
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: () => (
    <div className="p-8">
      <div className="grid grid-cols-3 gap-6">
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.StarIcon size="lg" color="neutral" />
          <span className="text-xs text-gray-600">Vercel Black</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.StarIcon size="lg" color="gray" />
          <span className="text-xs text-gray-600">Gray</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.StarIcon size="lg" color="primary" />
          <span className="text-xs text-gray-600">Primary</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.CheckIcon size="lg" color="success" />
          <span className="text-xs text-gray-600">Success</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.AlertIcon size="lg" color="danger" />
          <span className="text-xs text-gray-600">Danger</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.WarningIcon size="lg" color="warning" />
          <span className="text-xs text-gray-600">Warning</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.LightningIcon size="lg" color="workflow-ship" />
          <span className="text-xs text-gray-600">Ship</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.EyeIcon size="lg" color="workflow-preview" />
          <span className="text-xs text-gray-600">Preview</span>
        </div>
        <div className="flex flex-col items-center gap-2 p-4 bg-white rounded-md shadow-border">
          <Icons.CodeIcon size="lg" color="workflow-develop" />
          <span className="text-xs text-gray-600">Develop</span>
        </div>
      </div>
    </div>
  ),
};

// Navigation Icons
export const NavigationIcons: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Navigation & Arrows</h3>
      <div className="flex gap-4 items-center">
        <Icons.ChevronLeftIcon size="md" color="neutral" />
        <Icons.ChevronRightIcon size="md" color="neutral" />
        <Icons.ChevronUpIcon size="md" color="neutral" />
        <Icons.ChevronDownIcon size="md" color="neutral" />
        <Icons.MenuIcon size="md" color="neutral" />
        <Icons.HomeIcon size="md" color="neutral" />
        <Icons.ExternalLinkIcon size="md" color="neutral" />
      </div>
    </div>
  ),
};

// Action Icons
export const ActionIcons: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Actions</h3>
      <div className="flex gap-4 items-center flex-wrap">
        <Icons.CheckIcon size="md" color="success" />
        <Icons.CloseIcon size="md" color="danger" />
        <Icons.PlusIcon size="md" color="neutral" />
        <Icons.MinusIcon size="md" color="neutral" />
        <Icons.EditIcon size="md" color="neutral" />
        <Icons.TrashIcon size="md" color="danger" />
        <Icons.CopyIcon size="md" color="neutral" />
        <Icons.DownloadIcon size="md" color="neutral" />
        <Icons.UploadIcon size="md" color="neutral" />
        <Icons.SearchIcon size="md" color="gray" />
        <Icons.FilterIcon size="md" color="gray" />
      </div>
    </div>
  ),
};

// Status Icons
export const StatusIcons: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Status & Feedback</h3>
      <div className="flex gap-4 items-center">
        <Icons.CheckIcon size="md" color="success" />
        <Icons.InfoIcon size="md" color="primary" />
        <Icons.WarningIcon size="md" color="warning" />
        <Icons.AlertIcon size="md" color="danger" />
        <Icons.LightningIcon size="md" color="workflow-ship" />
      </div>
    </div>
  ),
};

// UI Icons
export const UIIcons: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">UI Elements</h3>
      <div className="flex gap-4 items-center flex-wrap">
        <Icons.UserIcon size="md" color="gray" />
        <Icons.SettingsIcon size="md" color="gray" />
        <Icons.BellIcon size="md" color="gray" />
        <Icons.MailIcon size="md" color="gray" />
        <Icons.HeartIcon size="md" color="danger" />
        <Icons.StarIcon size="md" color="warning" />
        <Icons.EyeIcon size="md" color="gray" />
        <Icons.EyeOffIcon size="md" color="gray" />
        <Icons.CalendarIcon size="md" color="gray" />
        <Icons.ClockIcon size="md" color="gray" />
      </div>
    </div>
  ),
};

// File Icons
export const FileIcons: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Files & Code</h3>
      <div className="flex gap-4 items-center">
        <Icons.DocumentIcon size="md" color="gray" />
        <Icons.FolderIcon size="md" color="gray" />
        <Icons.CodeIcon size="md" color="workflow-develop" />
      </div>
    </div>
  ),
};

// Usage Example
export const UsageExample: Story = {
  render: () => (
    <div className="p-8 space-y-6">
      <h3 className="text-lg font-semibold text-neutral-900">Usage Examples</h3>

      {/* Button with Icon */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Button with Icon</p>
        <button className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-sm font-medium hover:bg-gray-900/90 transition-colors">
          <Icons.PlusIcon size="sm" color="current" />
          Add Item
        </button>
      </div>

      {/* Input with Icon */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Input with Icon</p>
        <div className="relative w-64">
          <Icons.SearchIcon
            size="sm"
            color="gray"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-3 py-2 rounded-sm bg-white shadow-border text-sm text-neutral-900 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* Alert with Icon */}
      <div className="flex gap-3 p-4 rounded-md bg-blue-50 shadow-border">
        <Icons.InfoIcon size="md" color="workflow-develop" className="flex-shrink-0" />
        <div>
          <p className="font-medium text-neutral-900">Information</p>
          <p className="text-sm text-gray-600">This is an informational message with an icon.</p>
        </div>
      </div>

      {/* Badge with Icon */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Badge with Icon</p>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-pill bg-badge-blue-bg text-badge-blue-text text-sm font-medium">
          <Icons.CheckIcon size="xs" color="current" />
          Verified
        </span>
      </div>

      {/* Icon Button */}
      <div>
        <p className="text-sm text-gray-600 mb-2">Icon Button</p>
        <button className="p-2 rounded-sm hover:bg-gray-50 transition-colors">
          <Icons.SettingsIcon size="md" color="gray" />
        </button>
      </div>
    </div>
  ),
};

// Workflow Icons
export const WorkflowIcons: Story = {
  render: () => (
    <div className="p-8">
      <h3 className="text-lg font-semibold text-neutral-900 tracking-heading mb-2">
        Vercel Workflow Colors
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Special accent colors for workflow stages (use sparingly!)
      </p>

      <div className="flex gap-8 items-center">
        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
            <Icons.CodeIcon size="lg" color="workflow-develop" />
          </div>
          <span className="text-sm font-medium text-workflow-develop">Develop</span>
          <span className="text-xs text-gray-600">#0a72ef</span>
        </div>

        <Icons.ChevronRightIcon size="md" color="gray" />

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-pink-50 flex items-center justify-center">
            <Icons.EyeIcon size="lg" color="workflow-preview" />
          </div>
          <span className="text-sm font-medium text-workflow-preview">Preview</span>
          <span className="text-xs text-gray-600">#de1d8d</span>
        </div>

        <Icons.ChevronRightIcon size="md" color="gray" />

        <div className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
            <Icons.LightningIcon size="lg" color="workflow-ship" />
          </div>
          <span className="text-sm font-medium text-workflow-ship">Ship</span>
          <span className="text-xs text-gray-600">#ff5b4f</span>
        </div>
      </div>
    </div>
  ),
};
