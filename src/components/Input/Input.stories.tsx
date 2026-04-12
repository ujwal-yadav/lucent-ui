import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';
import { useState } from 'react';
import {
  SearchIcon,
  MailIcon,
  CheckIcon,
  CloseIcon,
  UserIcon,
  EyeIcon,
  EyeOffIcon,
  CalendarIcon,
  ClockIcon,
} from '../Icon';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    type: 'email',
  },
};

export const Required: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    helperText: 'Must be at least 8 characters',
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    error: true,
    errorMessage: 'Invalid email address',
    defaultValue: 'invalid-email',
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter username',
    success: true,
    helperText: 'Username is available!',
    defaultValue: 'john_doe',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'Cannot edit',
    disabled: true,
    defaultValue: 'Disabled value',
  },
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input size="sm" placeholder="Small input" />
      <Input size="md" placeholder="Medium input (default)" />
      <Input size="lg" placeholder="Large input" />
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input variant="default" placeholder="Default variant" />
      <Input variant="filled" placeholder="Filled variant" />
      <Input variant="outline" placeholder="Outline variant" />
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input label="Search" placeholder="Search..." leftIcon={<SearchIcon size="sm" />} />
      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        leftIcon={<MailIcon size="sm" />}
      />
      <Input label="Username" placeholder="Enter username" leftIcon={<UserIcon size="sm" />} />
      <Input
        label="Valid Email"
        type="email"
        placeholder="your@email.com"
        leftIcon={<MailIcon size="sm" />}
        rightIcon={<CheckIcon size="sm" color="success" />}
        success
        defaultValue="user@example.com"
      />
      <Input
        label="Invalid Email"
        type="email"
        placeholder="your@email.com"
        leftIcon={<MailIcon size="sm" />}
        rightIcon={<CloseIcon size="sm" color="danger" />}
        error
        errorMessage="Invalid email address"
      />
    </div>
  ),
};

// Form example
export const FormExample: Story = {
  render: () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors = { email: '', password: '' };

      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      setErrors(newErrors);

      if (!newErrors.email && !newErrors.password) {
        alert('Form submitted successfully!');
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <Input
          label="Email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          error={!!errors.email}
          errorMessage={errors.email}
          required
        />
        <Input
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          error={!!errors.password}
          errorMessage={errors.password}
          helperText={!errors.password ? 'Must be at least 8 characters' : undefined}
          required
        />
        <button
          type="submit"
          className="w-full h-10 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
        >
          Submit
        </button>
      </form>
    );
  },
};

// Input types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input label="Text" type="text" placeholder="Text input" leftIcon={<UserIcon size="sm" />} />
      <Input
        label="Email"
        type="email"
        placeholder="email@example.com"
        leftIcon={<MailIcon size="sm" />}
      />
      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        rightIcon={<EyeOffIcon size="sm" />}
      />
      <Input label="Number" type="number" placeholder="123" />
      <Input label="Tel" type="tel" placeholder="(555) 555-5555" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input label="Date" type="date" leftIcon={<CalendarIcon size="sm" />} />
      <Input label="Time" type="time" leftIcon={<ClockIcon size="sm" />} />
    </div>
  ),
};

// Icon sizes
export const IconSizes: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <Input size="sm" placeholder="Small input with icon" leftIcon={<SearchIcon size="xs" />} />
      <Input size="md" placeholder="Medium input with icon" leftIcon={<SearchIcon size="sm" />} />
      <Input size="lg" placeholder="Large input with icon" leftIcon={<SearchIcon size="md" />} />
    </div>
  ),
};

// Password with visibility toggle
export const PasswordToggle: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="space-y-4 w-full">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Enter password"
          helperText="Must be at least 8 characters"
          defaultValue="secret123"
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer hover:opacity-70 transition-opacity"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <EyeOffIcon size="sm" color="gray" />
              ) : (
                <EyeIcon size="sm" color="gray" />
              )}
            </button>
          }
        />
      </div>
    );
  },
};

// All icon combinations
export const AllIconCombinations: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <h3 className="text-sm font-semibold text-gray-600 mb-2">Left Icons</h3>
      <Input placeholder="Search..." leftIcon={<SearchIcon size="sm" />} />
      <Input placeholder="Email..." leftIcon={<MailIcon size="sm" />} />
      <Input placeholder="Username..." leftIcon={<UserIcon size="sm" />} />

      <h3 className="text-sm font-semibold text-gray-600 mb-2 mt-6">Right Icons (Status)</h3>
      <Input
        placeholder="Valid input"
        rightIcon={<CheckIcon size="sm" color="success" />}
        success
        defaultValue="user@example.com"
      />
      <Input
        placeholder="Invalid input"
        rightIcon={<CloseIcon size="sm" color="danger" />}
        error
        errorMessage="This field is required"
      />

      <h3 className="text-sm font-semibold text-gray-600 mb-2 mt-6">Both Icons</h3>
      <Input
        placeholder="Email with status"
        leftIcon={<MailIcon size="sm" />}
        rightIcon={<CheckIcon size="sm" color="success" />}
        success
        defaultValue="user@example.com"
      />
      <Input
        placeholder="Search with error"
        leftIcon={<SearchIcon size="sm" />}
        rightIcon={<CloseIcon size="sm" color="danger" />}
        error
        errorMessage="No results found"
      />
    </div>
  ),
};

// Focus states
export const FocusStates: Story = {
  render: () => (
    <div className="space-y-4 w-full">
      <p className="text-sm text-gray-600 mb-4">
        Click on each input to see the focus ring (blue outline)
      </p>

      <h3 className="text-sm font-semibold text-gray-600 mb-2">Default Variant</h3>
      <Input label="Normal State" placeholder="Click to focus" />
      <Input
        label="Error State"
        placeholder="Click to focus"
        error
        errorMessage="This maintains the error border with focus ring"
      />
      <Input
        label="Success State"
        placeholder="Click to focus"
        success
        helperText="This maintains the success border with focus ring"
      />

      <h3 className="text-sm font-semibold text-gray-600 mb-2 mt-6">Filled Variant</h3>
      <Input variant="filled" label="Filled Input" placeholder="Click to focus" />
      <Input
        variant="filled"
        label="Filled with Error"
        placeholder="Click to focus"
        error
        errorMessage="Error state with focus"
      />

      <h3 className="text-sm font-semibold text-gray-600 mb-2 mt-6">Outline Variant</h3>
      <Input variant="outline" label="Outline Input" placeholder="Click to focus" />

      <h3 className="text-sm font-semibold text-gray-600 mb-2 mt-6">With Icons</h3>
      <Input
        label="Email with Icons"
        placeholder="Click to focus"
        leftIcon={<MailIcon size="sm" />}
        rightIcon={<CheckIcon size="sm" color="success" />}
      />
    </div>
  ),
};
