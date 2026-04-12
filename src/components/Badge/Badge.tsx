import React, { forwardRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'premium'
  | 'accent'
  | 'neutral';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'md', dot = false, icon, children, className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-0.5',
      lg: 'text-base px-3 py-1',
    };

    const iconSizes = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    // Vercel badge styles - pill badges with tinted backgrounds + borders
    const variantStyles = {
      // Primary Blue (#3535F3) - General purpose
      primary: 'bg-primary-50 text-primary-700 [box-shadow:rgba(53,53,243,0.2)_0px_0px_0px_1px]',
      // Neutral Gray - Subtle information
      secondary: 'bg-gray-100 text-gray-600 [box-shadow:rgba(0,0,0,0.1)_0px_0px_0px_1px]',
      // Success Green (#1FBE5F) - Success states
      success: 'bg-success-50 text-success-700 [box-shadow:rgba(31,190,95,0.2)_0px_0px_0px_1px]',
      // Danger Red (#f50031) - Error states
      danger: 'bg-danger-50 text-danger-700 [box-shadow:rgba(245,0,49,0.2)_0px_0px_0px_1px]',
      // Warning Yellow (#f59e0b) - Warning states
      warning: 'bg-warning-100 text-warning-700 [box-shadow:rgba(245,158,11,0.25)_0px_0px_0px_1px]',
      // Premium Purple (#7e22ce) - Premium features
      premium: 'bg-premium-50 text-premium-700 [box-shadow:rgba(126,34,206,0.2)_0px_0px_0px_1px]',
      // Workflow Blue (deprecated, use primary)
      accent: 'bg-blue-100 text-workflow-develop [box-shadow:rgba(10,114,239,0.2)_0px_0px_0px_1px]',
      // Neutral Gray - Default
      neutral: 'bg-gray-100 text-gray-600 [box-shadow:rgba(0,0,0,0.1)_0px_0px_0px_1px]',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center gap-1.5 font-medium rounded-pill',
          sizeStyles[size],
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {dot && <span className={cn('w-1.5 h-1.5 rounded-full', `bg-current`)} />}
        {icon && <span className={cn('flex-shrink-0', iconSizes[size])}>{icon}</span>}
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
export default Badge;
