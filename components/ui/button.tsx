import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const variants = {
      default: 'bg-emerald-600 text-white shadow-soft hover:bg-emerald-700',
      secondary: 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100',
      outline: 'border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50',
      ghost: 'text-emerald-900 hover:bg-emerald-50',
      destructive: 'bg-red-600 text-white hover:bg-red-700'
    };

    const sizes = {
      sm: 'h-9 rounded-lg px-3 text-sm',
      default: 'h-11 rounded-xl px-4',
      lg: 'h-12 rounded-xl px-6 text-base',
      icon: 'h-10 w-10 rounded-xl'
    };

    const sharedClassName = cn(
      'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
      variants[variant],
      sizes[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: cn(sharedClassName, (children.props as { className?: string }).className)
      });
    }

    return (
      <button ref={ref} className={sharedClassName} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
