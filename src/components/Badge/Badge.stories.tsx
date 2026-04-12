import type { Meta, StoryObj } from '@storybook/react';
import { Badge, BadgeVariant } from './Badge';

const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: { children: 'Badge' },
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Semantic Variants</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Success (#1FBE5F)</Badge>
          <Badge variant="danger">Danger (#f50031)</Badge>
          <Badge variant="warning">Warning (#f59e0b)</Badge>
          <Badge variant="premium">Premium (#7e22ce)</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">General Purpose</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">Primary (#3535F3)</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-600 mb-3">Deprecated</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="accent">Accent (use primary)</Badge>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size="lg">Large</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge dot variant="success">
        Active
      </Badge>
      <Badge dot variant="warning">
        Pending
      </Badge>
      <Badge dot variant="danger">
        Error
      </Badge>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge
        variant="success"
        icon={
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      >
        Completed
      </Badge>
      <Badge
        variant="danger"
        icon={
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        }
      >
        Failed
      </Badge>
      <Badge
        variant="warning"
        icon={
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        }
      >
        Warning
      </Badge>
      <Badge
        variant="primary"
        icon={
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        }
      >
        Premium
      </Badge>
    </div>
  ),
};

// Border Design - Shadow-as-Border
export const BorderDesign: Story = {
  render: () => (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-2">Badge Borders</h2>
        <p className="text-sm text-gray-600 mb-6">
          All badges use the shadow-as-border technique with semi-transparent borders matching their
          variant colors.
        </p>
      </div>

      <div className="space-y-6">
        {/* Visual Comparison */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Border Visibility</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 bg-white rounded-lg shadow-border">
              <p className="text-xs font-medium text-gray-600 mb-3">On White Background</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="premium">Premium</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <p className="text-xs font-medium text-gray-600 mb-3">On Gray Background</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">Primary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="danger">Danger</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="premium">Premium</Badge>
                <Badge variant="secondary">Secondary</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Border Specifications */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Border Specifications</h3>
          <div className="space-y-3">
            {[
              {
                variant: 'primary',
                label: 'Primary',
                border: 'rgba(53,53,243,0.2)',
                color: '#3535F3',
              },
              {
                variant: 'success',
                label: 'Success',
                border: 'rgba(31,190,95,0.2)',
                color: '#1FBE5F',
              },
              {
                variant: 'danger',
                label: 'Danger',
                border: 'rgba(245,0,49,0.2)',
                color: '#f50031',
              },
              {
                variant: 'warning',
                label: 'Warning',
                border: 'rgba(245,158,11,0.25)',
                color: '#f59e0b',
              },
              {
                variant: 'premium',
                label: 'Premium',
                border: 'rgba(126,34,206,0.2)',
                color: '#7e22ce',
              },
              {
                variant: 'secondary',
                label: 'Secondary',
                border: 'rgba(0,0,0,0.1)',
                color: '#4b5563',
              },
            ].map(({ variant, label, border, color }) => (
              <div key={variant} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <Badge variant={variant as BadgeVariant}>{label}</Badge>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-xs bg-white px-2 py-0.5 rounded font-mono">{border}</code>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: color }}
                      title={`Base color: ${color}`}
                    />
                  </div>
                  <p className="text-xs text-gray-600">
                    {border.includes('0.2') ? '20% opacity' : '25% opacity'} of base color
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-3">Technical Implementation</h4>
          <div className="text-xs text-gray-600 space-y-2 font-mono">
            <p>
              <strong>Method:</strong> box-shadow (not CSS border)
            </p>
            <p>
              <strong>Pattern:</strong> [box-shadow:rgba(R,G,B,ALPHA)_0px_0px_0px_1px]
            </p>
            <p>
              <strong>Example (Success):</strong> [box-shadow:rgba(31,190,95,0.2)_0px_0px_0px_1px]
            </p>
            <p className="pt-2 font-sans">
              <strong>Why this approach?</strong> Follows Vercel design system's shadow-as-border
              technique for consistent, smooth rendering across all components.
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const IconSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge
        size="sm"
        variant="primary"
        icon={
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      >
        Small
      </Badge>
      <Badge
        size="md"
        variant="primary"
        icon={
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      >
        Medium
      </Badge>
      <Badge
        size="lg"
        variant="primary"
        icon={
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        }
      >
        Large
      </Badge>
    </div>
  ),
};

// Color System & Semantic Usage
export const ColorSystemSemantics: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-lg font-semibold text-neutral-900 mb-2">Badge Color System</h2>
        <p className="text-sm text-gray-600 mb-6">
          All badge variants follow the Lucent UI color palette with tinted backgrounds and darker
          text for optimal readability.
        </p>
      </div>

      <div className="space-y-6">
        {/* Semantic Variants */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Semantic Variants</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Badge variant="primary">Primary</Badge>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Primary (#3535F3)</h4>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Colors:</strong> bg: primary-50 (#ebebfe), text: primary-700 (#1f1f91),
                  border: rgba(53,53,243,0.2)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Usage:</strong> General purpose, featured items, premium features
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Badge variant="success" dot>
                Success
              </Badge>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Success (#1FBE5F)</h4>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Colors:</strong> bg: success-50, text: success-700, border:
                  rgba(31,190,95,0.2)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Usage:</strong> Completed tasks, active status, success confirmations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Badge variant="danger" dot>
                Danger
              </Badge>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Danger (#f50031)</h4>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Colors:</strong> bg: danger-50, text: danger-700, border:
                  rgba(245,0,49,0.2)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Usage:</strong> Error states, critical alerts, failed operations
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Badge variant="warning" dot>
                Warning
              </Badge>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Warning (#f59e0b)</h4>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Colors:</strong> bg: warning-100, text: warning-700, border:
                  rgba(245,158,11,0.25)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Usage:</strong> Pending actions, important notices, review needed
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Badge variant="premium">Premium</Badge>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Premium (#7e22ce)</h4>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Colors:</strong> bg: premium-50, text: premium-700, border:
                  rgba(126,34,206,0.2)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Usage:</strong> Premium features, pro badges, special highlights
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Badge variant="secondary">Secondary</Badge>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">
                  Secondary (Neutral Gray)
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Colors:</strong> bg: gray-100, text: gray-600, border: rgba(0,0,0,0.1)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Usage:</strong> Subtle information, metadata, tags
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <Badge variant="neutral">Neutral</Badge>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-neutral-900 mb-1">Neutral (Gray)</h4>
                <p className="text-xs text-gray-600 mb-2">
                  <strong>Colors:</strong> bg: gray-100, text: gray-600, border: rgba(0,0,0,0.1)
                </p>
                <p className="text-xs text-gray-600">
                  <strong>Usage:</strong> Default neutral state, non-semantic info
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Real-World Examples</h3>
          <div className="space-y-4">
            <div className="p-4 bg-white rounded-lg shadow-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900">Task Status</span>
                <Badge variant="success" dot>
                  Completed
                </Badge>
              </div>
              <p className="text-xs text-gray-600">Build deployment finished successfully</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900">API Health</span>
                <Badge variant="danger" dot>
                  Down
                </Badge>
              </div>
              <p className="text-xs text-gray-600">Service experiencing issues</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900">Review Status</span>
                <Badge variant="warning" dot>
                  Pending
                </Badge>
              </div>
              <p className="text-xs text-gray-600">Awaiting approval from team lead</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-neutral-900">Tags:</span>
                <Badge variant="secondary" size="sm">
                  React
                </Badge>
                <Badge variant="secondary" size="sm">
                  TypeScript
                </Badge>
                <Badge variant="secondary" size="sm">
                  UI
                </Badge>
              </div>
              <p className="text-xs text-gray-600">Component library project</p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-neutral-900">Feature Badge</span>
                <Badge variant="primary">New</Badge>
              </div>
              <p className="text-xs text-gray-600">Recently added feature or premium content</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="p-4 bg-success-50 rounded-lg border border-success-200">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">✅ Color Palette Alignment</h4>
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              <strong>Primary Badges:</strong> primary-50 bg + primary-700 text +
              rgba(53,53,243,0.2) border
            </p>
            <p>
              <strong>Success Badges:</strong> success-50 bg + success-700 text +
              rgba(31,190,95,0.2) border
            </p>
            <p>
              <strong>Danger Badges:</strong> danger-50 bg + danger-700 text + rgba(245,0,49,0.2)
              border
            </p>
            <p>
              <strong>Warning Badges:</strong> warning-100 bg + warning-700 text +
              rgba(245,158,11,0.25) border
            </p>
          </div>
        </div>

        <div className="p-4 bg-primary-50 rounded-lg">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">
            🎨 Shadow-as-Border Technique
          </h4>
          <div className="text-xs text-gray-600 space-y-2">
            <p>
              <strong>Why box-shadow?</strong> Following Vercel design system, we use box-shadow
              instead of CSS borders for subtle, consistent styling.
            </p>
            <p>
              <strong>Border Colors:</strong> Each variant uses a semi-transparent version of its
              primary color (20-25% opacity) for the border.
            </p>
            <p>
              <strong>Benefits:</strong> Smoother rendering, better visual consistency, and matches
              the rest of the component library.
            </p>
          </div>
        </div>

        <div className="p-4 bg-warning-50 rounded-lg border border-warning-200">
          <h4 className="text-sm font-medium text-neutral-900 mb-2">⚠️ Design System Note</h4>
          <p className="text-xs text-gray-600">
            Use semantic colors (Success/Danger/Warning) to convey meaning. The accent variant uses
            workflow-develop color and is deprecated - use primary instead for general purpose
            badges.
          </p>
        </div>
      </div>
    </div>
  ),
};
