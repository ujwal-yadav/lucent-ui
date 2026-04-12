import React, { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  /** Label for the textarea */
  label?: string;

  /** Helper text */
  helperText?: string;

  /** Error message */
  error?: string;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Whether textarea has error state */
  isInvalid?: boolean;

  /** Whether textarea is required */
  isRequired?: boolean;

  /** Whether to resize */
  resize?: 'none' | 'vertical' | 'horizontal' | 'both';
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      size = 'md',
      isInvalid = false,
      isRequired = false,
      resize = 'vertical',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const hasError = isInvalid || !!error;

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    const resizeStyles = {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            {label}
            {isRequired && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined
          }
          className={cn(
            'w-full rounded-lg border transition-colors duration-200',
            'focus:outline-none focus:ring-2 focus:ring-offset-0',
            'placeholder:text-neutral-400',
            sizeStyles[size],
            resizeStyles[resize],
            hasError
              ? 'border-danger-300 focus:border-danger-500 focus:ring-danger-200'
              : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-200',
            disabled && 'bg-neutral-50 cursor-not-allowed opacity-60',
            className
          )}
          {...props}
        />
        {error && (
          <p id={`${props.id}-error`} className="mt-1 text-sm text-danger-600">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={`${props.id}-helper`} className="mt-1 text-sm text-neutral-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;
