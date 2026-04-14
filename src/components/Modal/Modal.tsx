import { useEffect, ReactNode, useState, useRef } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/Portal';

export interface ModalProps {
  /** Whether the modal is open */
  isOpen: boolean;

  /** Callback when modal should close */
  onClose: () => void;

  /** Modal title */
  title?: string;

  /** Modal content */
  children: ReactNode;

  /** Footer actions (buttons, etc.) */
  actions?: ReactNode;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /** Additional className for modal content */
  className?: string;

  /** Whether clicking overlay closes modal */
  closeOnOverlayClick?: boolean;

  /** Whether ESC key closes modal */
  closeOnEsc?: boolean;

  /** Animation variant */
  animation?: 'fade' | 'scale' | 'slideUp' | 'slideDown';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  className,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  animation = 'scale',
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(isOpen);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Double requestAnimationFrame ensures initial state is painted before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Wait for animation to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match animation duration
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

      // Focus trap - focus the modal
      setTimeout(() => {
        modalRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';

      // Return focus to previous element
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap inside modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;
    const focusableElements = modal.querySelectorAll(
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

    modal.addEventListener('keydown', handleTab);
    return () => modal.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!shouldRender) return null;

  const sizeStyles = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full m-4',
  };

  const animationStyles = {
    fade: {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating ? 'opacity-100' : 'opacity-0',
    },
    scale: {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-95',
    },
    slideUp: {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
    },
    slideDown: {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4',
    },
  };

  return (
    <Portal>
      <div
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50',
          'transition-opacity duration-300',
          animationStyles[animation].overlay
        )}
        onClick={closeOnOverlayClick ? onClose : undefined}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        <div
          ref={modalRef}
          tabIndex={-1}
          className={cn(
            'relative w-full bg-white rounded-md shadow-card',
            'transition-all duration-300',
            'focus:outline-none',
            sizeStyles[size],
            animationStyles[animation].content,
            className
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with close button */}
          <div
            className={cn('flex items-center justify-between', title ? 'p-6' : 'p-4 pb-0')}
            style={title ? { boxShadow: 'rgba(0, 0, 0, 0.08) 0px 1px 0px' } : undefined}
          >
            {title && (
              <h2
                id="modal-title"
                className="text-xl font-semibold text-neutral-900 tracking-subhead"
              >
                {title}
              </h2>
            )}
            <button
              onClick={onClose}
              className={cn(
                'text-gray-400 hover:text-gray-600 transition-colors',
                !title && 'ml-auto'
              )}
              aria-label="Close modal"
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

          {/* Content */}
          <div className="p-6">{children}</div>

          {/* Footer */}
          {actions && (
            <div
              className="flex items-center justify-end gap-3 px-6 py-4"
              style={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px -1px 0px' }}
            >
              {actions}
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
