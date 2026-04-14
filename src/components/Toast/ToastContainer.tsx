import React, { ReactNode } from 'react';
import { Portal } from '../../utils/Portal';
import { cn } from '../../utils/cn';

export interface ToastContainerProps {
  /** Toast elements */
  children: ReactNode;
  /** Position of the toast container */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
  /** Additional className */
  className?: string;
}

/**
 * Container component for Toast notifications
 * Renders toasts in a fixed position using Portal
 */
export const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = 'top-right',
  className,
}) => {
  const positionStyles = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <Portal>
      <div
        className={cn(
          'fixed z-[9999] flex flex-col gap-3 pointer-events-none',
          positionStyles[position],
          className
        )}
      >
        {children}
      </div>
    </Portal>
  );
};

export default ToastContainer;
