import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card';
import { Badge } from '../Badge/Badge';
import { Button } from '../Button/Button';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  MenuIcon,
  LightningIcon,
  DocumentIcon,
} from '../Icon/icons';
import { Input } from '../Input/Input';
import { Progress } from '../Progress/Progress';
import { Menu } from '../Menu/Menu';
import { useState } from 'react';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Card>;

// ============================================
// 1. BASIC VARIANTS
// ============================================

export const Default: Story = {
  args: {
    children: <div>Card content goes here</div>,
  },
};

export const WithHeaderAndFooter: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This is the card content. It can contain any React components or HTML elements.</p>
      </CardContent>
      <CardFooter>
        <Button variant="primary">Action</Button>
        <Button variant="outline">Cancel</Button>
      </CardFooter>
    </Card>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <Card variant="default">
        <CardTitle>Default Card</CardTitle>
        <p className="mt-2 text-neutral-600">With border</p>
      </Card>
      <Card variant="outlined">
        <CardTitle>Outlined Card</CardTitle>
        <p className="mt-2 text-neutral-600">With thicker border</p>
      </Card>
      <Card variant="elevated">
        <CardTitle>Elevated Card</CardTitle>
        <p className="mt-2 text-neutral-600">With shadow</p>
      </Card>
    </div>
  ),
};

export const Hoverable: Story = {
  args: {
    hoverable: true,
    children: (
      <>
        <CardTitle>Hoverable Card</CardTitle>
        <p className="mt-2 text-neutral-600">Hover over me to see the effect</p>
      </>
    ),
  },
};

export const Padding: Story = {
  render: () => (
    <div className="space-y-4">
      <Card padding="sm">
        <CardTitle>Small Padding</CardTitle>
      </Card>
      <Card padding="md">
        <CardTitle>Medium Padding (Default)</CardTitle>
      </Card>
      <Card padding="lg">
        <CardTitle>Large Padding</CardTitle>
      </Card>
    </div>
  ),
};

// Variant #2: Card Header with Border
export const HeaderWithBorder: Story = {
  render: () => (
    <Card>
      <CardHeader className="border-b border-neutral-200 pb-4">
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings and preferences</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-sm text-neutral-600">
          Update your profile information, change password, and configure notifications.
        </p>
      </CardContent>
    </Card>
  ),
};

// Variant #3: Card with Border Separation
export const WithBorderSeparation: Story = {
  render: () => (
    <Card>
      <div className="space-y-0 divide-y divide-neutral-200">
        <div className="p-4">
          <h4 className="font-semibold text-sm">Personal Information</h4>
          <p className="text-sm text-neutral-600 mt-1">John Doe • john@example.com</p>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-sm">Subscription</h4>
          <p className="text-sm text-neutral-600 mt-1">Pro Plan • $29/month</p>
        </div>
        <div className="p-4">
          <h4 className="font-semibold text-sm">Billing</h4>
          <p className="text-sm text-neutral-600 mt-1">•••• 4242 • Expires 12/24</p>
        </div>
      </div>
    </Card>
  ),
};

// ============================================
// 2. IMAGE VARIANTS
// ============================================

// Variant #7: Card with Image
export const WithImage: Story = {
  render: () => (
    <Card padding="none">
      <div className="overflow-hidden rounded-t-md">
        <img
          src="https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&h=250&fit=crop"
          alt="Product"
          className="w-full h-48 object-cover"
        />
      </div>
      <CardContent className="p-6">
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription className="mt-2">
          High-quality wireless headphones with active noise cancellation
        </CardDescription>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-neutral-900">$299</span>
          <Button variant="primary">Add to Cart</Button>
        </div>
      </CardContent>
    </Card>
  ),
};

// Variant #8: Card with Image Scale Hover
export const WithImageScaleHover: Story = {
  render: () => (
    <Card padding="none" hoverable>
      <div className="overflow-hidden rounded-t-md">
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop"
          alt="Product"
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <CardTitle>Wireless Speaker</CardTitle>
        <CardDescription className="mt-2">
          Portable Bluetooth speaker with 360° sound
        </CardDescription>
        <div className="mt-4">
          <span className="text-2xl font-bold text-neutral-900">$149</span>
        </div>
      </CardContent>
    </Card>
  ),
};

