'use client';

import { useTheme } from '@/lib/theme-context';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group inline-flex items-center justify-center rounded-full border border-white/60 bg-white/75 p-3 shadow-lg shadow-emerald-500/10 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-95 dark:border-white/10 dark:bg-slate-950/60"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-emerald-700 transition-transform duration-200 group-hover:rotate-12 dark:text-emerald-300" />
      ) : (
        <Sun className="w-5 h-5 text-emerald-700 transition-transform duration-200 group-hover:rotate-90 dark:text-emerald-300" />
      )}
    </button>
  );
}
