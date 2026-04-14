import { useState, useRef, useEffect, forwardRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '../../utils/cn';
import { FilterPillProps, FilterOption } from './FilterPill.types';
import { ChevronDownIcon, SearchIcon } from '../Icon';

export const FilterPill = forwardRef<HTMLDivElement, FilterPillProps>(
  (
    {
      label,
      options: initialOptions,
      onApply,
      onClear,
      searchable = false,
      searchPlaceholder = 'Search',
      icon,
      isOpen: controlledIsOpen,
      onOpenChange,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<FilterOption[]>(initialOptions);
    const [searchQuery, setSearchQuery] = useState('');
    const [appliedCount, setAppliedCount] = useState(0);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    const isControlled = controlledIsOpen !== undefined;
    const open = isControlled ? controlledIsOpen : isOpen;

    const handleOpenChange = (newOpen: boolean) => {
      if (!isControlled) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    // Update internal options when initialOptions change
    useEffect(() => {
      setOptions(initialOptions);
      // Initialize applied count based on initially checked options
      const initialCheckedCount = initialOptions.filter((opt) => opt.checked).length;
      setAppliedCount(initialCheckedCount);
    }, [initialOptions]);

    // Close on outside click
    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          handleOpenChange(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    // ESC key to close
    useEffect(() => {
      if (!open) return;

      const handleEsc = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          handleOpenChange(false);
        }
      };

      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }, [open]);

    const handleToggle = () => {
      handleOpenChange(!open);
      if (!open) {
        setSearchQuery('');
      }
    };

    const handleCheckboxChange = (value: string) => {
      setOptions((prev) =>
        prev.map((opt) => (opt.value === value ? { ...opt, checked: !opt.checked } : opt))
      );
    };

    const handleClear = () => {
      setOptions((prev) => prev.map((opt) => ({ ...opt, checked: false })));
      setSearchQuery('');
      setAppliedCount(0);
      onClear?.();
    };

    const handleApply = () => {
      const selectedValues = options.filter((opt) => opt.checked).map((opt) => opt.value);
      setAppliedCount(selectedValues.length);
      onApply?.(selectedValues);
      handleOpenChange(false);
      setSearchQuery('');
    };

    const filteredOptions = searchable
      ? options.filter((opt) => opt.label.toLowerCase().includes(searchQuery.toLowerCase()))
      : options;

    // Check if any items are currently selected
    const hasSelection = options.some((opt) => opt.checked);

    // Virtual list configuration with dynamic sizing for variable-height items
    const rowVirtualizer = useVirtualizer({
      count: filteredOptions.length,
      getScrollElement: () => parentRef.current,
      estimateSize: (index) => {
        // Estimate height based on label length for better virtualization
        const label = filteredOptions[index]?.label || '';
        const estimatedLines = Math.ceil(label.length / 50); // ~50 chars per line
        return Math.max(40, estimatedLines * 20 + 20); // 20px per line + 20px padding
      },
      overscan: 5,
      measureElement:
        typeof window !== 'undefined' && navigator.userAgent.indexOf('Firefox') === -1
          ? (element) => element?.getBoundingClientRect().height
          : undefined,
    });

    return (
      <div ref={ref} className={cn('relative inline-block', className)}>
        {/* Pill Button */}
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className={cn(
            'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-pill',
            'bg-white shadow-border',
            'hover:shadow-border-light hover:bg-gray-50',
            'transition-all duration-200',
            'focus-visible:shadow-[rgba(0,0,0,0.08)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
            open && 'shadow-[rgba(0,0,0,0.12)_0px_0px_0px_1px] bg-gray-50'
          )}
        >
          {icon && (
            <span className="w-3.5 h-3.5 flex items-center justify-center text-gray-600">
              {icon}
            </span>
          )}
          <span className="text-sm font-medium text-neutral-900">{label}</span>
          {appliedCount > 0 && (
            <span className="flex items-center justify-center min-w-[18px] h-[18px] px-1.5 text-xs font-semibold text-white bg-primary-500 rounded-full">
              {appliedCount}
            </span>
          )}
          <span className={cn('transition-transform duration-200', open && 'rotate-180')}>
            <ChevronDownIcon size="xs" color="gray" />
          </span>
        </button>

        {/* Dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className={cn(
              'absolute top-full left-0 mt-2 w-80 bg-white rounded-md',
              'shadow-card',
              'z-50 overflow-hidden',
              'animate-slideDown'
            )}
          >
            {/* Search Input */}
            {searchable && (
              <div className="p-3">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none text-gray-500">
                    <SearchIcon size="sm" />
                  </div>
                  <input
                    type="text"
                    placeholder={searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={cn(
                      'w-full pl-10 pr-3 py-2 rounded-md',
                      'bg-white shadow-border',
                      'text-sm text-neutral-900 placeholder:text-gray-400',
                      'focus-visible:shadow-[rgba(0,0,0,0.08)_0px_0px_0px_1px,_0_0_0_2px_#3535F3]',
                      'transition-all duration-200'
                    )}
                  />
                </div>
              </div>
            )}

            {/* Options List - Virtualized */}
            <div ref={parentRef} className="max-h-64 overflow-y-auto select-scrollbar">
              {filteredOptions.length === 0 ? (
                <div className="py-8 text-center text-sm text-gray-400">No options found</div>
              ) : (
                <div
                  style={{
                    height: `${rowVirtualizer.getTotalSize()}px`,
                    width: '100%',
                    position: 'relative',
                  }}
                >
                  {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                    const option = filteredOptions[virtualRow.index];
                    return (
                      <label
                        key={option.value}
                        data-index={virtualRow.index}
                        ref={rowVirtualizer.measureElement}
                        className={cn(
                          'flex items-start gap-2.5 px-4 py-2.5 cursor-pointer',
                          'hover:bg-gray-50 transition-colors duration-150',
                          'absolute top-0 left-0 w-full'
                        )}
                        style={{
                          transform: `translateY(${virtualRow.start}px)`,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={option.checked || false}
                          onChange={() => handleCheckboxChange(option.value)}
                          className={cn(
                            'w-4 h-4 rounded border-2 cursor-pointer flex-shrink-0 mt-0.5',
                            'bg-white',
                            'focus-visible:shadow-[0_0_0_2px_#3535F3]',
                            'transition-all duration-150',
                            '[--tw-checkbox-color:#3535F3]',
                            option.checked
                              ? 'border-[#3535F3] bg-[#3535F3] [&:checked]:bg-[#3535F3]'
                              : 'border-gray-400 hover:border-[#3535F3]'
                          )}
                          style={{
                            accentColor: '#3535F3',
                          }}
                        />
                        <span
                          className={cn(
                            'text-sm flex-1 transition-colors duration-150 break-words',
                            option.checked
                              ? 'text-neutral-900 font-medium'
                              : 'text-gray-600 font-normal'
                          )}
                        >
                          {option.label}
                        </span>
                      </label>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div
              className="flex items-center justify-between gap-3 px-4 py-3"
              style={{ boxShadow: 'rgba(0, 0, 0, 0.08) 0px -1px 0px' }}
            >
              <button
                type="button"
                onClick={handleClear}
                disabled={!hasSelection}
                className={cn(
                  'px-1 py-1.5 text-sm font-medium',
                  'transition-colors duration-150',
                  hasSelection
                    ? 'text-gray-600 hover:text-neutral-900 focus-visible:outline-none focus-visible:text-neutral-900 cursor-pointer'
                    : 'text-gray-400 cursor-not-allowed'
                )}
              >
                Clear All
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={!hasSelection}
                className={cn(
                  'h-8 px-4 rounded-md text-sm font-medium',
                  'transition-all duration-200',
                  hasSelection
                    ? 'bg-[#3535F3] text-white hover:bg-[#2a2ac2] focus-visible:shadow-[0_0_0_2px_#3535F3] cursor-pointer'
                    : 'bg-gray-400 text-gray-100 cursor-not-allowed'
                )}
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

FilterPill.displayName = 'FilterPill';

export default FilterPill;
