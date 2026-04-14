import { ReactNode } from 'react';

export interface SelectOption<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
  description?: string;
  icon?: ReactNode;
  group?: string;
}

export interface SelectProps<T = string> {
  /** The currently selected value(s) */
  value?: T | T[];

  /** Default value for uncontrolled component */
  defaultValue?: T | T[];

  /** Callback when selection changes */
  onChange?: (value: T | T[] | null) => void;

  /** Array of options */
  options: SelectOption<T>[];

  /** Label text displayed above the select */
  label?: string;

  /** Placeholder text */
  placeholder?: string;

  /** Whether the select is disabled */
  disabled?: boolean;

  /** Whether the select is in an error state */
  error?: boolean;

  /** Whether to allow multiple selections */
  multiple?: boolean;

  /** Whether to allow searching/filtering */
  searchable?: boolean;

  /** Custom search function */
  onSearch?: (query: string) => void;

  /** Whether options are loading (async) */
  loading?: boolean;

  /** Whether to allow clearing the selection */
  clearable?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Visual variant */
  variant?: 'default' | 'outline' | 'filled';

  /** Maximum height of dropdown */
  maxHeight?: number;

  /** Whether to enable virtual scrolling for large lists */
  virtualized?: boolean;

  /** Custom render function for selected value */
  renderValue?: (value: T | T[], options: SelectOption<T>[]) => ReactNode;

  /** Custom render function for options */
  renderOption?: (option: SelectOption<T>, selected: boolean) => ReactNode;

  /** Additional CSS class */
  className?: string;

  /** ARIA label */
  'aria-label'?: string;

  /** ARIA labelled by */
  'aria-labelledby'?: string;

  /** ARIA described by */
  'aria-describedby'?: string;

  /** Name attribute for forms */
  name?: string;

  /** Whether the field is required */
  required?: boolean;

  /** ID attribute */
  id?: string;

  /** Custom empty state message */
  emptyMessage?: string;

  /** Custom loading message */
  loadingMessage?: string;

  /** Portal target for dropdown */
  portal?: boolean;

  /** Callback when dropdown opens */
  onOpen?: () => void;

  /** Callback when dropdown closes */
  onClose?: () => void;

  /** Position of dropdown */
  position?: 'bottom' | 'top' | 'auto';
}

export interface SelectContextValue<T = string> {
  value: T | T[] | null;
  options: SelectOption<T>[];
  isOpen: boolean;
  disabled: boolean;
  multiple: boolean;
  searchable: boolean;
  searchQuery: string;
  highlightedIndex: number;
  setSearchQuery: (query: string) => void;
  setHighlightedIndex: (index: number) => void;
  selectOption: (option: SelectOption<T>) => void;
  removeOption: (value: T) => void;
  clearSelection: () => void;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  openDropdown: () => void;
}
