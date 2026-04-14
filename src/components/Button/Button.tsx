import { forwardRef } from 'react';
import { ButtonProps } from './Button.types';
import { cn } from '../../utils/cn';

const LoadingSpinner = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      className,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    // Size styles
    const sizeStyles = {
      sm: 'h-8 px-3 text-sm gap-1.5',
      md: 'h-10 px-4 text-base gap-2',
      lg: 'h-12 px-6 text-lg gap-2.5',
    };

    // Icon sizes
    const iconSizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    // Vercel variant styles - shadow-as-border technique
    const variantStyles = {
      // Primary Blue (#3535F3) - Primary interactive actions
      primary: cn(
        'bg-primary-500 text-white',
        'hover:bg-primary-600',
        'active:bg-primary-700',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-100'
      ),
      // White button with shadow-border - secondary action
      secondary: cn(
        'bg-white text-neutral-900',
        '[box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px]',
        'hover:[box-shadow:rgb(235,235,235)_0px_0px_0px_1px] hover:bg-gray-50',
        'active:[box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px] active:bg-gray-100',
        // Keep border on focus (for mouse users) and add focus ring (for keyboard users)
        'focus:[box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px]',
        'focus-visible:[box-shadow:rgba(0,0,0,0.08)_0px_0px_0px_1px,0_0_0_3px_rgba(53,53,243,0.2)]',
        'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed'
      ),
      // Success Green (#1FBE5F) - Success confirmations
      success: cn(
        'bg-success-500 text-white',
        'hover:bg-success-600',
        'active:bg-success-700',
        'focus-visible:ring-2 focus-visible:ring-success-500 focus-visible:ring-offset-2',
        'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-100'
      ),
      // Danger Red (#f50031) - Destructive actions
      danger: cn(
        'bg-danger-500 text-white',
        'hover:bg-danger-600',
        'active:bg-danger-700',
        'focus-visible:ring-2 focus-visible:ring-danger-500 focus-visible:ring-offset-2',
        'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-100'
      ),
      // Warning Yellow (#f59e0b) - Warning actions
      warning: cn(
        'bg-warning-500 text-neutral-900',
        'hover:bg-warning-600',
        'active:bg-warning-700',
        'focus-visible:ring-2 focus-visible:ring-warning-500 focus-visible:ring-offset-2',
        'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-100'
      ),
      // Premium Purple (#7e22ce) - Premium features
      premium: cn(
        'bg-premium-600 text-white',
        'hover:bg-premium-700',
        'active:bg-premium-800',
        'focus-visible:ring-2 focus-visible:ring-premium-600 focus-visible:ring-offset-2',
        'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-100'
      ),
      // Outline style - stronger border
      outline: cn(
        'bg-white text-neutral-900',
        '[box-shadow:rgba(0,0,0,0.12)_0px_0px_0px_1px]',
        'hover:[box-shadow:rgba(0,0,0,0.16)_0px_0px_0px_1px] hover:bg-gray-50',
        'active:[box-shadow:rgba(0,0,0,0.12)_0px_0px_0px_1px] active:bg-gray-100',
        // Keep border on focus (for mouse users) and add focus ring (for keyboard users)
        'focus:[box-shadow:rgba(0,0,0,0.12)_0px_0px_0px_1px]',
        'focus-visible:[box-shadow:rgba(0,0,0,0.12)_0px_0px_0px_1px,0_0_0_3px_rgba(53,53,243,0.2)]',
        'disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed'
      ),
      // Ghost - no border, subtle hover
      ghost: cn(
        'bg-transparent text-neutral-900',
        'hover:bg-gray-50',
        'active:bg-gray-100',
        'focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-0',
        'disabled:text-gray-400 disabled:cursor-not-allowed'
      ),
      // Accent - workflow develop blue (deprecated, use primary instead)
      accent: cn(
        'bg-workflow-develop text-white',
        'hover:bg-workflow-develop/90',
        'active:bg-workflow-develop/80',
        'focus-visible:ring-2 focus-visible:ring-workflow-develop focus-visible:ring-offset-2',
        'disabled:bg-gray-400 disabled:cursor-not-allowed disabled:text-gray-100'
      ),
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={loading}
        aria-disabled={isDisabled}
        className={cn(
          // Base styles - Vercel design
          'inline-flex items-center justify-center',
          'font-medium rounded-md', // 8px radius, 500 weight
          'transition-[transform,background-color] duration-200', // Only transition transform and background
          'outline-none', // Remove default outline
          'focus:outline-none', // Remove outline on focus
          // Pop animation on click
          'active:scale-95',
          'disabled:active:scale-100', // No animation when disabled
          // Size
          sizeStyles[size],
          // Variant (includes focus-visible styles)
          variantStyles[variant],
          // Full width
          fullWidth && 'w-full',
          // Custom className
          className
        )}
        {...props}
      >
        {loading && <LoadingSpinner className={iconSizes[size]} />}
        {!loading && leftIcon && (
          <span className={cn('flex items-center justify-center flex-shrink-0', iconSizes[size])}>
            {leftIcon}
          </span>
        )}
        {children && <span className="flex items-center">{children}</span>}
        {!loading && rightIcon && (
          <span className={cn('flex items-center justify-center flex-shrink-0', iconSizes[size])}>
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
