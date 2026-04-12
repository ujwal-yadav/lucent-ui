import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps {
  /** Variant of skeleton */
  variant?: 'text' | 'circular' | 'rectangular';

  /** Width of skeleton */
  width?: string | number;

  /** Height of skeleton */
  height?: string | number;

  /** Number of lines (for text variant) */
  lines?: number;

  /** Additional className */
  className?: string;

  /** Whether to animate */
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
  animate = true,
}) => {
  const baseStyles = cn('bg-neutral-200', animate && 'animate-pulse');

  const style: React.CSSProperties = {
    width: width !== undefined ? (typeof width === 'number' ? `${width}px` : width) : undefined,
    height:
      height !== undefined ? (typeof height === 'number' ? `${height}px` : height) : undefined,
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className="space-y-2">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(baseStyles, 'h-4 rounded', index === lines - 1 && 'w-4/5', className)}
            style={style}
          />
        ))}
      </div>
    );
  }

  const variantStyles = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  return (
    <div
      className={cn(
        baseStyles,
        variantStyles[variant],
        !height && variant === 'text' && 'h-4',
        !height && variant === 'rectangular' && 'h-24',
        !width && variant === 'circular' && 'w-12 h-12',
        className
      )}
      style={style}
    />
  );
};

export default Skeleton;
