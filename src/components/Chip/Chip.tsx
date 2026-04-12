import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface ChipProps {
  /** Chip label */
  label: string;

  /** Chip variant */
  variant?: 'filled' | 'outlined';

  /** Chip color */
  color?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'danger'
    | 'premium'
    | 'neutral';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Icon to display before label */
  icon?: ReactNode;

  /** Avatar to display before label */
  avatar?: ReactNode;

  /** Callback when chip is clicked */
  onClick?: () => void;

  /** Callback when delete icon is clicked */
  onDelete?: () => void;

  /** Whether chip is clickable */
  clickable?: boolean;

  /** Whether chip is disabled */
  disabled?: boolean;

  /** Additional className */
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  variant = 'filled',
  color = 'neutral',
  size = 'md',
  icon,
  avatar,
  onClick,
  onDelete,
  clickable = false,
  disabled = false,
  className,
}) => {
  const isClickable = clickable || !!onClick;

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  };

  const colorStyles = {
    filled: {
      primary: 'bg-primary-100 text-primary-700 hover:bg-primary-200',
      secondary: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
      success: 'bg-success-100 text-success-700 hover:bg-success-200',
      warning: 'bg-warning-100 text-warning-700 hover:bg-warning-200',
      danger: 'bg-danger-100 text-danger-700 hover:bg-danger-200',
      error: 'bg-danger-100 text-danger-700 hover:bg-danger-200', // Alias for danger
      premium: 'bg-premium-100 text-premium-700 hover:bg-premium-200',
      neutral: 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200',
    },
    outlined: {
      primary: 'border-primary-300 text-primary-700 hover:bg-primary-50',
      secondary: 'border-purple-300 text-purple-700 hover:bg-purple-50',
      success: 'border-success-300 text-success-700 hover:bg-success-50',
      warning: 'border-warning-300 text-warning-700 hover:bg-warning-50',
      danger: 'border-danger-300 text-danger-700 hover:bg-danger-50',
      error: 'border-danger-300 text-danger-700 hover:bg-danger-50', // Alias for danger
      premium: 'border-premium-300 text-premium-700 hover:bg-premium-50',
      neutral: 'border-neutral-300 text-neutral-700 hover:bg-neutral-50',
    },
  };

  const Component = isClickable ? 'button' : 'div';

  return (
    <Component
      onClick={!disabled && isClickable ? onClick : undefined}
      disabled={disabled}
      className={cn(
        'inline-flex items-center rounded-full font-medium transition-colors duration-200',
        sizeStyles[size],
        variant === 'outlined' && 'border',
        colorStyles[variant][color],
        isClickable && !disabled && 'cursor-pointer',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {avatar && <span className="inline-flex -ml-1">{avatar}</span>}
      {icon && <span className="inline-flex">{icon}</span>}
      <span>{label}</span>
      {onDelete && !disabled && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="inline-flex items-center justify-center hover:opacity-70 transition-opacity -mr-1"
          aria-label="Delete"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </Component>
  );
};

export default Chip;
