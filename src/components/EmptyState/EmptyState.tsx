import React, { ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface EmptyStateProps {
  /** Title */
  title: string;

  /** Description */
  description?: string;

  /** Icon or illustration */
  icon?: ReactNode;

  /** Action button(s) */
  action?: ReactNode;

  /** Additional className */
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon,
  action,
  className,
}) => {
  return (
    <div
      className={cn('flex flex-col items-center justify-center text-center py-12 px-4', className)}
    >
      {icon && <div className="mb-4 text-neutral-400">{icon}</div>}
      <h3 className="text-lg font-semibold text-neutral-900 mb-2">{title}</h3>
      {description && <p className="text-neutral-600 mb-6 max-w-md">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
