import React, {
  useRef,
  useState,
  useMemo,
  useCallback,
  useEffect,
  useId,
  forwardRef,
  memo,
} from 'react';
import { SelectProps, SelectOption } from './Select.types';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useControllableState } from '../../hooks/useControllableState';
import { cn } from '../../utils/cn';
import { Portal } from '../../utils/Portal';

// Icons as inline SVGs to avoid external dependencies
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M4 6L8 10L12 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M12 4L4 12M4 4L12 12"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M13 4L6 11L3 8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const LoadingIcon = ({ className }: { className?: string }) => (
  <svg
    className={cn('animate-spin', className)}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 2V4M8 12V14M14 8H12M4 8H2M12.364 12.364L11.05 11.05M4.95 4.95L3.636 3.636M12.364 3.636L11.05 4.95M4.95 11.05L3.636 12.364"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onChange,
      options,
      placeholder = 'Select an option...',
      disabled = false,
      error = false,
      multiple = false,
      searchable = false,
      onSearch,
      loading = false,
      clearable = false,
      size = 'md',
      variant = 'default',
      maxHeight = 300,
      virtualized: _virtualized = false,
      renderValue,
      renderOption,
      className,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      name,
      required = false,
      id: customId,
      emptyMessage = 'No options found',
      loadingMessage = 'Loading...',
      portal = true,
      onOpen,
      onClose,
      position = 'auto',
    },
    _ref
  ) => {
    // Generate unique IDs for accessibility
    const generatedId = useId();
    const id = customId || generatedId;
    const listboxId = `${id}-listbox`;
    const searchInputId = `${id}-search`;

    // State management
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

    type ValueType = string | string[] | null;
    const [value, setValue] = useControllableState<ValueType>(
      (defaultValue ?? (multiple ? [] : null)) as ValueType,
      controlledValue as ValueType | undefined,
      onChange as ((value: ValueType) => void) | undefined
    );

    // Refs
    const containerRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Click outside to close
    useClickOutside(containerRef, () => {
      if (isOpen) {
        closeDropdown();
      }
    });

    // Filter options based on search query
    const filteredOptions = useMemo(() => {
      if (!searchQuery) return options;

      const query = searchQuery.toLowerCase();
      return options.filter(
        (option) =>
          option.label.toLowerCase().includes(query) ||
          option.description?.toLowerCase().includes(query)
      );
    }, [options, searchQuery]);

    // Group options if they have a group property
    const groupedOptions = useMemo(() => {
      const groups: Record<string, SelectOption[]> = {};
      const ungrouped: SelectOption[] = [];

      filteredOptions.forEach((option) => {
        if (option.group) {
          if (!groups[option.group]) {
            groups[option.group] = [];
          }
          groups[option.group].push(option);
        } else {
          ungrouped.push(option);
        }
      });

      return { groups, ungrouped };
    }, [filteredOptions]);

    // Check if an option is selected
    const isSelected = useCallback(
      (optionValue: string) => {
        if (multiple) {
          return Array.isArray(value) && value.includes(optionValue);
        }
        return value === optionValue;
      },
      [value, multiple]
    );

    // Get selected options
    const selectedOptions = useMemo(() => {
      if (multiple && Array.isArray(value)) {
        return options.filter((opt) => value.includes(opt.value));
      }
      return options.filter((opt) => opt.value === value);
    }, [value, options, multiple]);

    // Select an option
    const selectOption = useCallback(
      (option: SelectOption) => {
        if (option.disabled) return;

        if (multiple) {
          const currentValues = Array.isArray(value) ? value : [];
          const isAlreadySelected = currentValues.includes(option.value);

          if (isAlreadySelected) {
            setValue(currentValues.filter((v) => v !== option.value));
          } else {
            setValue([...currentValues, option.value]);
          }
        } else {
          setValue(option.value);
          closeDropdown();
        }
      },
      [multiple, value, setValue]
    );

    // Remove a selected option (multi-select only)
    const removeOption = useCallback(
      (optionValue: string) => {
        if (multiple && Array.isArray(value)) {
          setValue(value.filter((v) => v !== optionValue));
        }
      },
      [multiple, value, setValue]
    );

    // Clear all selections
    const clearSelection = useCallback(() => {
      setValue(multiple ? [] : null);
    }, [multiple, setValue]);

    // Update dropdown position for portal
    const updateDropdownPosition = useCallback(() => {
      if (!triggerRef.current || !portal) return;

      const rect = triggerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollLeft = window.scrollX || document.documentElement.scrollLeft;

      let top = 0;

      if (position === 'top') {
        top = rect.top + scrollTop - 8;
      } else if (position === 'bottom') {
        top = rect.bottom + scrollTop + 8;
      } else {
        // auto: check if there's enough space below
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        if (spaceBelow >= 300 || spaceBelow > spaceAbove) {
          top = rect.bottom + scrollTop + 8;
        } else {
          top = rect.top + scrollTop - 8;
        }
      }

      setDropdownPosition({
        top,
        left: rect.left + scrollLeft,
        width: rect.width,
      });
    }, [portal, position]);

    // Open/close dropdown
    const openDropdown = useCallback(() => {
      if (disabled) return;
      updateDropdownPosition();
      setIsOpen(true);
      setHighlightedIndex(0);
      onOpen?.();
    }, [disabled, onOpen, updateDropdownPosition]);

    const closeDropdown = useCallback(() => {
      setIsOpen(false);
      setSearchQuery('');
      onClose?.();
    }, [onClose]);

    const toggleDropdown = useCallback(() => {
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    }, [isOpen, openDropdown, closeDropdown]);

    // Update position when dropdown opens or on scroll/resize
    useEffect(() => {
      if (isOpen && portal) {
        updateDropdownPosition();
        window.addEventListener('scroll', updateDropdownPosition, true);
        window.addEventListener('resize', updateDropdownPosition);
        return () => {
          window.removeEventListener('scroll', updateDropdownPosition, true);
          window.removeEventListener('resize', updateDropdownPosition);
        };
      }
    }, [isOpen, portal, updateDropdownPosition]);

    // Focus search input when dropdown opens
    useEffect(() => {
      if (isOpen && searchable && searchInputRef.current) {
        // Small delay to ensure the input is rendered
        setTimeout(() => {
          searchInputRef.current?.focus();
        }, 0);
      }
    }, [isOpen, searchable]);

    // Scroll highlighted option into view
    useEffect(() => {
      if (isOpen && listboxRef.current) {
        const highlightedElement = listboxRef.current.querySelector(
          `[data-index="${highlightedIndex}"]`
        );
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: 'nearest',
            behavior: 'smooth',
          });
        }
      }
    }, [highlightedIndex, isOpen]);

    // Keyboard navigation
    const handleKeyDown = useCallback(
      (event: React.KeyboardEvent) => {
        if (disabled) return;

        // If dropdown is closed
        if (!isOpen) {
          if (
            event.key === 'Enter' ||
            event.key === ' ' ||
            event.key === 'ArrowDown' ||
            event.key === 'ArrowUp'
          ) {
            event.preventDefault();
            openDropdown();
          }
          return;
        }

        // If dropdown is open
        const maxIndex = filteredOptions.length - 1;

        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault();
            setHighlightedIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
            break;

          case 'ArrowUp':
            event.preventDefault();
            setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
            break;

          case 'Home':
            event.preventDefault();
            setHighlightedIndex(0);
            break;

          case 'End':
            event.preventDefault();
            setHighlightedIndex(maxIndex);
            break;

          case 'Enter':
          case ' ':
            event.preventDefault();
            if (filteredOptions[highlightedIndex]) {
              selectOption(filteredOptions[highlightedIndex]);
            }
            break;

          case 'Escape':
            event.preventDefault();
            closeDropdown();
            triggerRef.current?.focus();
            break;

          case 'Tab':
            closeDropdown();
            break;

          default:
            // Type-ahead search (if not searchable with input)
            if (!searchable && event.key.length === 1) {
              const char = event.key.toLowerCase();
              const startIndex = (highlightedIndex + 1) % filteredOptions.length;

              for (let i = 0; i < filteredOptions.length; i++) {
                const index = (startIndex + i) % filteredOptions.length;
                const option = filteredOptions[index];

                if (option.label.toLowerCase().startsWith(char)) {
                  setHighlightedIndex(index);
                  break;
                }
              }
            }
            break;
        }
      },
      [
        disabled,
        isOpen,
        filteredOptions,
        highlightedIndex,
        searchable,
        openDropdown,
        closeDropdown,
        selectOption,
      ]
    );

    // Handle search input
    const handleSearchChange = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        setHighlightedIndex(0);
        onSearch?.(query);
      },
      [onSearch]
    );

    // Size styles
    const sizeStyles = {
      sm: {
        trigger: 'h-8 text-sm px-2 gap-1',
        option: 'px-2 py-1 text-sm',
        tag: 'text-xs px-1.5 py-0.5',
        icon: 'w-3 h-3',
      },
      md: {
        trigger: 'h-10 text-base px-3 gap-2',
        option: 'px-3 py-2 text-base',
        tag: 'text-sm px-2 py-1',
        icon: 'w-4 h-4',
      },
      lg: {
        trigger: 'h-12 text-lg px-4 gap-2',
        option: 'px-4 py-3 text-lg',
        tag: 'text-base px-2.5 py-1',
        icon: 'w-5 h-5',
      },
    };

    // Variant styles
    const variantStyles = {
      default: cn(
        'bg-white border-neutral-300',
        'hover:border-primary-400',
        'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
        error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
      ),
      outline: cn(
        'bg-transparent border-neutral-400',
        'hover:border-primary-500 hover:bg-neutral-50',
        'focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
        error && 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
      ),
      filled: cn(
        'bg-neutral-100 border-transparent',
        'hover:bg-neutral-200',
        'focus:bg-white focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
        error && 'bg-danger-50 focus:border-danger-500 focus:ring-danger-100'
      ),
    };

    // Render selected value(s)
    const renderSelectedValue = () => {
      if (renderValue && value !== null) {
        return renderValue(value as string | string[], options);
      }

      if (multiple && Array.isArray(value) && value.length > 0) {
        return (
          <div className="flex flex-wrap gap-1 flex-1 min-w-0">
            {selectedOptions.map((option) => (
              <span
                key={String(option.value)}
                className={cn(
                  'inline-flex items-center gap-1 rounded bg-primary-100 text-primary-700',
                  'border border-primary-200',
                  'max-w-full',
                  sizeStyles[size].tag
                )}
              >
                <span className="truncate">{option.label}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeOption(option.value);
                  }}
                  className={cn(
                    'inline-flex items-center justify-center rounded',
                    'hover:bg-primary-200 focus:outline-none focus:ring-1 focus:ring-primary-500',
                    'transition-colors'
                  )}
                  aria-label={`Remove ${option.label}`}
                  tabIndex={-1}
                >
                  <CloseIcon className={sizeStyles[size].icon} />
                </button>
              </span>
            ))}
          </div>
        );
      }

      if (!multiple && value !== null) {
        const selected = selectedOptions[0];
        return selected ? (
          <span className="truncate">{selected.label}</span>
        ) : (
          <span className="text-neutral-400">{placeholder}</span>
        );
      }

      return <span className="text-neutral-400">{placeholder}</span>;
    };

    // Render an option
    const renderOptionItem = (option: SelectOption, index: number) => {
      const selected = isSelected(option.value);
      const highlighted = index === highlightedIndex;

      if (renderOption) {
        return (
          <li
            key={String(option.value)}
            role="option"
            aria-selected={selected}
            aria-disabled={option.disabled}
            data-index={index}
            onClick={() => selectOption(option)}
            className={cn(
              'cursor-pointer select-none transition-colors',
              sizeStyles[size].option,
              highlighted && 'bg-primary-50',
              selected && 'bg-primary-100 text-primary-900 font-medium',
              option.disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {renderOption(option, selected)}
          </li>
        );
      }

      return (
        <li
          key={String(option.value)}
          role="option"
          aria-selected={selected}
          aria-disabled={option.disabled}
          data-index={index}
          onClick={() => !option.disabled && selectOption(option)}
          className={cn(
            'flex items-center gap-2 cursor-pointer select-none transition-colors rounded-md',
            sizeStyles[size].option,
            highlighted && 'bg-primary-50',
            selected && 'bg-primary-100 text-primary-900 font-medium',
            option.disabled && 'opacity-50 cursor-not-allowed'
          )}
        >
          {multiple && (
            <div
              className={cn(
                'flex items-center justify-center w-4 h-4 border-2 rounded',
                selected ? 'bg-primary-500 border-primary-500' : 'border-neutral-300'
              )}
            >
              {selected && <CheckIcon className="w-3 h-3 text-white" />}
            </div>
          )}
          {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
          <div className="flex-1 min-w-0">
            <div className="truncate">{option.label}</div>
            {option.description && (
              <div className="text-xs text-neutral-500 truncate">{option.description}</div>
            )}
          </div>
          {!multiple && selected && (
            <CheckIcon className={cn('text-primary-600', sizeStyles[size].icon)} />
          )}
        </li>
      );
    };

    // Render options list
    const renderOptions = () => {
      if (loading) {
        return (
          <div className="flex items-center justify-center py-8 text-neutral-500">
            <LoadingIcon className="w-5 h-5 mr-2" />
            <span>{loadingMessage}</span>
          </div>
        );
      }

      if (filteredOptions.length === 0) {
        return (
          <div className="flex items-center justify-center py-8 text-neutral-500">
            {emptyMessage}
          </div>
        );
      }

      // Render with groups
      if (Object.keys(groupedOptions.groups).length > 0) {
        let currentIndex = 0;

        return (
          <>
            {groupedOptions.ungrouped.length > 0 && (
              <div>
                {groupedOptions.ungrouped.map((option) => renderOptionItem(option, currentIndex++))}
              </div>
            )}
            {Object.entries(groupedOptions.groups).map(([groupName, groupOpts]) => (
              <div key={groupName}>
                <div className="px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider bg-neutral-50">
                  {groupName}
                </div>
                {groupOpts.map((option) => renderOptionItem(option, currentIndex++))}
              </div>
            ))}
          </>
        );
      }

      // Render without groups
      return filteredOptions.map((option, index) => renderOptionItem(option, index));
    };

    const hasValue = multiple
      ? Array.isArray(value) && value.length > 0
      : value !== null && value !== undefined;

    return (
      <div ref={containerRef} className={cn('relative inline-block w-full', className)}>
        {/* Hidden input for form submission */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={multiple && Array.isArray(value) ? value.join(',') : String(value ?? '')}
            required={required}
          />
        )}

        {/* Trigger button */}
        <button
          ref={triggerRef}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={ariaDescribedBy}
          aria-disabled={disabled}
          disabled={disabled}
          onClick={toggleDropdown}
          onKeyDown={handleKeyDown}
          className={cn(
            'inline-flex items-center justify-between w-full',
            'border rounded-lg transition-all duration-200',
            'focus:outline-none',
            sizeStyles[size].trigger,
            variantStyles[variant],
            disabled && 'opacity-50 cursor-not-allowed',
            isOpen && 'ring-2 ring-primary-100 border-primary-500'
          )}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">{renderSelectedValue()}</div>

          <div className="flex items-center gap-1 flex-shrink-0">
            {loading && <LoadingIcon className={sizeStyles[size].icon} />}
            {clearable && hasValue && !loading && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearSelection();
                }}
                className={cn(
                  'inline-flex items-center justify-center rounded p-0.5',
                  'hover:bg-neutral-200 focus:outline-none focus:ring-1 focus:ring-primary-500',
                  'transition-colors'
                )}
                aria-label="Clear selection"
                tabIndex={-1}
              >
                <CloseIcon className={sizeStyles[size].icon} />
              </button>
            )}
            <ChevronDownIcon
              className={cn(
                'transition-transform duration-200',
                sizeStyles[size].icon,
                isOpen && 'transform rotate-180'
              )}
            />
          </div>
        </button>

        {/* Dropdown */}
        {isOpen &&
          (portal ? (
            <Portal>
              <div
                className={cn(
                  'fixed z-50 bg-white border border-neutral-200 rounded-lg shadow-lg',
                  'animate-slideDown'
                )}
                style={{
                  top: `${dropdownPosition.top}px`,
                  left: `${dropdownPosition.left}px`,
                  width: `${dropdownPosition.width}px`,
                  maxHeight: `${maxHeight}px`,
                }}
              >
                {/* Search input */}
                {searchable && (
                  <div className="sticky top-0 bg-white border-b border-neutral-200 p-2 z-10">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                      <input
                        ref={searchInputRef}
                        id={searchInputId}
                        type="text"
                        role="searchbox"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className={cn(
                          'w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-md',
                          'focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500',
                          'text-sm'
                        )}
                        aria-label="Search options"
                        aria-controls={listboxId}
                      />
                    </div>
                  </div>
                )}

                {/* Options list */}
                <ul
                  ref={listboxRef}
                  id={listboxId}
                  role="listbox"
                  aria-label={ariaLabel || 'Options'}
                  aria-multiselectable={multiple}
                  tabIndex={-1}
                  className="overflow-y-auto p-1"
                  style={{ maxHeight: searchable ? maxHeight - 60 : maxHeight }}
                >
                  {renderOptions()}
                </ul>
              </div>
            </Portal>
          ) : (
            <div
              className={cn(
                'absolute z-50 w-full mt-1',
                'bg-white border border-neutral-200 rounded-lg shadow-lg',
                'animate-slideDown',
                position === 'top' && 'bottom-full mb-1 mt-0'
              )}
              style={{ maxHeight: `${maxHeight}px` }}
            >
              {/* Search input */}
              {searchable && (
                <div className="sticky top-0 bg-white border-b border-neutral-200 p-2 z-10">
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                    <input
                      ref={searchInputRef}
                      id={searchInputId}
                      type="text"
                      role="searchbox"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={handleSearchChange}
                      className={cn(
                        'w-full pl-9 pr-3 py-2 border border-neutral-300 rounded-md',
                        'focus:outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-500',
                        'text-sm'
                      )}
                      aria-label="Search options"
                      aria-controls={listboxId}
                    />
                  </div>
                </div>
              )}

              {/* Options list */}
              <ul
                ref={listboxRef}
                id={listboxId}
                role="listbox"
                aria-label={ariaLabel || 'Options'}
                aria-multiselectable={multiple}
                tabIndex={-1}
                className="overflow-y-auto p-1"
                style={{ maxHeight: searchable ? maxHeight - 60 : maxHeight }}
              >
                {renderOptions()}
              </ul>
            </div>
          ))}
      </div>
    );
  }
);

Select.displayName = 'Select';

// Memoized export for performance
export default memo(Select);
