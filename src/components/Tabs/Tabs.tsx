import React, { createContext, useContext, useState, ReactNode, useId, useEffect } from 'react';
import { cn } from '../../utils/cn';

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: 'horizontal' | 'vertical';
  tabsId: string;
  variant: 'line' | 'pills' | 'enclosed' | 'segmented' | 'solid' | 'soft';
}

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps {
  /** Default active tab value */
  defaultValue?: string;

  /** Controlled active tab value */
  value?: string;

  /** Callback when tab changes */
  onChange?: (value: string) => void;

  /** Orientation of tabs */
  orientation?: 'horizontal' | 'vertical';

  /** Children */
  children: ReactNode;

  /** Additional className */
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onChange,
  orientation = 'horizontal',
  children,
  className,
}) => {
  const [activeTab, setActiveTabState] = useState(defaultValue || '');
  const [variant, setVariant] = useState<
    'line' | 'pills' | 'enclosed' | 'segmented' | 'solid' | 'soft'
  >('line');
  const tabsId = useId();

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : activeTab;

  const setActiveTab = (value: string) => {
    if (!isControlled) {
      setActiveTabState(value);
    }
    onChange?.(value);
  };

  const contextValue: TabsContextValue = {
    activeTab: currentValue,
    setActiveTab,
    orientation,
    tabsId,
    variant,
  };

  // Allow TabList to update variant
  const updateVariant = (newVariant: typeof variant) => {
    setVariant(newVariant);
  };

  return (
    <TabsContext.Provider value={{ ...contextValue, updateVariant } as any}>
      <div className={cn(orientation === 'vertical' && 'flex gap-4', className)}>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabListProps {
  /** Children */
  children: ReactNode;

  /** Additional className */
  className?: string;

  /** Variant style */
  variant?: 'line' | 'pills' | 'enclosed' | 'segmented' | 'solid' | 'soft';
}

export const TabList: React.FC<TabListProps> = ({ children, className, variant = 'line' }) => {
  const context = useContext(TabsContext) as any;
  if (!context) throw new Error('TabList must be used within Tabs');

  const { orientation, updateVariant } = context;

  useEffect(() => {
    if (updateVariant) {
      updateVariant(variant);
    }
  }, [variant, updateVariant]);

  const variantStyles = {
    line:
      orientation === 'horizontal' ? 'border-b border-neutral-200' : 'border-r border-neutral-200',
    pills: 'bg-neutral-100 p-1 rounded-lg',
    enclosed: '',
    segmented: 'bg-neutral-100 p-1 rounded-lg',
    solid: '',
    soft: 'bg-neutral-50 p-1 rounded-lg',
  };

  return (
    <div
      role="tablist"
      aria-orientation={orientation}
      className={cn(
        'flex gap-1',
        orientation === 'vertical' ? 'flex-col' : 'flex-row',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export interface TabProps {
  /** Tab value (unique identifier) */
  value: string;

  /** Tab label */
  children: ReactNode;

  /** Disabled state */
  disabled?: boolean;

  /** Additional className */
  className?: string;

  /** Icon to display before label */
  icon?: ReactNode;
}

export const Tab: React.FC<TabProps> = ({ value, children, disabled = false, className, icon }) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab, orientation, tabsId, variant } = context;
  const isActive = activeTab === value;

  const handleClick = () => {
    if (!disabled) {
      setActiveTab(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    const tabList = e.currentTarget.parentElement;
    const tabs = Array.from(tabList?.querySelectorAll('[role="tab"]:not([disabled])') || []);
    const currentIndex = tabs.indexOf(e.currentTarget);

    let nextIndex = currentIndex;

    if (orientation === 'horizontal') {
      if (e.key === 'ArrowLeft') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        e.preventDefault();
      } else if (e.key === 'ArrowRight') {
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        e.preventDefault();
      }
    } else {
      if (e.key === 'ArrowUp') {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        e.preventDefault();
      } else if (e.key === 'ArrowDown') {
        nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        e.preventDefault();
      }
    }

    if (nextIndex !== currentIndex) {
      (tabs[nextIndex] as HTMLElement).click();
      (tabs[nextIndex] as HTMLElement).focus();
    }

    if (e.key === 'Home') {
      (tabs[0] as HTMLElement).click();
      (tabs[0] as HTMLElement).focus();
      e.preventDefault();
    } else if (e.key === 'End') {
      (tabs[tabs.length - 1] as HTMLElement).click();
      (tabs[tabs.length - 1] as HTMLElement).focus();
      e.preventDefault();
    }
  };

  // Variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'line':
        return cn(
          isActive
            ? 'text-primary-600 border-b-2 border-primary-600'
            : 'text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent'
        );

      case 'pills':
        return cn(
          'rounded-md',
          isActive
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
        );

      case 'enclosed':
        return cn(
          'border border-neutral-200 rounded-t-lg border-b-0 -mb-px',
          isActive
            ? 'bg-white text-primary-600 border-b-2 border-b-white'
            : 'text-neutral-600 hover:text-neutral-900 bg-neutral-50'
        );

      case 'segmented':
        return cn(
          'rounded-md',
          isActive
            ? 'bg-white text-primary-600 shadow-sm'
            : 'text-neutral-600 hover:text-neutral-900'
        );

      case 'solid':
        return cn(
          'rounded-md',
          isActive
            ? 'bg-primary-500 text-white'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
        );

      case 'soft':
        return cn(
          'rounded-md',
          isActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/50'
        );

      default:
        return '';
    }
  };

  return (
    <button
      role="tab"
      type="button"
      aria-selected={isActive}
      aria-controls={`${tabsId}-panel-${value}`}
      id={`${tabsId}-tab-${value}`}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'px-4 py-2 text-sm font-medium transition-all duration-200',
        'outline-none focus:outline-none active:outline-none',
        'inline-flex items-center justify-center',
        getVariantStyles(),
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {icon && <span className="mr-2 inline-flex items-center">{icon}</span>}
      {children}
    </button>
  );
};

export interface TabPanelProps {
  /** Panel value (matches Tab value) */
  value: string;

  /** Panel content */
  children: ReactNode;

  /** Additional className */
  className?: string;

  /** Keep panel mounted when inactive */
  keepMounted?: boolean;
}

export const TabPanel: React.FC<TabPanelProps> = ({
  value,
  children,
  className,
  keepMounted = false,
}) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('TabPanel must be used within Tabs');

  const { activeTab, tabsId } = context;
  const isActive = activeTab === value;

  if (!isActive && !keepMounted) {
    return null;
  }

  return (
    <div
      role="tabpanel"
      id={`${tabsId}-panel-${value}`}
      aria-labelledby={`${tabsId}-tab-${value}`}
      hidden={!isActive}
      className={cn('focus:outline-none', isActive ? 'animate-fadeIn' : 'hidden', className)}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default Tabs;
