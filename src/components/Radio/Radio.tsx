import React, { forwardRef, useId } from 'react';
import { cn } from '../../utils/cn';

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Label text */
  label?: string;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
  ({ label, size = 'md', className, disabled, id: customId, ...props }, ref) => {
    const generatedId = useId();
    const id = customId || generatedId;

    const sizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };

    return (
      <label
        className={cn(
          'inline-flex items-center gap-2.5',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
      >
        <input
          ref={ref}
          type="radio"
          id={id}
          disabled={disabled}
          className={cn(
            sizeStyles[size],
            'border-2 bg-white',
            'outline-none focus:outline-none active:outline-none',
            'focus-visible:shadow-[0_0_0_2px_#3535F3]',
            'transition-all duration-150',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'cursor-pointer',
            'border-gray-400 checked:border-[#3535F3] checked:bg-[#3535F3] hover:border-[#3535F3]',
            '[&:checked]:border-[6px]'
          )}
          style={{
            accentColor: '#3535F3',
          }}
          {...props}
        />
        {label && (
          <span
            className={cn(
              'text-sm text-neutral-900 font-normal select-none',
              disabled && 'cursor-not-allowed'
            )}
          >
            {label}
          </span>
        )}
      </label>
    );
  }
);

Radio.displayName = 'Radio';

export interface RadioGroupProps {
  /** Radio group name */
  name: string;

  /** Selected value */
  value?: string;

  /** Change handler */
  onChange?: (value: string) => void;

  /** Radio options */
  options: Array<{ value: string; label: string; disabled?: boolean }>;

  /** Layout direction */
  direction?: 'horizontal' | 'vertical';

  /** Size of radios */
  size?: 'sm' | 'md' | 'lg';

  /** Additional className */
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  value,
  onChange,
  options,
  direction = 'vertical',
  size = 'md',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex gap-4',
        direction === 'vertical' ? 'flex-col' : 'flex-row flex-wrap',
        className
      )}
      role="radiogroup"
    >
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value === option.value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={option.disabled}
          size={size}
        />
      ))}
    </div>
  );
};

export default Radio;
