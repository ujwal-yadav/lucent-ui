import { forwardRef, useId } from 'react';
import { InputProps } from './Input.types';
import { cn } from '../../utils/cn';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      size = 'md',
      variant = 'default',
      error = false,
      success = false,
      helperText,
      errorMessage,
      label,
      leftIcon,
      rightIcon,
      fullWidth = false,
      wrapperClassName,
      className,
      id: customId,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const id = customId || generatedId;
    const helperTextId = `${id}-helper`;
    const errorId = `${id}-error`;

    // Size styles
    const sizeStyles = {
      sm: {
        input: 'h-8 px-3 text-sm',
        icon: 'w-4 h-4',
        iconPadding: leftIcon ? 'pl-9' : rightIcon ? 'pr-9' : '',
      },
      md: {
        input: 'h-10 px-4 text-base',
        icon: 'w-5 h-5',
        iconPadding: leftIcon ? 'pl-11' : rightIcon ? 'pr-11' : '',
      },
      lg: {
        input: 'h-12 px-5 text-lg',
        icon: 'w-6 h-6',
        iconPadding: leftIcon ? 'pl-12' : rightIcon ? 'pr-12' : '',
      },
    };

    // Vercel variant styles - shadow-as-border with focus ring (primary blue)
    const variantStyles = {
      default: cn(
        'bg-white text-neutral-900 shadow-border',
        'hover:shadow-border-light',
        'focus-visible:shadow-[rgba(0,0,0,0.08)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
        error &&
          'shadow-[rgba(245,0,49,0.3)_0px_0px_0px_1px] focus-visible:shadow-[rgba(245,0,49,0.3)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
        success &&
          'shadow-[rgba(31,190,95,0.3)_0px_0px_0px_1px] focus-visible:shadow-[rgba(31,190,95,0.3)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]'
      ),
      filled: cn(
        'bg-gray-50 text-neutral-900 shadow-border',
        'hover:bg-white hover:shadow-border-light',
        'focus-visible:bg-white focus-visible:shadow-[rgba(0,0,0,0.08)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
        error &&
          'bg-danger-50 shadow-[rgba(245,0,49,0.3)_0px_0px_0px_1px] focus-visible:bg-danger-50 focus-visible:shadow-[rgba(245,0,49,0.3)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
        success &&
          'bg-success-50 shadow-[rgba(31,190,95,0.3)_0px_0px_0px_1px] focus-visible:bg-success-50 focus-visible:shadow-[rgba(31,190,95,0.3)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]'
      ),
      // Keep outline for compatibility
      outline: cn(
        'bg-white text-neutral-900',
        'shadow-[rgba(0,0,0,0.12)_0px_0px_0px_1px]',
        'hover:shadow-[rgba(0,0,0,0.16)_0px_0px_0px_1px]',
        'focus-visible:shadow-[rgba(0,0,0,0.12)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
        error &&
          'shadow-[rgba(245,0,49,0.4)_0px_0px_0px_1px] focus-visible:shadow-[rgba(245,0,49,0.4)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
        success &&
          'shadow-[rgba(31,190,95,0.4)_0px_0px_0px_1px] focus-visible:shadow-[rgba(31,190,95,0.4)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]'
      ),
    };

    const iconColor = error ? 'text-danger' : success ? 'text-success' : 'text-gray-400';

    return (
      <div className={cn(fullWidth ? 'w-full' : 'inline-block', wrapperClassName)}>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              'block text-sm font-medium text-gray-600 mb-1.5',
              disabled && 'opacity-50'
            )}
          >
            {label}
            {required && <span className="text-danger ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <div
              className={cn(
                'absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center',
                sizeStyles[size].icon,
                iconColor
              )}
            >
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={id}
            disabled={disabled}
            aria-invalid={error}
            aria-describedby={error ? errorId : helperText ? helperTextId : undefined}
            aria-required={required}
            className={cn(
              // Base styles - Vercel design
              'w-full rounded-md', // 8px radius
              'transition-all duration-200',
              'focus:outline-none',
              'placeholder:text-gray-400',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              // Size
              sizeStyles[size].input,
              sizeStyles[size].iconPadding,
              // Variant
              variantStyles[variant],
              // Custom className
              className
            )}
            {...props}
          />

          {rightIcon && (
            <div
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center',
                sizeStyles[size].icon,
                iconColor,
                '[&>button]:pointer-events-auto [&>:not(button)]:pointer-events-none'
              )}
            >
              {rightIcon}
            </div>
          )}
        </div>

        {errorMessage && error && (
          <p id={errorId} className="mt-1.5 text-sm text-danger" role="alert">
            {errorMessage}
          </p>
        )}

        {helperText && !error && (
          <p id={helperTextId} className="mt-1.5 text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
