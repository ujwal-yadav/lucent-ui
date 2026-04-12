import React, { useEffect, ReactNode, useState, useRef } from 'react';
import { cn } from '../../utils/cn';

export interface DrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;

  /** Callback when drawer should close */
  onClose: () => void;

  /** Drawer title */
  title?: string;

  /** Drawer content */
  children: ReactNode;

  /** Position of drawer */
  position?: 'left' | 'right' | 'top' | 'bottom';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Additional className for drawer content */
  className?: string;

  /** Whether clicking overlay closes drawer */
  closeOnOverlayClick?: boolean;

  /** Whether ESC key closes drawer */
  closeOnEsc?: boolean;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  position = 'right',
  size = 'md',
  className,
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle animation states
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
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // ESC key handler
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        drawerRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';

      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen || !drawerRef.current) return;

    const drawer = drawerRef.current;
    const focusableElements = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    drawer.addEventListener('keydown', handleTab);
    return () => drawer.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!shouldRender) return null;

  const sizeStyles = {
    left: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      xl: 'w-[32rem]',
      full: 'w-full',
    },
    right: {
      sm: 'w-64',
      md: 'w-80',
      lg: 'w-96',
      xl: 'w-[32rem]',
      full: 'w-full',
    },
    top: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      xl: 'h-[32rem]',
      full: 'h-full',
    },
    bottom: {
      sm: 'h-64',
      md: 'h-80',
      lg: 'h-96',
      xl: 'h-[32rem]',
      full: 'h-full',
    },
  };

  const positionStyles = {
    left: 'left-0 top-0 h-full',
    right: 'right-0 top-0 h-full',
    top: 'top-0 left-0 w-full',
    bottom: 'bottom-0 left-0 w-full',
  };

  const animationStyles = {
    left: isAnimating ? 'translate-x-0' : '-translate-x-full',
    right: isAnimating ? 'translate-x-0' : 'translate-x-full',
    top: isAnimating ? 'translate-y-0' : '-translate-y-full',
    bottom: isAnimating ? 'translate-y-0' : 'translate-y-full',
  };

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 bg-black/50',
        'transition-opacity duration-300',
        isAnimating ? 'opacity-100' : 'opacity-0'
      )}
      onClick={closeOnOverlayClick ? onClose : undefined}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'drawer-title' : undefined}
    >
      <div
        ref={drawerRef}
        tabIndex={-1}
        className={cn(
          'fixed bg-white shadow-xl',
          'transition-transform duration-300 ease-out',
          'focus:outline-none',
          'flex flex-col',
          positionStyles[position],
          sizeStyles[position][size],
          animationStyles[position],
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-neutral-200 flex-shrink-0">
            <h2 id="drawer-title" className="text-xl font-semibold text-neutral-900">
              {title}
            </h2>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-neutral-600 transition-colors"
              aria-label="Close drawer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className={cn('flex-1 overflow-y-auto p-6', !title && 'pt-8')}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
