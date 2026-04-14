import { useState, useRef, useEffect, ReactNode } from 'react';
import { cn } from '../../utils/cn';
import { ChevronDownIcon, CalendarIcon } from '../Icon';

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export interface DateFilterPillProps {
  /** Label for the filter pill */
  label: string;

  /** Selected start date */
  startDate?: string | Date | null;

  /** Selected end date */
  endDate?: string | Date | null;

  /** Callback when dates are applied */
  onApply?: (startDate: string | null, endDate: string | null) => void;

  /** Callback when dates are cleared */
  onClear?: () => void;

  /** Minimum selectable date */
  minDate?: string | Date;

  /** Maximum selectable date */
  maxDate?: string | Date;

  /** Custom icon */
  icon?: ReactNode;

  /** Whether to enable date range selection */
  enableRange?: boolean;

  /** Additional className */
  className?: string;
}

export const DateFilterPill: React.FC<DateFilterPillProps> = ({
  label,
  startDate: initialStartDate,
  endDate: initialEndDate,
  onApply,
  onClear,
  minDate,
  maxDate,
  icon,
  enableRange = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(
    initialStartDate ? new Date(initialStartDate) : null
  );
  const [endDate, setEndDate] = useState<Date | null>(
    initialEndDate ? new Date(initialEndDate) : null
  );
  const [viewDate, setViewDate] = useState<Date>(startDate || new Date());
  const [selectingEnd, setSelectingEnd] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Format date for display
  const formatDate = (date: Date): string => {
    const month = MONTHS[date.getMonth()].slice(0, 3);
    const day = date.getDate();
    return `${month} ${day}`;
  };

  // Check if date is disabled
  const isDateDisabled = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];

    if (minDate && date < new Date(minDate)) return true;
    if (maxDate && date > new Date(maxDate)) return true;

    return false;
  };

  // Check if date is in range
  const isDateInRange = (date: Date): boolean => {
    if (!enableRange || !startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  // Check if date is selected
  const isDateSelected = (date: Date): boolean => {
    const dateStr = date.toISOString().split('T')[0];
    if (startDate && dateStr === startDate.toISOString().split('T')[0]) return true;
    if (endDate && dateStr === endDate.toISOString().split('T')[0]) return true;
    return false;
  };

  // Check if date is today
  const isToday = (date: Date): boolean => {
    const today = new Date();
    return date.toISOString().split('T')[0] === today.toISOString().split('T')[0];
  };

  // Get calendar days for current view
  const getCalendarDays = (): (Date | null)[] => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days: (Date | null)[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  // Handle date selection
  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date)) return;

    if (enableRange) {
      if (!startDate || selectingEnd) {
        setStartDate(date);
        setEndDate(null);
        setSelectingEnd(false);
      } else {
        if (date >= startDate) {
          setEndDate(date);
        } else {
          setEndDate(startDate);
          setStartDate(date);
        }
        setSelectingEnd(true);
      }
    } else {
      setStartDate(date);
    }
  };

  // Navigate months
  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Handle clear
  const handleClear = () => {
    setStartDate(null);
    setEndDate(null);
    setSelectingEnd(false);
    onClear?.();
  };

  // Handle apply
  const handleApply = () => {
    const start = startDate?.toISOString().split('T')[0] || null;
    const end = endDate?.toISOString().split('T')[0] || null;
    onApply?.(start, end);
    setIsOpen(false);
  };

  const hasSelection = startDate !== null;
  const calendarDays = getCalendarDays();

  const displayLabel = () => {
    if (!startDate) return label;
    if (enableRange && endDate) {
      return `${formatDate(startDate)} - ${formatDate(endDate)}`;
    }
    return formatDate(startDate);
  };

  return (
    <div className={cn('relative inline-block', className)}>
      {/* Pill Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={handleToggle}
        className={cn(
          'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md',
          'bg-white border',
          'hover:bg-gray-50',
          'transition-all duration-200 outline-none',
          open && 'bg-gray-50'
        )}
      >
        {icon || (
          <span className="w-3.5 h-3.5 flex items-center justify-center text-gray-600">
            <CalendarIcon size="xs" />
          </span>
        )}
        <span className="text-sm font-medium text-neutral-900">{displayLabel()}</span>
        <span className={cn('transition-transform duration-200', isOpen && 'rotate-180')}>
          <ChevronDownIcon size="xs" color="gray" />
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={cn(
            'absolute top-full left-0 mt-2 w-72 bg-white rounded-md',
            'shadow-card',
            'z-50 overflow-hidden',
            'animate-slideDown'
          )}
        >
          {/* Month/Year Header */}
          <div className="flex items-center justify-between mb-4 px-4 pt-4">
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-gray-50 rounded-md transition-colors"
              aria-label="Previous month"
            >
              <ChevronDownIcon size="sm" className="rotate-90" />
            </button>
            <div className="font-semibold text-neutral-900">
              {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
            </div>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-gray-50 rounded-md transition-colors"
              aria-label="Next month"
            >
              <ChevronDownIcon size="sm" className="-rotate-90" />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2 px-4">
            {DAYS.map((day) => (
              <div
                key={day}
                className="text-xs font-medium text-gray-500 text-center h-8 flex items-center justify-center"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 px-4 pb-4">
            {calendarDays.map((date, index) => {
              if (!date) {
                return <div key={`empty-${index}`} className="h-8" />;
              }

              const disabled = isDateDisabled(date);
              const selected = isDateSelected(date);
              const inRange = isDateInRange(date);
              const today = isToday(date);

              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  onClick={() => handleDateSelect(date)}
                  disabled={disabled}
                  className={cn(
                    'h-8 w-full rounded-md text-sm font-medium transition-colors',
                    'hover:bg-gray-50',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
                    selected && 'bg-primary-500 text-white hover:bg-primary-600',
                    inRange && !selected && 'bg-primary-100',
                    !selected && today && 'border border-primary-500 text-primary-600',
                    disabled && 'opacity-40 cursor-not-allowed hover:bg-transparent',
                    !selected && !disabled && !inRange && 'text-neutral-900'
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClear}
              disabled={!hasSelection}
              className={cn(
                'px-1 py-1.5 text-sm font-medium',
                'transition-colors duration-150',
                hasSelection
                  ? 'text-gray-600 hover:text-neutral-900 cursor-pointer'
                  : 'text-gray-400 cursor-not-allowed'
              )}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={handleApply}
              disabled={!hasSelection}
              className={cn(
                'h-8 px-4 rounded-md text-sm font-medium',
                'transition-all duration-200',
                hasSelection
                  ? 'bg-[#3535F3] text-white hover:bg-[#2a2ac2] cursor-pointer'
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
};

export default DateFilterPill;
