import React, { createContext, useContext, useState, useId, ReactNode } from 'react';
import { cn } from '../../utils/cn';

interface AccordionContextValue {
  expandedItems: Set<string>;
  toggle: (id: string) => void;
  multiple?: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  /** Allow multiple items to be expanded */
  multiple?: boolean;

  /** Default expanded items (controlled) */
  defaultValue?: string | string[];

  /** Children accordion items */
  children: ReactNode;

  /** Additional className */
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  multiple = false,
  defaultValue,
  children,
  className,
}) => {
  const initialExpanded = new Set<string>(
    Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  );

  const [expandedItems, setExpandedItems] = useState(initialExpanded);

  const toggle = (id: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) {
          next.clear();
        }
        next.add(id);
      }
      return next;
    });
  };

  return (
    <AccordionContext.Provider value={{ expandedItems, toggle, multiple }}>
      <div className={cn('shadow-border rounded-md overflow-hidden', className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

export interface AccordionItemProps {
  /** Unique identifier */
  value: string;

  /** Item title */
  title: string;

  /** Item content */
  children: ReactNode;

  /** Additional className */
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  value,
  title,
  children,
  className,
}) => {
  const context = useContext(AccordionContext);
  if (!context) throw new Error('AccordionItem must be used within Accordion');

  const { expandedItems, toggle } = context;
  const isExpanded = expandedItems.has(value);
  const id = useId();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState<number | undefined>(isExpanded ? undefined : 0);

  React.useEffect(() => {
    if (!contentRef.current) return;

    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);

      // Set to auto after animation
      const timer = setTimeout(() => {
        setHeight(undefined);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      // Get current height before collapsing
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight);

      // Double RAF ensures browser paints current height before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setHeight(0);
        });
      });
    }
  }, [isExpanded]);

  return (
    <div
      className={cn('overflow-hidden', className)}
      style={{
        boxShadow: 'rgba(0, 0, 0, 0.08) 0px -1px 0px',
      }}
    >
      <button
        type="button"
        onClick={() => toggle(value)}
        aria-expanded={isExpanded}
        aria-controls={`${id}-content`}
        className={cn(
          'flex items-center justify-between w-full px-4 py-3 text-left',
          'hover:bg-gray-50 transition-colors duration-200',
          'focus:outline-none'
        )}
      >
        <span className="font-medium text-neutral-900">{title}</span>
        <svg
          className={cn(
            'w-5 h-5 transition-transform duration-300 text-gray-500',
            isExpanded && 'rotate-180'
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        ref={contentRef}
        id={`${id}-content`}
        style={{ height }}
        className={cn('overflow-hidden transition-all duration-300 ease-in-out')}
      >
        <div className="px-4 py-3 text-gray-600">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
