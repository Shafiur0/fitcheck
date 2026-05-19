'use client';

import { useTheme } from '@/lib/theme-context';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="group inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/75 px-4 py-2.5 text-sm font-medium text-emerald-950 shadow-lg shadow-emerald-500/10 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:bg-white active:scale-95 dark:border-white/10 dark:bg-slate-950/60 dark:text-emerald-50"
      aria-label="Toggle theme"
      aria-pressed={theme === 'dark'}
    >
      {theme === 'light' ? (
        <>
          <Moon className="h-4 w-4 text-emerald-700 transition-transform duration-200 group-hover:rotate-12 dark:text-emerald-300" />
          <span>Dark mode</span>
        </>
      ) : (
        <>
          <Sun className="h-4 w-4 text-emerald-700 transition-transform duration-200 group-hover:rotate-90 dark:text-emerald-300" />
          <span>Light mode</span>
        </>
      )}
    </button>
  );
}
