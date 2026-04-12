import { InputHTMLAttributes, ReactNode } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';
export type InputVariant = 'default' | 'filled' | 'outline';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Size variant */
  size?: InputSize;

  /** Visual variant */
  variant?: InputVariant;

  /** Error state */
  error?: boolean;

  /** Success state */
  success?: boolean;

  /** Helper text below input */
  helperText?: string;

  /** Error message */
  errorMessage?: string;

  /** Label for the input */
  label?: string;

  /** Icon on the left */
  leftIcon?: ReactNode;

  /** Icon on the right */
  rightIcon?: ReactNode;

  /** Whether the input takes full width */
  fullWidth?: boolean;

  /** Additional class for the wrapper */
  wrapperClassName?: string;
}
