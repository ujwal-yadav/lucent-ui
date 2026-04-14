import React, { useState, useRef, ReactNode, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/Portal';

export type PopoverPosition = 'top' | 'bottom' | 'left' | 'right';

export interface PopoverProps {
  /** Popover content */
  content: ReactNode;

  /** Popover position */
  position?: PopoverPosition;

  /** Trigger element */
  children: ReactNode;

  /** Additional className */
  className?: string;

  /** Trigger on hover or click */
  trigger?: 'hover' | 'click';

  /** Use portal for rendering (default: true) */
  portal?: boolean;
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  position = 'top',
  children,
  className,
  trigger = 'click',
  portal = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const timeoutRef = useRef<number>();
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !portal) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'top':
        top = rect.top + scrollTop - 8;
        left = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'bottom':
        top = rect.bottom + scrollTop + 8;
        left = rect.left + scrollLeft + rect.width / 2;
        break;
      case 'left':
        top = rect.top + scrollTop + rect.height / 2;
        left = rect.left + scrollLeft - 8;
        break;
      case 'right':
        top = rect.top + scrollTop + rect.height / 2;
        left = rect.right + scrollLeft + 8;
        break;
    }

    setPopoverPosition({ top, left });
  };

  useEffect(() => {
    if (isVisible && portal) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isVisible, portal]);

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      updatePosition();
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      timeoutRef.current = window.setTimeout(() => setIsVisible(false), 200);
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (!isVisible) {
        updatePosition();
      }
      setIsVisible(!isVisible);
    }
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const portalPositionStyles = {
    top: '-translate-x-1/2 -translate-y-full',
    bottom: '-translate-x-1/2',
    left: '-translate-x-full -translate-y-1/2',
    right: '-translate-y-1/2',
  };

  const popoverContent = isVisible && (
    <div
      className={cn(
        'px-4 py-2 bg-white rounded-lg shadow-lg border border-neutral-200',
        'animate-fadeIn',
        portal ? 'fixed z-50' : 'absolute z-50',
        portal ? portalPositionStyles[position] : positionStyles[position]
      )}
      role="tooltip"
      style={
        portal
          ? {
              top: `${popoverPosition.top}px`,
              left: `${popoverPosition.left}px`,
            }
          : undefined
      }
    >
      {content}
    </div>
  );

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick}>{children}</div>
      {portal ? <Portal>{popoverContent}</Portal> : popoverContent}
    </div>
  );
};

export default Popover;
