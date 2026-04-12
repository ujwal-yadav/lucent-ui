import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  /** Label for breadcrumb item */
  label: string;

  /** URL for breadcrumb item */
  href?: string;

  /** Icon to display before label */
  icon?: ReactNode;
}

export interface BreadcrumbProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];

  /** Custom separator */
  separator?: ReactNode;

  /** Callback when breadcrumb is clicked */
  onItemClick?: (item: BreadcrumbItem, index: number) => void;

  /** Additional className */
  className?: string;

  /** Max items to show before collapsing */
  maxItems?: number;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  onItemClick,
  className,
  maxItems,
}) => {
  const renderSeparator = () => (
    <span className="mx-2 text-neutral-400" aria-hidden="true">
      {separator}
    </span>
  );

  const renderItem = (item: BreadcrumbItem, index: number, isLast: boolean) => {
    const handleClick = (e: React.MouseEvent) => {
      if (onItemClick) {
        e.preventDefault();
        onItemClick(item, index);
      }
    };

    const content = (
      <>
        {item.icon && <span className="mr-1.5 inline-flex">{item.icon}</span>}
        {item.label}
      </>
    );

    if (isLast) {
      return (
        <span className="text-neutral-900 font-medium" aria-current="page">
          {content}
        </span>
      );
    }

    if (item.href) {
      return (
        <a
          href={item.href}
          onClick={handleClick}
          className={cn(
            'text-neutral-600 hover:text-neutral-900 transition-colors duration-200',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded',
            'inline-flex items-center'
          )}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        type="button"
        onClick={handleClick}
        className={cn(
          'text-neutral-600 hover:text-neutral-900 transition-colors duration-200',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded',
          'inline-flex items-center'
        )}
      >
        {content}
      </button>
    );
  };

  const renderCollapsedItems = () => {
    if (!maxItems || items.length <= maxItems) {
      return items.map((item, index) => (
        <li key={index} className="inline-flex items-center">
          {renderItem(item, index, index === items.length - 1)}
          {index < items.length - 1 && renderSeparator()}
        </li>
      ));
    }

    // Show first item, ellipsis, and last few items
    const firstItem = items[0];
    const lastItems = items.slice(-(maxItems - 1));
    const hiddenItems = items.slice(1, -(maxItems - 1));

    return (
      <>
        <li className="inline-flex items-center">
          {renderItem(firstItem, 0, false)}
          {renderSeparator()}
        </li>
        {hiddenItems.length > 0 && (
          <li className="inline-flex items-center">
            <button
              type="button"
              className={cn(
                'text-neutral-600 hover:text-neutral-900 transition-colors duration-200',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded',
                'px-2'
              )}
              aria-label={`Show ${hiddenItems.length} more items`}
            >
              ...
            </button>
            {renderSeparator()}
          </li>
        )}
        {lastItems.map((item, index) => {
          const actualIndex = items.length - lastItems.length + index;
          return (
            <li key={actualIndex} className="inline-flex items-center">
              {renderItem(item, actualIndex, actualIndex === items.length - 1)}
              {actualIndex < items.length - 1 && renderSeparator()}
            </li>
          );
        })}
      </>
    );
  };

  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="inline-flex items-center">{renderCollapsedItems()}</ol>
    </nav>
  );
};

export default Breadcrumb;
