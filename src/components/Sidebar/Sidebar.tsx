import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface SidebarItemProps {
  /** Icon element */
  icon?: ReactNode;

  /** Label text */
  label: string;

  /** Whether the item is active */
  active?: boolean;

  /** Whether the item is disabled */
  disabled?: boolean;

  /** Click handler */
  onClick?: () => void;

  /** Optional badge content */
  badge?: string | number;

  /** Optional href for link items */
  href?: string;
}

export interface SidebarProps {
  /** Whether the sidebar is collapsed */
  collapsed?: boolean;

  /** Position of sidebar */
  position?: 'left' | 'right';

  /** Width variant when expanded */
  width?: 'sm' | 'md' | 'lg';

  /** Additional className */
  className?: string;

  /** Header content */
  header?: ReactNode;

  /** Footer content */
  footer?: ReactNode;

  /** Navigation items */
  items?: SidebarItemProps[];

  /** Custom children (overrides items if provided) */
  children?: ReactNode;

  /** Callback when collapse state changes */
  onCollapsedChange?: (collapsed: boolean) => void;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  active = false,
  disabled = false,
  onClick,
  badge,
  href,
}) => {
  const Component = href ? 'a' : 'button';

  return (
    <Component
      href={href}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={cn(
        'w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
        'outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
        active
          ? 'bg-primary-50 text-primary-700'
          : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
        disabled && 'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-700'
      )}
    >
      {icon && <span className="flex-shrink-0 w-5 h-5">{icon}</span>}
      <span className="flex-1 text-left truncate">{label}</span>
      {badge && (
        <span
          className={cn(
            'flex-shrink-0 px-2 py-0.5 text-xs font-semibold rounded-full',
            active ? 'bg-primary-100 text-primary-700' : 'bg-neutral-200 text-neutral-700'
          )}
        >
          {badge}
        </span>
      )}
    </Component>
  );
};

SidebarItem.displayName = 'SidebarItem';

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed = false,
  position = 'left',
  width = 'md',
  className,
  header,
  footer,
  items,
  children,
  onCollapsedChange,
}) => {
  const widthStyles = {
    sm: collapsed ? 'w-16' : 'w-56',
    md: collapsed ? 'w-16' : 'w-64',
    lg: collapsed ? 'w-16' : 'w-80',
  };

  const positionStyles = {
    left: 'left-0',
    right: 'right-0',
  };

  return (
    <aside
      className={cn(
        'fixed top-0 h-screen bg-white border-neutral-200 flex flex-col',
        'transition-all duration-300 ease-in-out shadow-border',
        position === 'left' ? 'border-r' : 'border-l',
        positionStyles[position],
        widthStyles[width],
        className
      )}
    >
      {/* Header */}
      {header && (
        <div
          className={cn(
            'flex-shrink-0 px-4 py-4 border-b border-neutral-200',
            collapsed && 'px-2'
          )}
        >
          {header}
        </div>
      )}

      {/* Navigation */}
      <nav className={cn('flex-1 overflow-y-auto p-3', collapsed && 'px-2')}>
        {children ? (
          children
        ) : (
          <div className="space-y-1">
            {items?.map((item, index) => (
              <div key={index} title={collapsed ? item.label : undefined}>
                {collapsed ? (
                  <button
                    onClick={!item.disabled ? item.onClick : undefined}
                    disabled={item.disabled}
                    className={cn(
                      'w-full flex items-center justify-center p-3 rounded-lg transition-colors',
                      'outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
                      item.active
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
                      item.disabled &&
                        'opacity-50 cursor-not-allowed hover:bg-transparent hover:text-neutral-700'
                    )}
                  >
                    {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                  </button>
                ) : (
                  <SidebarItem {...item} />
                )}
              </div>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            'flex-shrink-0 px-4 py-4 border-t border-neutral-200',
            collapsed && 'px-2'
          )}
        >
          {footer}
        </div>
      )}

      {/* Toggle button */}
      {onCollapsedChange && (
        <button
          onClick={() => onCollapsedChange(!collapsed)}
          className={cn(
            'absolute -right-3 bottom-6 w-6 h-6 bg-white border border-neutral-200 rounded-full',
            'flex items-center justify-center shadow-sm hover:shadow-md transition-shadow',
            'outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
            position === 'right' && '-left-3'
          )}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg
            className={cn(
              'w-4 h-4 text-neutral-600 transition-transform',
              collapsed && position === 'left' && 'rotate-180',
              !collapsed && position === 'right' && 'rotate-180'
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={position === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
            />
          </svg>
        </button>
      )}
    </aside>
  );
};

Sidebar.displayName = 'Sidebar';

export default Sidebar;
