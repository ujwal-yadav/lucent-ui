import React, { useState, useRef, ReactNode, useEffect } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/Portal';

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

  /** Use portal for rendering (default: true) */
  portal?: boolean;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
  className,
  delay = 300,
  portal = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const showTimeoutRef = useRef<number>();
  const hideTimeoutRef = useRef<number>();
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

    setTooltipPosition({ top, left });
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
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    setShouldRender(true);
    showTimeoutRef.current = window.setTimeout(() => {
      updatePosition();
      setIsVisible(true);
    }, delay);
  };

  const handleMouseLeave = () => {
    if (showTimeoutRef.current) clearTimeout(showTimeoutRef.current);

    setIsVisible(false);
    hideTimeoutRef.current = window.setTimeout(() => {
      setShouldRender(false);
    }, 200);
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

  const tooltipContent = shouldRender && (
    <div
      role="tooltip"
      className={cn(
        'px-3 py-2 text-sm text-white bg-neutral-900 rounded-lg whitespace-nowrap',
        'transition-all duration-200 ease-out',
        'pointer-events-none',
        portal ? 'fixed z-50' : 'absolute z-50',
        portal ? portalPositionStyles[position] : positionStyles[position],
        animationStyles[position]
      )}
      style={
        portal
          ? {
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`,
            }
          : undefined
      }
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
  );

  return (
    <div
      ref={triggerRef}
      className={cn('relative inline-block', className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      {portal ? <Portal>{tooltipContent}</Portal> : tooltipContent}
    </div>
  );
};

export default Tooltip;
