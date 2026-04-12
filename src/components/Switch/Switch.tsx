import React, { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, size = 'md', className, disabled, id: customId, checked, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;

    const sizeStyles = {
      sm: {
        switch: 'w-9 h-5',
        thumb: 'w-4 h-4',
        translate: checked ? 'translate-x-4' : 'translate-x-0',
      },
      md: {
        switch: 'w-11 h-6',
        thumb: 'w-5 h-5',
        translate: checked ? 'translate-x-5' : 'translate-x-0',
      },
      lg: {
        switch: 'w-14 h-7',
        thumb: 'w-6 h-6',
        translate: checked ? 'translate-x-7' : 'translate-x-0',
      },
    };

    return (
      <label
        className={cn(
          'inline-flex items-center gap-2.5 cursor-pointer',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            role="switch"
            disabled={disabled}
            checked={checked}
            className="sr-only peer"
            {...props}
          />
          <div
            className={cn(
              sizeStyles[size].switch,
              'rounded-full transition-all duration-150',
              'peer-focus-visible:shadow-[0_0_0_2px_#3535F3]',
              checked ? 'bg-[#3535F3]' : 'bg-gray-400',
              disabled && 'cursor-not-allowed'
            )}
          >
            <div
              className={cn(
                sizeStyles[size].thumb,
                sizeStyles[size].translate,
                'bg-white rounded-full transition-transform duration-150',
                'absolute top-0.5 left-0.5'
              )}
            />
          </div>
        </div>
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
    );
  }
);

Switch.displayName = 'Switch';
export default Switch;
