import React, { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '../../utils/cn';

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
}

export const Menu: React.FC<MenuProps> = ({
  items,
  trigger,
  position = 'bottom-left',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
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

  const positionStyles = {
    'bottom-left': 'top-full left-0 mt-2',
    'bottom-right': 'top-full right-0 mt-2',
    'top-left': 'bottom-full left-0 mb-2',
    'top-right': 'bottom-full right-0 mb-2',
  };

  return (
    <div className={cn('relative inline-block', className)} ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{trigger}</div>
      {isOpen && (
        <div
          className={cn(
            'absolute z-50 min-w-[200px] bg-white rounded-lg shadow-lg border border-neutral-200 py-1',
            'animate-slideDown',
            positionStyles[position]
          )}
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
      )}
    </div>
  );
};

export default Menu;
