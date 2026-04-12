import React, { forwardRef } from 'react';
import { cn } from '../../utils/cn';

export type ProgressVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'premium';
export type ProgressSize = 'sm' | 'md' | 'lg';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Progress value (0-100) */
  value: number;

  /** Maximum value */
  max?: number;

  /** Color variant */
  variant?: ProgressVariant;

  /** Size */
  size?: ProgressSize;

  /** Show label */
  showLabel?: boolean;

  /** Label position */
  labelPosition?: 'inside' | 'outside';
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value,
      max = 100,
      variant = 'primary',
      size = 'md',
      showLabel = false,
      labelPosition = 'outside',
      className,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    const sizeStyles = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const variantStyles = {
      primary: 'bg-primary-500',
      secondary: 'bg-secondary-500',
      success: 'bg-success-500',
      danger: 'bg-danger-500',
      warning: 'bg-warning-500',
      premium: 'bg-premium-600',
    };

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {showLabel && labelPosition === 'outside' && (
          <div className="flex justify-between mb-1 text-sm text-neutral-600">
            <span>Progress</span>
            <span>{percentage.toFixed(0)}%</span>
          </div>
        )}
        <div
          className={cn('w-full bg-neutral-200 rounded-full overflow-hidden', sizeStyles[size])}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div
            className={cn('h-full transition-all duration-300', variantStyles[variant])}
            style={{ width: `${percentage}%` }}
          >
            {showLabel && labelPosition === 'inside' && size !== 'sm' && (
              <div className="flex items-center justify-center h-full text-xs text-white font-medium">
                {percentage.toFixed(0)}%
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Progress.displayName = 'Progress';
export default Progress;
