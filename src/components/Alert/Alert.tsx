import React, { forwardRef, ReactNode, useState, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { InfoIcon, CheckIcon, WarningIcon, AlertIcon, CloseIcon } from '../Icon';

export type AlertVariant = 'info' | 'success' | 'warning' | 'danger' | 'premium';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Alert variant */
  variant?: AlertVariant;

  /** Alert title */
  title?: string;

  /** Custom icon element (overrides default variant icon) */
  icon?: ReactNode;

  /** Show icon (default: true) */
  showIcon?: boolean;

  /** Close button handler */
  onClose?: () => void;

  /** Children content */
  children?: ReactNode;

  /** Animation on mount */
  animated?: boolean;

  /** Auto dismiss after milliseconds */
  autoDismiss?: number;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = 'info',
      title,
      icon,
      showIcon = true,
      onClose,
      children,
      className,
      animated = true,
      autoDismiss,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [shouldRender, setShouldRender] = useState(true);

    useEffect(() => {
      if (animated) {
        // Trigger animation after mount
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      } else {
        setIsVisible(true);
      }
    }, [animated]);

    useEffect(() => {
      if (autoDismiss && onClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, autoDismiss);
        return () => clearTimeout(timer);
      }
    }, [autoDismiss, onClose]);

    const handleClose = () => {
      setIsVisible(false);
      setTimeout(() => {
        setShouldRender(false);
        onClose?.();
      }, 300); // Match animation duration
    };

    if (!shouldRender) return null;

    // Vercel alert styles - shadow-border with tinted backgrounds
    const variantStyles = {
      info: 'bg-primary-50 shadow-border text-neutral-900',
      success: 'bg-success-50 shadow-border text-neutral-900',
      warning: 'bg-warning-50 shadow-border text-neutral-900',
      danger: 'bg-danger-50 shadow-[rgba(245,0,49,0.3)_0px_0px_0px_1px] text-neutral-900',
      premium: 'bg-premium-50 shadow-[rgba(126,34,206,0.3)_0px_0px_0px_1px] text-neutral-900',
    };

    // Default icons for each variant
    const defaultIcons = {
      info: <InfoIcon size="md" color="workflow-develop" />,
      success: <CheckIcon size="md" color="success" />,
      warning: <WarningIcon size="md" color="warning" />,
      danger: <AlertIcon size="md" color="danger" />,
      premium: <InfoIcon size="md" color="premium" />,
    };

    // Use custom icon if provided, otherwise use default variant icon
    const displayIcon = icon || (showIcon && defaultIcons[variant]);

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'flex gap-3 p-4 rounded-md',
          'transition-all duration-300',
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4',
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {displayIcon && <div className="flex-shrink-0 flex items-start pt-0.5">{displayIcon}</div>}
        <div className="flex-1">
          {title && <div className="font-semibold mb-1">{title}</div>}
          {children && <div className="text-sm text-gray-600">{children}</div>}
        </div>
        {onClose && (
          <button
            onClick={handleClose}
            className="flex-shrink-0 text-gray-600 hover:text-neutral-900 transition-colors"
            aria-label="Close alert"
          >
            <CloseIcon size="md" />
          </button>
        )}
      </div>
    );
  }
);

Alert.displayName = 'Alert';
export default Alert;
