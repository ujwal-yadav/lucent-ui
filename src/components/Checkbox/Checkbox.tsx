import React, { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;

  /** Helper text */
  helperText?: string;

  /** Error state */
  error?: boolean;

  /** Indeterminate state */
  indeterminate?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      helperText,
      error = false,
      indeterminate = false,
      size = 'md',
      className,
      disabled,
      id: customId,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;

    const sizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <div className={cn('inline-flex flex-col', className)}>
        <label
          className={cn(
            'inline-flex items-center gap-2.5',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          <input
            ref={ref}
            type="checkbox"
            id={id}
            disabled={disabled}
            className={cn(
              sizeStyles[size],
              'rounded border-2',
              'bg-white',
              'focus-visible:shadow-[0_0_0_2px_#3535F3]',
              'transition-all duration-150',
              'disabled:cursor-not-allowed disabled:opacity-50',
              'cursor-pointer',
              error
                ? 'border-danger checked:border-danger checked:bg-danger'
                : 'border-gray-400 checked:border-[#3535F3] checked:bg-[#3535F3] hover:border-[#3535F3]'
            )}
            style={{
              accentColor: error ? '#f50031' : '#3535F3',
            }}
            {...props}
          />
          {label && (
            <span
              className={cn(
                'text-sm text-neutral-900 font-normal select-none',
                disabled && 'cursor-not-allowed'
              )}
            >
              {label}
            </span>
          )}
        </label>
        {helperText && (
          <p className={cn('mt-1.5 ml-7 text-sm', error ? 'text-danger' : 'text-gray-500')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
export default Checkbox;
