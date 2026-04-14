import { ReactNode } from 'react';

export interface FilterOption {
  /** Unique value for the option */
  value: string;

  /** Display label */
  label: string;

  /** Whether option is checked */
  checked?: boolean;
}

export interface FilterPillProps {
  /** Label for the filter pill */
  label: string;

  /** Array of filter options */
  options: FilterOption[];

  /** Callback when filters are applied */
  onApply?: (selectedValues: string[]) => void;

  /** Callback when filters are cleared */
  onClear?: () => void;

  /** Whether to allow multiple selections */
  multiple?: boolean;

  /** Whether to show search input */
  searchable?: boolean;

  /** Search placeholder text */
  searchPlaceholder?: string;

  /** Custom icon */
  icon?: ReactNode;

  /** Whether the dropdown is open (controlled) */
  isOpen?: boolean;

  /** Callback when open state changes */
  onOpenChange?: (isOpen: boolean) => void;

  /** Additional className */
  className?: string;
}
