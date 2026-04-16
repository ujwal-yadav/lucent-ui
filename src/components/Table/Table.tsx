import React, { ReactNode, useState } from 'react';
import { cn } from '../../utils/cn';

export interface Column<T> {
  /** Column key */
  key: string;

  /** Column header */
  header: string;

  /** Render function for cell content */
  render?: (item: T) => ReactNode;

  /** Whether column is sortable */
  sortable?: boolean;

  /** Width */
  width?: string;

  /** Sticky position (left or right) */
  sticky?: 'left' | 'right';
}

export interface TableProps<T = any> {
  /** Column definitions */
  columns: Column<T>[];

  /** Table data */
  data: T[];

  /** Row key extractor */
  getRowKey: (item: T) => string | number;

  /** Whether table is striped */
  striped?: boolean;

  /** Whether table has hover effect */
  hoverable?: boolean;

  /** Whether table has borders */
  bordered?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Additional className */
  className?: string;

  /** Callback when row is clicked */
  onRowClick?: (item: T) => void;

  /** Enable expandable rows */
  expandable?: boolean;

  /** Render function for expanded content */
  renderExpandedContent?: (item: T) => ReactNode;

  /** Default expanded row keys */
  defaultExpandedRowKeys?: (string | number)[];

  /** Controlled expanded row keys */
  expandedRowKeys?: (string | number)[];

  /** Callback when expanded rows change */
  onExpandedRowsChange?: (keys: (string | number)[]) => void;

  /** Enable pagination */
  pagination?: boolean;

  /** Default page size */
  defaultPageSize?: number;

  /** Page size options */
  pageSizeOptions?: number[];

  /** Current page (controlled) */
  currentPage?: number;

  /** Page size (controlled) */
  pageSize?: number;

  /** Callback when pagination changes */
  onPaginationChange?: (page: number, pageSize: number) => void;
}

