import React, { useState, useRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';

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
}

export const Popover: React.FC<PopoverProps> = ({
  content,
  position = 'top',
  children,
  className,
  trigger = 'click',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number>();

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
      setIsVisible(!isVisible);
    }
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div onClick={handleClick}>{children}</div>
      {isVisible && (
        <div
          className={cn(
            'absolute z-50 px-4 py-2 bg-white rounded-lg shadow-lg border border-neutral-200',
            'animate-fadeIn',
            positionStyles[position]
          )}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Popover;
