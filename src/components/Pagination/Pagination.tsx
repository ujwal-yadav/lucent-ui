import React from 'react';
import { cn } from '../../utils/cn';

export interface PaginationProps {
  /** Current page */
  currentPage: number;

  /** Total number of pages */
  totalPages: number;

  /** Callback when page changes */
  onPageChange: (page: number) => void;

  /** Number of page buttons to show */
  siblingCount?: number;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Whether to show first/last buttons */
  showFirstLast?: boolean;

  /** Additional className */
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  siblingCount = 1,
  size = 'md',
  showFirstLast = false,
  className,
}) => {
  const sizeStyles = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSibling > 2;
    const shouldShowRightDots = rightSibling < totalPages - 1;

    if (!shouldShowLeftDots && !shouldShowRightDots) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (!shouldShowLeftDots && shouldShowRightDots) {
      for (let i = 1; i <= rightSibling; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    } else if (shouldShowLeftDots && !shouldShowRightDots) {
      pages.push(1);
      pages.push('...');
      for (let i = leftSibling; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      pages.push('...');
      for (let i = leftSibling; i <= rightSibling; i++) {
        pages.push(i);
      }
      pages.push('...');
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav className={cn('flex items-center gap-1', className)} aria-label="Pagination">
      {showFirstLast && (
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={cn(
            'rounded-lg border border-neutral-300 transition-colors duration-200',
            'hover:bg-neutral-50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeStyles[size]
          )}
          aria-label="First page"
        >
          ««
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={cn(
          'rounded-lg border border-neutral-300 transition-colors duration-200',
          'hover:bg-neutral-50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeStyles[size]
        )}
        aria-label="Previous page"
      >
        ‹
      </button>

      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className={cn('px-2', sizeStyles[size])}>
              ...
            </span>
          );
        }

        const pageNumber = page as number;
        const isActive = pageNumber === currentPage;

        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={cn(
              'rounded-lg border transition-colors duration-200',
              'hover:bg-neutral-50',
              sizeStyles[size],
              isActive
                ? 'bg-primary-500 text-white border-primary-500 hover:bg-primary-600'
                : 'border-neutral-300'
            )}
            aria-label={`Page ${pageNumber}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={cn(
          'rounded-lg border border-neutral-300 transition-colors duration-200',
          'hover:bg-neutral-50',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          sizeStyles[size]
        )}
        aria-label="Next page"
      >
        ›
      </button>

      {showFirstLast && (
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={cn(
            'rounded-lg border border-neutral-300 transition-colors duration-200',
            'hover:bg-neutral-50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            sizeStyles[size]
          )}
          aria-label="Last page"
        >
          »»
        </button>
      )}
    </nav>
  );
};

export default Pagination;
