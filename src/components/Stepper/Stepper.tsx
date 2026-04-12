import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface Step {
  /** Step label */
  label: string;

  /** Step description */
  description?: string;

  /** Step icon */
  icon?: ReactNode;
}

export interface StepperProps {
  /** Array of steps */
  steps: Step[];

  /** Current active step index */
  currentStep: number;

  /** Orientation */
  orientation?: 'horizontal' | 'vertical';

  /** Additional className */
  className?: string;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  orientation = 'horizontal',
  className,
}) => {
  return (
    <div
      className={cn(
        'flex',
        orientation === 'vertical' ? 'flex-col' : 'flex-row items-center',
        className
      )}
    >
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <React.Fragment key={index}>
            <div
              className={cn(
                'flex items-center',
                orientation === 'vertical' ? 'w-full' : 'flex-col'
              )}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors',
                    isCompleted && 'bg-primary-500 border-primary-500 text-white',
                    isActive && 'border-primary-500 text-primary-500',
                    !isCompleted && !isActive && 'border-neutral-300 text-neutral-400'
                  )}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    <span className="font-semibold">{index + 1}</span>
                  )}
                </div>
                <div
                  className={cn('ml-4', orientation === 'horizontal' && 'text-center ml-0 mt-2')}
                >
                  <div
                    className={cn(
                      'font-medium',
                      isActive && 'text-primary-600',
                      !isActive && !isCompleted && 'text-neutral-400'
                    )}
                  >
                    {step.label}
                  </div>
                  {step.description && (
                    <div className="text-sm text-neutral-500">{step.description}</div>
                  )}
                </div>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'bg-neutral-300',
                  orientation === 'horizontal' ? 'h-0.5 flex-1 mx-4' : 'w-0.5 h-12 ml-5 my-2',
                  isCompleted && 'bg-primary-500'
                )}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper;
