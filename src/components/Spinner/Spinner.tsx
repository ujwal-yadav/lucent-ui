import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type SpinnerSize = 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerVariant = 'primary' | 'secondary' | 'white' | 'premium';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Size variant */
  size?: SpinnerSize;

  /** Color variant */
  variant?: SpinnerVariant;

  /** Label for screen readers */
  label?: string;
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', variant = 'primary', label = 'Loading...', className, ...props }, ref) => {
    const sizeStyles = {
      sm: 'w-4 h-4 border-2',
      md: 'w-6 h-6 border-2',
      lg: 'w-8 h-8 border-3',
      xl: 'w-12 h-12 border-4',
    };

    const variantStyles = {
      primary: 'border-primary-200 border-t-primary-500',
      secondary: 'border-neutral-200 border-t-neutral-600',
      white: 'border-white/30 border-t-white',
      premium: 'border-premium-200 border-t-premium-600',
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label={label}
        className={cn('inline-block', className)}
        {...props}
      >
        <div
          className={cn('rounded-full animate-spin', sizeStyles[size], variantStyles[variant])}
        />
        <span className="sr-only">{label}</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';
export default Spinner;
