import React, { useState, useRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tooltip content */
  content: ReactNode;

  /** Tooltip position */
  position?: TooltipPosition;

  /** Child element */
  children: ReactNode;

  /** Additional className */
  className?: string;

  /** Delay before showing (ms) */
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  className,
  delay = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const showTimeoutRef = useRef<number>();
  const hideTimeoutRef = useRef<number>();

  const handleMouseEnter = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    setShouldRender(true);
    showTimeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);

    setIsVisible(false);
    hideTimeoutRef.current = window.setTimeout(() => {
      setShouldRender(false);
    }, 200); // Wait for fade out animation
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const animationStyles = {
    top: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1',
    bottom: isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1',
    left: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1',
    right: isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-transparent border-t-neutral-900',
    bottom:
      'bottom-full left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-transparent border-b-neutral-900',
    left: 'left-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-transparent border-l-neutral-900',
    right:
      'right-full top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-transparent border-r-neutral-900',
  };

  return (
    <div
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {shouldRender && (
        <div
          role="tooltip"
          className={cn(
            'absolute z-50 px-3 py-2 text-sm text-white bg-neutral-900 rounded-lg whitespace-nowrap',
            'transition-all duration-200 ease-out',
            'pointer-events-none',
            positionStyles[position],
            animationStyles[position]
          )}
        >
          {content}
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              'transition-opacity duration-200',
              isVisible ? 'opacity-100' : 'opacity-0',
              arrowStyles[position]
            )}
          />
        </div>
      )}
    </div>
  );
};

export default Tooltip;
