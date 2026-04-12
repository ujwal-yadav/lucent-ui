import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export interface RatingProps {
  /** Current rating value */
  value?: number;

  /** Default rating value */
  defaultValue?: number;

  /** Maximum rating value */
  max?: number;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Whether rating is read-only */
  readOnly?: boolean;

  /** Whether rating is disabled */
  disabled?: boolean;

  /** Precision (0.5 for half stars, 1 for full stars) */
  precision?: 0.5 | 1;

  /** Callback when rating changes */
  onChange?: (value: number) => void;

  /** Icon color */
  color?: string;

  /** Additional className */
  className?: string;

  /** Custom icon */
  icon?: React.ReactNode;

  /** Custom empty icon */
  emptyIcon?: React.ReactNode;
}

export const Rating: React.FC<RatingProps> = ({
  value: controlledValue,
  defaultValue = 0,
  max = 5,
  size = 'md',
  readOnly = false,
  disabled = false,
  precision = 1,
  onChange,
  color = 'text-warning-500',
  className,
  icon,
  emptyIcon,
}) => {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;
  const displayValue = hoverValue !== null ? hoverValue : currentValue;

  const sizeStyles = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
  };

  const handleClick = (value: number) => {
    if (readOnly || disabled) return;

    if (!isControlled) {
      setInternalValue(value);
    }
    onChange?.(value);
  };

  const handleMouseEnter = (value: number) => {
    if (readOnly || disabled) return;
    setHoverValue(value);
  };

  const handleMouseLeave = () => {
    if (readOnly || disabled) return;
    setHoverValue(null);
  };

  const StarIcon = ({ filled }: { filled: boolean }) => {
    if (icon && filled) return <>{icon}</>;
    if (emptyIcon && !filled) return <>{emptyIcon}</>;

    return (
      <svg
        className={cn(sizeStyles[size], 'transition-colors duration-200')}
        fill={filled ? 'currentColor' : 'none'}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={filled ? 0 : 1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    );
  };

  return (
    <div
      className={cn('inline-flex gap-1', disabled && 'opacity-50 cursor-not-allowed', className)}
      onMouseLeave={handleMouseLeave}
    >
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = displayValue >= starValue;
        const isHalfFilled =
          precision === 0.5 && displayValue >= starValue - 0.5 && displayValue < starValue;

        return (
          <button
            key={index}
            type="button"
            disabled={disabled || readOnly}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            className={cn(
              'relative focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded',
              !readOnly && !disabled && 'cursor-pointer',
              readOnly && 'cursor-default',
              isFilled || isHalfFilled ? color : 'text-neutral-300'
            )}
            aria-label={`Rate ${starValue} out of ${max}`}
          >
            {isHalfFilled ? (
              <div className="relative">
                <StarIcon filled={false} />
                <div className="absolute inset-0 overflow-hidden" style={{ width: '50%' }}>
                  <StarIcon filled={true} />
                </div>
              </div>
            ) : (
              <StarIcon filled={isFilled} />
            )}
          </button>
        );
      })}
      {!readOnly && (
        <span className="sr-only">
          {currentValue} out of {max} stars
        </span>
      )}
    </div>
  );
};

export default Rating;
