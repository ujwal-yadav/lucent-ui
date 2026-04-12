import React, { forwardRef, useState } from 'react';
import { cn } from '../../utils/cn';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image source */
  src?: string;

  /** Alt text */
  alt?: string;

  /** Fallback text (initials) */
  fallback?: string;

  /** Size variant */
  size?: AvatarSize;

  /** Shape */
  shape?: 'circle' | 'square';
}

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, size = 'md', shape = 'circle', className, ...props }, ref) => {
    const [imageError, setImageError] = useState(false);

    const sizeStyles = {
      sm: 'w-8 h-8 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-12 h-12 text-base',
      xl: 'w-16 h-16 text-lg',
      '2xl': 'w-20 h-20 text-xl',
    };

    const showImage = src && !imageError;
    const showFallback = !showImage;

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center overflow-hidden bg-neutral-200 text-neutral-600 font-medium',
          sizeStyles[size],
          shape === 'circle' ? 'rounded-full' : 'rounded-lg',
          className
        )}
        {...props}
      >
        {showImage && (
          <img
            src={src}
            alt={alt || fallback || 'Avatar'}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        )}
        {showFallback && fallback && <span className="uppercase select-none">{fallback}</span>}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
export default Avatar;
