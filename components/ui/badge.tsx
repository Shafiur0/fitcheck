import * as React from 'react';
import { cn } from '@/lib/utils';

export const Badge = ({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLSpanElement> & { variant?: 'default' | 'secondary' | 'outline' }) => {
  const variants = {
    default: 'bg-emerald-600 text-white',
    secondary: 'bg-emerald-100 text-emerald-900',
    outline: 'border border-emerald-200 text-emerald-900'
  };

  return <span className={cn('inline-flex items-center rounded-full px-3 py-1 text-xs font-medium', variants[variant], className)} {...props} />;
};