export const Table = <T extends Record<string, any>>({
  columns,
  data,
  getRowKey,
  striped = false,
  hoverable = true,
  bordered = false,
  size = 'md',
  className,
  onRowClick,
  expandable = false,
  renderExpandedContent,
  defaultExpandedRowKeys = [],
  expandedRowKeys: controlledExpandedRowKeys,
  onExpandedRowsChange,
  pagination = false,
  defaultPageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  currentPage: controlledCurrentPage,
  pageSize: controlledPageSize,
  onPaginationChange,
}: TableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [internalExpandedRowKeys, setInternalExpandedRowKeys] =
    useState<(string | number)[]>(defaultExpandedRowKeys);
  const [internalCurrentPage, setInternalCurrentPage] = useState(1);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);

  // Use controlled or internal state for expansion
  const isExpandedControlled = controlledExpandedRowKeys !== undefined;
  const expandedRowKeys = isExpandedControlled
    ? controlledExpandedRowKeys
    : internalExpandedRowKeys;

  // Use controlled or internal state for pagination
  const isPaginationControlled =
    controlledCurrentPage !== undefined || controlledPageSize !== undefined;
  const currentPage = controlledCurrentPage ?? internalCurrentPage;
  const pageSize = controlledPageSize ?? internalPageSize;

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const toggleRowExpansion = (rowKey: string | number) => {
    const newExpandedKeys = expandedRowKeys.includes(rowKey)
      ? expandedRowKeys.filter((key) => key !== rowKey)
      : [...expandedRowKeys, rowKey];

    if (!isExpandedControlled) {
      setInternalExpandedRowKeys(newExpandedKeys);
    }
    onExpandedRowsChange?.(newExpandedKeys);
  };

  const isRowExpanded = (rowKey: string | number) => expandedRowKeys.includes(rowKey);

  const handlePageChange = (newPage: number) => {
    if (!isPaginationControlled) {
      setInternalCurrentPage(newPage);
    }
    onPaginationChange?.(newPage, pageSize);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    const newPage = 1; // Reset to first page when changing page size
    if (!isPaginationControlled) {
      setInternalPageSize(newPageSize);
      setInternalCurrentPage(newPage);
    }
    onPaginationChange?.(newPage, newPageSize);
  };

  const sortedData = sortKey
    ? [...data].sort((a, b) => {
        const aVal = a[sortKey];
        const bVal = b[sortKey];
        const order = sortOrder === 'asc' ? 1 : -1;
        return aVal > bVal ? order : aVal < bVal ? -order : 0;
      })
    : data;

  // Pagination logic
  const totalItems = sortedData.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedData = pagination ? sortedData.slice(startIndex, endIndex) : sortedData;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  // Helper function to parse width string to number
  const parseWidth = (width?: string): number => {
    if (!width) return 150; // Default width
    const match = width.match(/^(\d+(?:\.\d+)?)(px|rem|em)?$/);
    if (!match) return 150;
    const value = parseFloat(match[1]);
    const unit = match[2] || 'px';
    // Convert rem/em to px (assuming 1rem = 16px)
    if (unit === 'rem' || unit === 'em') {
      return value * 16;
    }
    return value;
  };

  // Calculate sticky column offsets
  const getStickyColumnStyle = (column: Column<T>, columnIndex: number) => {
    if (!column.sticky) return {};

    let offset = 0;

    // Add expand column width if sticky and expandable is enabled
    if (expandable && column.sticky === 'left') {
      offset += 48; // 12 * 4px = 48px (w-12)
    }

    // Calculate offset based on previous sticky columns
    if (column.sticky === 'left') {
      for (let i = 0; i < columnIndex; i++) {
        if (columns[i].sticky === 'left') {
          offset += parseWidth(columns[i].width);
        }
      }
    } else {
      // For right sticky columns, calculate from the right
      for (let i = columnIndex + 1; i < columns.length; i++) {
        if (columns[i].sticky === 'right') {
          offset += parseWidth(columns[i].width);
        }
      }
    }

    return {
      position: 'sticky' as const,
      [column.sticky]: `${offset}px`,
      zIndex: 10,
    };
  };

  return (
    <div className={cn('w-full', className)}>
      <div
        className={cn('w-full overflow-x-auto', bordered && 'border border-neutral-200 rounded-lg')}
      >
        <table className="w-full">
          <thead className="bg-neutral-50">
            <tr>
              {expandable && (
                <th
                  className={cn(
                    'text-left font-semibold text-neutral-700 w-12',
                    sizeStyles[size],
                    bordered && 'border-b border-neutral-200',
                    'bg-neutral-50'
                  )}
                  style={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 10,
                    boxShadow: 'inset -1px 0 0 0 rgb(212,212,212)',
                  }}
                />
              )}
              {columns.map((column, columnIndex) => {
                const stickyStyle = getStickyColumnStyle(column, columnIndex);

                // Always apply border to sticky columns using inset box-shadow for borders
                const styles: React.CSSProperties = {
                  width: column.width,
                  minWidth: column.width,
                  maxWidth: column.width,
                  ...stickyStyle,
                };

                if (column.sticky === 'left') {
                  // Right border for left sticky columns
                  styles.boxShadow =
                    '2px 0 4px -2px rgba(0,0,0,0.1), inset -1px 0 0 0 rgb(212,212,212)';
                } else if (column.sticky === 'right') {
                  // Left border for right sticky columns
                  styles.boxShadow =
                    '-2px 0 4px -2px rgba(0,0,0,0.1), inset 1px 0 0 0 rgb(212,212,212)';
                }

                return (
                  <th
                    key={column.key}
                    style={styles}
                    className={cn(
                      'text-left font-semibold text-neutral-700',
                      sizeStyles[size],
                      bordered && 'border-b border-neutral-200',
                      column.sortable && 'cursor-pointer hover:bg-neutral-100',
                      column.sticky && 'bg-neutral-50'
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <span className="break-words">{column.header}</span>
                      {column.sortable && (
                        <span className="text-neutral-400 flex-shrink-0">
                          {sortKey === column.key ? (sortOrder === 'asc' ? '↑' : '↓') : '↕'}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => {
              const rowKey = getRowKey(item);
              const expanded = isRowExpanded(rowKey);
              const isLastRow = index === paginatedData.length - 1;
              const isLastItem = isLastRow && !expanded;

              return (
                <React.Fragment key={rowKey}>
                  <tr
                    onClick={() => !expandable && onRowClick?.(item)}
                    className={cn(
                      striped && index % 2 === 1 && 'bg-neutral-50',
                      hoverable && 'hover:bg-neutral-100 transition-colors',
                      !expandable && onRowClick && 'cursor-pointer'
                    )}
                  >
                    {expandable && (
                      <td
                        className={cn(
                          sizeStyles[size],
                          bordered && !isLastItem && 'border-b border-neutral-200',
                          'cursor-pointer text-neutral-600 hover:text-primary-600',
                          striped && index % 2 === 1 ? 'bg-neutral-50' : 'bg-white'
                        )}
                        style={{
                          position: 'sticky',
                          left: 0,
                          zIndex: 10,
                          boxShadow: 'inset -1px 0 0 0 rgb(212,212,212)',
                        }}
                        onClick={() => toggleRowExpansion(rowKey)}
                      >
                        <svg
                          className={cn(
                            'w-5 h-5 transition-transform duration-200',
                            expanded && 'transform rotate-90'
                          )}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </td>
                    )}
                    {columns.map((column, columnIndex) => {
                      const stickyStyle = getStickyColumnStyle(column, columnIndex);

                      // Always apply border to sticky columns using inset box-shadow for borders
                      const styles: React.CSSProperties = {
                        width: column.width,
                        minWidth: column.width,
                        maxWidth: column.width,
                        ...stickyStyle,
                      };

                      if (column.sticky === 'left') {
                        // Right border for left sticky columns
                        styles.boxShadow =
                          '2px 0 4px -2px rgba(0,0,0,0.1), inset -1px 0 0 0 rgb(212,212,212)';
                      } else if (column.sticky === 'right') {
                        // Left border for right sticky columns
                        styles.boxShadow =
                          '-2px 0 4px -2px rgba(0,0,0,0.1), inset 1px 0 0 0 rgb(212,212,212)';
                      }

                      return (
                        <td
                          key={column.key}
                          style={styles}
                          className={cn(
                            sizeStyles[size],
                            bordered && !isLastItem && 'border-b border-neutral-200',
                            column.sticky &&
                              (striped && index % 2 === 1 ? 'bg-neutral-50' : 'bg-white')
                          )}
                        >
                          <div className="overflow-hidden break-words">
                            {column.render ? column.render(item) : item[column.key]}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                  {expandable && expanded && renderExpandedContent && (
                    <tr className={cn(striped && index % 2 === 1 && 'bg-neutral-50')}>
                      <td
                        colSpan={columns.length + 1}
                        className={cn(
                          'bg-neutral-50/50',
                          bordered && !isLastRow && 'border-b border-neutral-200',
                          sizeStyles[size]
                        )}
                      >
                        <div className="animate-fadeIn">{renderExpandedContent(item)}</div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && totalPages > 0 && (
        <div className="flex items-center justify-between px-4 py-3">
          {/* Rows per page */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600">Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className={cn(
                'h-10 px-3 text-sm rounded-lg border border-neutral-300',
                'bg-white text-neutral-900',
                'hover:border-neutral-400',
                'focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500',
                'cursor-pointer'
              )}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Page info and navigation */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-neutral-600">
              {startIndex + 1} - {endIndex} of {totalItems}
            </span>

            <div className="flex items-center gap-1">
              {/* Previous button */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-lg',
                  'text-neutral-600 hover:bg-neutral-100',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                  'transition-colors'
                )}
                aria-label="Previous page"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page numbers */}
              {getPageNumbers().map((page, idx) =>
                page === '...' ? (
                  <span
                    key={`ellipsis-${idx}`}
                    className="w-10 h-10 flex items-center justify-center text-neutral-600"
                  >
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page as number)}
                    className={cn(
                      'w-10 h-10 flex items-center justify-center rounded-lg text-sm font-medium',
                      'transition-colors',
                      currentPage === page
                        ? 'bg-primary-50 text-primary-600'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    )}
                  >
                    {page}
                  </button>
                )
              )}

              {/* Next button */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={cn(
                  'w-10 h-10 flex items-center justify-center rounded-lg',
                  'text-neutral-600 hover:bg-neutral-100',
                  'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
                  'transition-colors'
                )}
                aria-label="Next page"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