// Variant #9: Card with Full Image
export const WithFullImage: Story = {
  render: () => (
    <Card padding="none" className="relative overflow-hidden h-64">
      <img
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop"
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <CardContent className="relative h-full flex flex-col justify-end text-white p-6">
        <CardTitle className="text-white text-2xl">Summer Collection</CardTitle>
        <p className="mt-2 text-white/90">Discover our latest arrivals</p>
        <Button variant="secondary" className="mt-4 w-fit">
          Shop Now
        </Button>
      </CardContent>
    </Card>
  ),
};

// Variant #10: Full Card with Image and Shadow Fade
export const WithImageShadowFade: Story = {
  render: () => (
    <Card padding="none" className="relative overflow-hidden h-80 shadow-2xl">
      <img
        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=350&fit=crop"
        alt="Premium Product"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
      <div className="absolute inset-0 shadow-inner-xl" />
      <CardContent className="relative h-full flex flex-col justify-between text-white p-8">
        <Badge variant="secondary" className="w-fit">New Arrival</Badge>
        <div>
          <CardTitle className="text-white text-3xl font-bold">Nike Air Max</CardTitle>
          <p className="mt-2 text-white/90 text-lg">Limited Edition</p>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-3xl font-bold">$199</span>
            <Button variant="secondary" size="lg">Shop Now</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// Variant #11: Card with Stacked Depth Effect
export const WithStackedDepth: Story = {
  render: () => (
    <div className="relative">
      <div className="absolute inset-0 bg-white rounded-md shadow-border translate-x-2 translate-y-2" />
      <div className="absolute inset-0 bg-white rounded-md shadow-border translate-x-1 translate-y-1" />
      <Card className="relative">
        <CardHeader>
          <CardTitle>Documents</CardTitle>
          <CardDescription>3 files in this folder</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <DocumentIcon size="sm" className="text-neutral-500" />
              <span>Project Proposal.pdf</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DocumentIcon size="sm" className="text-neutral-500" />
              <span>Budget Sheet.xlsx</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <DocumentIcon size="sm" className="text-neutral-500" />
              <span>Meeting Notes.docx</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

// ============================================
// 3. DASHBOARD & ANALYTICS VARIANTS
// ============================================

// Variant #15: Stat Card with Trend
export const StatCardWithTrend: Story = {
  render: () => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-neutral-600">Total Revenue</CardTitle>
        <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-neutral-900">$45,231.89</div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
            <ChevronUpIcon size="xs" className="text-green-600" />
            +20.1%
          </span>
          <span className="text-xs text-neutral-500">from last month</span>
        </div>
      </CardContent>
    </Card>
  ),
};

// Variant #14: Deployment Status Summary
export const DeploymentStatus: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle>Production Deployment</CardTitle>
            <Badge variant="success">Live</Badge>
          </div>
          <Button variant="ghost" size="sm">
            View Logs
          </Button>
        </div>
        <CardDescription>Deployed 2 hours ago</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Commit:</span>
            <code className="text-xs bg-neutral-100 px-2 py-0.5 rounded">a7b3c9d</code>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Branch:</span>
            <span className="font-medium">main</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-neutral-600">Status:</span>
            <span className="text-green-600 font-medium">Healthy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

// Variant #13: Expandable Billing Usage
export const ExpandableBillingUsage: Story = {
  render: () => {
    const [expanded, setExpanded] = useState(false);
    return (
      <Card>
        <CardHeader>
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setExpanded(!expanded)}
          >
            <div>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>March 2024</CardDescription>
            </div>
            {expanded ? <ChevronUpIcon size="sm" /> : <ChevronDownIcon size="sm" />}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-neutral-600">Used</span>
              <span className="font-medium">12,450 / 20,000 requests</span>
            </div>
            <Progress value={62} className="h-2" />
          </div>
          {expanded && (
            <div className="mt-4 pt-4 border-t border-neutral-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Average per day:</span>
                <span>415 requests</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Estimated overage:</span>
                <span className="text-green-600">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600">Billing cycle ends:</span>
                <span>March 31, 2024</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  },
};

// Variant #16: Card with Header Badge and Actions
export const WithHeaderBadgeAndActions: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <Badge variant="warning" className="mb-2">In Progress</Badge>
            <CardTitle>Website Redesign</CardTitle>
            <CardDescription>Due: March 30, 2024</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">Edit</Button>
            <Button variant="ghost" size="sm">Delete</Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">
          Complete overhaul of the company website with new branding and improved UX.
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-xs text-neutral-600 mb-1">
            <span>Progress</span>
            <span>65%</span>
          </div>
          <Progress value={65} className="h-2" />
        </div>
      </CardContent>
    </Card>
  ),
};

// ============================================
// 4. NAVIGATION & LINK VARIANTS
// ============================================

// Variant #5: Card with Link
export const WithLink: Story = {
  render: () => (
    <Card hoverable className="cursor-pointer">
      <CardHeader>
        <CardTitle>Getting Started Guide</CardTitle>
        <CardDescription>Learn the basics in 10 minutes</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">
          A comprehensive introduction to all the core features and concepts.
        </p>
        <div className="mt-4 flex items-center text-sm text-primary-600 font-medium">
          Read article
          <ChevronRightIcon size="sm" className="ml-1 text-primary-600" />
        </div>
      </CardContent>
    </Card>
  ),
};

// Variant #17: Card with Icon, Title and Link
export const WithIconTitleLink: Story = {
  render: () => (
    <Card hoverable>
      <CardContent className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary-100 text-primary-600 mb-4">
          <LightningIcon size="md" className="text-primary-600" />
        </div>
        <CardTitle className="mb-2">Fast Performance</CardTitle>
        <CardDescription className="mb-4">
          Optimized for speed and efficiency with modern web technologies.
        </CardDescription>
        <Button variant="ghost" className="p-0 text-primary-600 hover:text-primary-700">
          Learn more →
        </Button>
      </CardContent>
    </Card>
  ),
};

// Variant #18: Card with Header Label and Link
export const WithHeaderLabelLink: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs text-primary-600 font-medium uppercase tracking-wide">Tutorial</span>
            <CardTitle className="mt-1">Building Your First Component</CardTitle>
          </div>
          <Button variant="ghost" size="sm" className="text-primary-600 hover:text-primary-700">
            View →
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>
          Step-by-step guide to creating reusable React components with TypeScript.
        </CardDescription>
        <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
          <span>10 min read</span>
          <span>•</span>
          <span>Beginner</span>
        </div>
      </CardContent>
    </Card>
  ),
};

// ============================================
// 5. FORM VARIANTS
// ============================================

// Variant #12: Advanced Clean Login Form
export const LoginForm: Story = {
  render: () => (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Welcome Back</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              fullWidth
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              fullWidth
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded" />
              <span>Remember me</span>
            </label>
            <button type="button" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Forgot password?
            </button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button variant="primary" className="w-full">
          Sign In
        </Button>
        <p className="text-sm text-neutral-600 text-center">
          Don't have an account?{' '}
          <button type="button" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign up
          </button>
        </p>
      </CardFooter>
    </Card>
  ),
};

// ============================================
// 6. INTERACTIVE VARIANTS
// ============================================

// Variant #6: Card with Dropdown Menu
export const WithDropdownMenu: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Alpha</CardTitle>
            <CardDescription>Last updated 2 hours ago</CardDescription>
          </div>
          <Menu
            trigger={
              <Button variant="ghost" size="sm">
                <MenuIcon size="sm" />
              </Button>
            }
            items={[
              { label: 'Edit', onClick: () => console.log('Edit') },
              { label: 'Duplicate', onClick: () => console.log('Duplicate') },
              { label: 'Archive', onClick: () => console.log('Archive') },
              { label: 'Delete', onClick: () => console.log('Delete') },
            ]}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-neutral-600">
          A high-priority project for Q2 2024 focusing on customer experience improvements.
        </p>
      </CardContent>
    </Card>
  ),
};
