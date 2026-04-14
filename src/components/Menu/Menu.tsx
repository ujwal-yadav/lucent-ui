import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/Portal';

export interface MenuItem {
  /** Menu item label */
  label: string;

  /** Menu item icon */
  icon?: ReactNode;

  /** Callback when item is clicked */
  onClick?: () => void;

  /** Whether item is disabled */
  disabled?: boolean;

  /** Divider after this item */
  divider?: boolean;
}

export interface MenuProps {
  /** Menu items */
  items: MenuItem[];

  /** Trigger element */
  trigger: ReactNode;

  /** Menu position */
  position?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

  /** Additional className */
  className?: string;

  /** Use portal for rendering (default: true) */
  portal?: boolean;
}

export const Menu: React.FC<MenuProps> = ({
  items,
  trigger,
  position = 'bottom-left',
  className,
  portal = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const updatePosition = () => {
    if (!triggerRef.current || !portal) return;

    const rect = triggerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

    let top = 0;
    let left = 0;

    switch (position) {
      case 'bottom-left':
        top = rect.bottom + scrollTop + 8;
        left = rect.left + scrollLeft;
        break;
      case 'bottom-right':
        top = rect.bottom + scrollTop + 8;
        left = rect.right + scrollLeft;
        break;
      case 'top-left':
        top = rect.top + scrollTop - 8;
        left = rect.left + scrollLeft;
        break;
      case 'top-right':
        top = rect.top + scrollTop - 8;
        left = rect.right + scrollLeft;
        break;
    }

    setMenuPosition({ top, left });
  };

  useEffect(() => {
    if (isOpen && portal) {
      updatePosition();
      window.addEventListener('scroll', updatePosition, true);
      window.addEventListener('resize', updatePosition);
      return () => {
        window.removeEventListener('scroll', updatePosition, true);
        window.removeEventListener('resize', updatePosition);
      };
    }
  }, [isOpen, portal]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleTriggerClick = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  const positionStyles = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  const portalPositionStyles = {
    'bottom-left': '',
    'bottom-right': '-translate-x-full',
    'top-left': '-translate-y-full',
    'top-right': '-translate-x-full -translate-y-full',
  };

  const menuContent = isOpen && (
    <div
      ref={menuRef}
      className={cn(
        'min-w-[200px] bg-white rounded-lg shadow-lg border border-neutral-200 py-1',
        'animate-slideDown',
        portal ? 'fixed z-50' : 'absolute z-50',
        portal ? portalPositionStyles[position] : positionStyles[position]
      )}
      style={
        portal
          ? {
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left}px`,
            }
          : undefined
      }
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <button
            type="button"
            disabled={item.disabled}
            onClick={() => {
              if (!item.disabled) {
                item.onClick?.();
                setIsOpen(false);
              }
            }}
            className={cn(
              'w-full text-left px-4 py-2 flex items-center gap-3',
              'hover:bg-neutral-100 transition-colors',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              'text-neutral-700'
            )}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
          {item.divider && <div className="h-px bg-neutral-200 my-1" />}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className={cn('relative inline-block', className)}>
      <div ref={triggerRef} onClick={handleTriggerClick}>
        {trigger}
      </div>
      {portal ? <Portal>{menuContent}</Portal> : menuContent}
    </div>
  );
};

export default Menu;
