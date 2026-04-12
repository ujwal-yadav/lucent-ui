import { forwardRef, ReactNode } from 'react';
import { cn } from '../../utils/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Card variant */
  variant?: 'default' | 'outlined' | 'elevated';

  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';

  /** Whether the card is hoverable */
  hoverable?: boolean;

  /** Children content */
  children?: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = 'default', padding = 'md', hoverable = false, children, className, ...props },
    ref
  ) => {
    // Vercel variant styles - shadow-as-border technique
    const variantStyles = {
      default: 'bg-white shadow-border',
      outlined: 'bg-white shadow-[rgba(0,0,0,0.12)_0px_0px_0px_1px]',
      elevated: 'bg-white shadow-card',
    };

    const paddingStyles = {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-md', // 8px radius for cards
          variantStyles[variant],
          paddingStyles[padding],
          hoverable && 'transition-shadow hover:shadow-card-hover cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mb-4', className)} {...props}>
      {children}
    </div>
  )
);

CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn('text-xl font-semibold text-neutral-900 tracking-subhead', className)}
      {...props}
    >
      {children}
    </h3>
  )
);

CardTitle.displayName = 'CardTitle';

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-600 mt-1.5', className)} {...props}>
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

export const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn(className)} {...props}>
      {children}
    </div>
  )
);

CardContent.displayName = 'CardContent';

export const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn('mt-6 flex items-center gap-2', className)} {...props}>
      {children}
    </div>
  )
);

CardFooter.displayName = 'CardFooter';

export default Card;
