import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'warning'
  | 'premium'
  | 'accent'
  | 'outline'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;

  /** Size of the button */
  size?: ButtonSize;

  /** Whether the button is in a loading state */
  loading?: boolean;

  /** Whether the button is disabled */
  disabled?: boolean;

  /** Whether the button should take full width */
  fullWidth?: boolean;

  /** Icon to display on the left */
  leftIcon?: ReactNode;

  /** Icon to display on the right */
  rightIcon?: ReactNode;

  /** Button content */
  children?: ReactNode;

  /** Additional CSS classes */
  className?: string;
}
