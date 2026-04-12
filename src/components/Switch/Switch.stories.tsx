import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';
import { useState } from 'react';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  args: { label: 'Enable notifications' },
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch size="sm" label="Small switch" />
      <Switch size="md" label="Medium switch" />
      <Switch size="lg" label="Large switch" />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="space-y-2">
        <Switch
          label="Controlled switch"
          checked={enabled}
          onChange={(e) => setEnabled(e.target.checked)}
        />
        <p className="text-sm text-gray-600">Status: {enabled ? 'On' : 'Off'}</p>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Off State</h3>
        <Switch label="Switch off (gray background)" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">On State</h3>
        <Switch label="Switch on (primary background)" defaultChecked />
      </div>
    </div>
  ),
};

export const FocusState: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-sm text-gray-600 mb-4">
        Tab to the switch to see the primary blue focus ring (#3535F3)
      </p>
      <Switch label="Enable dark mode" />
      <Switch label="Enable notifications" defaultChecked />
    </div>
  ),
};

export const SettingsPanel: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emailUpdates: false,
      darkMode: false,
      analytics: true,
    });

    const updateSetting = (key: keyof typeof settings, value: boolean) => {
      setSettings((prev) => ({ ...prev, [key]: value }));
    };

    return (
      <div className="space-y-4 max-w-sm p-6 bg-gray-50 rounded-md">
        <h3 className="text-sm font-semibold text-neutral-900 mb-4">User Preferences</h3>
        <Switch
          label="Push Notifications"
          checked={settings.notifications}
          onChange={(e) => updateSetting('notifications', e.target.checked)}
        />
        <Switch
          label="Email Updates"
          checked={settings.emailUpdates}
          onChange={(e) => updateSetting('emailUpdates', e.target.checked)}
        />
        <Switch
          label="Dark Mode"
          checked={settings.darkMode}
          onChange={(e) => updateSetting('darkMode', e.target.checked)}
        />
        <Switch
          label="Analytics"
          checked={settings.analytics}
          onChange={(e) => updateSetting('analytics', e.target.checked)}
        />
      </div>
    );
  },
};

export const DesignSystem: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-semibold text-gray-600 mb-3">Vercel Design System</h3>
        <div className="space-y-3">
          <Switch label="Off - Gray background (#808080)" />
          <Switch label="On - Primary background (#3535F3)" defaultChecked />
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h4 className="text-xs font-semibold text-gray-600 mb-3">Design Features:</h4>
        <ul className="text-xs text-gray-600 space-y-2">
          <li>✅ Gray background (#808080) when off</li>
          <li>✅ Primary blue (#3535F3) background when on</li>
          <li>✅ Primary blue (#3535F3) focus ring</li>
          <li>✅ White thumb that slides smoothly</li>
          <li>✅ Font weight 400 (normal) for labels</li>
          <li>✅ Vercel black (#171717) text</li>
          <li>✅ 150ms smooth transitions</li>
        </ul>
      </div>
    </div>
  ),
};
