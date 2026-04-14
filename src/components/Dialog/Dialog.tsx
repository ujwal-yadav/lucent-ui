import React, { useEffect, useState, useRef } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/Portal';

export interface DialogProps {
  /** Whether dialog is open */
  isOpen: boolean;

  /** Callback when dialog should close */
  onClose: () => void;

  /** Dialog title */
  title?: string;

  /** Dialog content */
  children: React.ReactNode;

  /** Footer actions */
  footer?: React.ReactNode;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Additional className */
  className?: string;
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => setShouldRender(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <Portal>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50',
          'transition-opacity duration-300',
          isAnimating ? 'opacity-100' : 'opacity-0'
        )}
        onClick={onClose}
      >
        <div
          ref={dialogRef}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            'bg-white rounded-lg shadow-xl transition-all duration-300',
            'focus:outline-none',
            sizeStyles[size],
            isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
            className
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title ? 'dialog-title' : undefined}
        >
          {title && (
            <div className="px-6 py-4 border-b border-neutral-200">
              <h2 id="dialog-title" className="text-lg font-semibold text-neutral-900">
                {title}
              </h2>
            </div>
          )}
          <div className="px-6 py-4">{children}</div>
          {footer && (
            <div className="px-6 py-4 border-t border-neutral-200 flex justify-end gap-3">
              {footer}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Dialog;
