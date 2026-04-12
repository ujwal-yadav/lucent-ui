import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface DividerProps {
  /** Orientation of divider */
  orientation?: 'horizontal' | 'vertical';

  /** Label to display in divider */
  label?: ReactNode;

  /** Label position */
  labelPosition?: 'left' | 'center' | 'right';

  /** Additional className */
  className?: string;

  /** Variant style */
  variant?: 'solid' | 'dashed' | 'dotted';
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  label,
  labelPosition = 'center',
  className,
  variant = 'solid',
}) => {
  const variantStyles = {
    solid: 'border-solid',
    dashed: 'border-dashed',
    dotted: 'border-dotted',
  };

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn(
          'inline-block h-full w-px border-l border-neutral-200',
          variantStyles[variant],
          className
        )}
      />
    );
  }

  if (label) {
    const labelPositionStyles = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };

    return (
      <div
        role="separator"
        aria-orientation="horizontal"
        className={cn('flex items-center w-full', labelPositionStyles[labelPosition], className)}
      >
        {labelPosition !== 'left' && (
          <div className={cn('flex-1 border-t border-neutral-200', variantStyles[variant])} />
        )}
        <span className="px-3 text-sm text-neutral-600 whitespace-nowrap">{label}</span>
        {labelPosition !== 'right' && (
          <div className={cn('flex-1 border-t border-neutral-200', variantStyles[variant])} />
        )}
      </div>
    );
  }

  return (
    <hr
      role="separator"
      aria-orientation="horizontal"
      className={cn('border-t border-neutral-200', variantStyles[variant], className)}
    />
  );
};

export default Divider;
