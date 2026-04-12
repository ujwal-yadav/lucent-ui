import React, { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

export interface SliderProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'size' | 'onChange'
> {
  /** Label for slider */
  label?: string;

  /** Minimum value */
  min?: number;

  /** Maximum value */
  max?: number;

  /** Step value */
  step?: number;

  /** Current value */
  value?: number;

  /** Default value */
  defaultValue?: number;

  /** Callback when value changes */
  onChange?: (value: number) => void;

  /** Show value label */
  showValue?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Additional className */
  className?: string;
}

export const Slider = forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      label,
      min = 0,
      max = 100,
      step = 1,
      value,
      defaultValue,
      onChange,
      showValue = false,
      size = 'md',
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const sizeStyles = {
      sm: 'h-1',
      md: 'h-2',
      lg: 'h-3',
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(Number(e.target.value));
    };

    const currentValue = value ?? defaultValue ?? min;

    return (
      <div className={cn('w-full', className)}>
        {(label || showValue) && (
          <div className="flex justify-between items-center mb-2">
            {label && <label className="text-sm font-medium text-neutral-700">{label}</label>}
            {showValue && <span className="text-sm text-neutral-600">{currentValue}</span>}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            'w-full appearance-none bg-transparent cursor-pointer',
            '[&::-webkit-slider-track]:rounded-full [&::-webkit-slider-track]:bg-neutral-200',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary-500',
            '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-colors',
            '[&::-webkit-slider-thumb]:hover:bg-primary-600',
            '[&::-moz-range-track]:rounded-full [&::-moz-range-track]:bg-neutral-200',
            '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:border-0',
            '[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary-500',
            '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-colors',
            '[&::-moz-range-thumb]:hover:bg-primary-600',
            sizeStyles[size],
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          {...props}
        />
      </div>
    );
  }
);

Slider.displayName = 'Slider';

export default Slider;
