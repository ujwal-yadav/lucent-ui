import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface TimelineItemProps {
  /** Title of the timeline item */
  title: string;

  /** Description or content */
  description?: ReactNode;

  /** Timestamp or date */
  time?: string;

  /** Icon element */
  icon?: ReactNode;

  /** Status variant */
  variant?: 'default' | 'success' | 'error' | 'warning' | 'primary';

  /** Whether this is the active/current item */
  active?: boolean;

  /** Additional content to display */
  children?: ReactNode;
}

export interface TimelineProps {
  /** Timeline orientation */
  orientation?: 'vertical' | 'horizontal';

  /** Timeline items */
  items?: TimelineItemProps[];

  /** Custom children (overrides items if provided) */
  children?: ReactNode;

  /** Position of content in vertical timeline */
  position?: 'left' | 'right' | 'alternate';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Additional className */
  className?: string;
}

const variantStyles = {
  default: {
    dot: 'bg-neutral-100 border-neutral-300',
    line: 'bg-neutral-200',
    active: 'bg-primary-500 border-primary-500 text-white',
  },
  success: {
    dot: 'bg-success-50 border-success-500',
    line: 'bg-success-200',
    active: 'bg-success-500 border-success-500 text-white',
  },
  error: {
    dot: 'bg-danger-50 border-danger-500',
    line: 'bg-danger-200',
    active: 'bg-danger-500 border-danger-500 text-white',
  },
  warning: {
    dot: 'bg-warning-50 border-warning-500',
    line: 'bg-warning-200',
    active: 'bg-warning-500 border-warning-500 text-neutral-900',
  },
  primary: {
    dot: 'bg-primary-50 border-primary-500',
    line: 'bg-primary-200',
    active: 'bg-primary-500 border-primary-500 text-white',
  },
};

const sizeStyles = {
  sm: {
    dot: 'w-2 h-2',
    iconDot: 'w-6 h-6',
    line: 'w-0.5',
    gap: 'gap-2',
    text: 'text-xs',
  },
  md: {
    dot: 'w-3 h-3',
    iconDot: 'w-8 h-8',
    line: 'w-0.5',
    gap: 'gap-3',
    text: 'text-sm',
  },
  lg: {
    dot: 'w-4 h-4',
    iconDot: 'w-10 h-10',
    line: 'w-1',
    gap: 'gap-4',
    text: 'text-base',
  },
};

export const TimelineItem: React.FC<
  TimelineItemProps & {
    isLast?: boolean;
    orientation?: 'vertical' | 'horizontal';
    position?: 'left' | 'right';
    size?: 'sm' | 'md' | 'lg';
  }
> = ({
  title,
  description,
  time,
  icon,
  variant = 'default',
  active = false,
  children,
  isLast = false,
  orientation = 'vertical',
  position = 'right',
  size = 'md',
}) => {
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  if (orientation === 'horizontal') {
    return (
      <div className="flex flex-col items-center flex-1">
        {/* Dot/Icon */}
        <div className="relative flex items-center justify-center w-full">
          {/* Dot */}
          <div
            className={cn(
              'relative z-10 rounded-full border-2 flex items-center justify-center flex-shrink-0',
              icon ? sizeStyle.iconDot : sizeStyle.dot,
              active ? variantStyle.active : variantStyle.dot
            )}
          >
            {icon && <span className={cn('flex items-center justify-center', size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm')}>{icon}</span>}
          </div>

          {/* Line after */}
          {!isLast && (
            <div
              className={cn(
                'absolute h-0.5 left-1/2 top-1/2 -translate-y-1/2',
                variantStyle.line
              )}
              style={{ width: 'calc(100% - 50%)' }}
            />
          )}
        </div>

        {/* Content */}
        <div className="mt-4 text-center w-full px-2">
          {time && (
            <p className={cn('text-neutral-500 mb-1 whitespace-nowrap', sizeStyle.text)}>{time}</p>
          )}
          <h4
            className={cn(
              'font-semibold text-neutral-900 whitespace-nowrap',
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
            )}
          >
            {title}
          </h4>
          {description && (
            <p className={cn('text-neutral-600 mt-1', sizeStyle.text)}>
              {description}
            </p>
          )}
          {children && <div className="mt-2">{children}</div>}
        </div>
      </div>
    );
  }

  // Vertical timeline
  return (
    <div className={cn('flex', sizeStyle.gap, position === 'left' && 'flex-row-reverse')}>
      {/* Line and Dot */}
      <div className="flex flex-col items-center">
        {/* Dot */}
        <div
          className={cn(
            'rounded-full border-2 flex items-center justify-center flex-shrink-0',
            icon ? sizeStyle.iconDot : sizeStyle.dot,
            active ? variantStyle.active : variantStyle.dot
          )}
        >
          {icon && <span className={cn('flex items-center justify-center', size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm')}>{icon}</span>}
        </div>

        {/* Vertical line */}
        {!isLast && (
          <div className={cn('flex-1 min-h-8', sizeStyle.line, variantStyle.line)} />
        )}
      </div>

      {/* Content */}
      <div className={cn('flex-1 pb-8', position === 'left' && 'text-right')}>
        {time && (
          <p className={cn('text-neutral-500 mb-1', sizeStyle.text)}>{time}</p>
        )}
        <h4
          className={cn(
            'font-semibold text-neutral-900',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'
          )}
        >
          {title}
        </h4>
        {description && (
          <p className={cn('text-neutral-600 mt-1', sizeStyle.text)}>
            {description}
          </p>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

TimelineItem.displayName = 'TimelineItem';

export const Timeline: React.FC<TimelineProps> = ({
  orientation = 'vertical',
  items,
  children,
  position = 'right',
  size = 'md',
  className,
}) => {
  const content = children || (
    <>
      {items?.map((item, index) => {
        const itemPosition =
          position === 'alternate'
            ? index % 2 === 0
              ? 'right'
              : 'left'
            : position;

        return (
          <TimelineItem
            key={index}
            {...item}
            isLast={index === items.length - 1}
            orientation={orientation}
            position={itemPosition}
            size={size}
          />
        );
      })}
    </>
  );

  if (orientation === 'horizontal') {
    return (
      <div className={cn('relative w-full', className)}>
        <div className="flex items-start">{content}</div>
      </div>
    );
  }

  return <div className={cn('relative', className)}>{content}</div>;
};

Timeline.displayName = 'Timeline';

export default Timeline;
