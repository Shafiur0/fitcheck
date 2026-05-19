import * as React from 'react';
import { cn } from '@/lib/utils';

export const Progress = ({ value = 0, className }: { value?: number; className?: string }) => (
  <div className={cn('h-3 w-full overflow-hidden rounded-full bg-emerald-100', className)}>
    <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-lime-500 transition-all" style={{ width: `${Math.min(100, Math.max(0, value))}%` }} />
  </div>
);
