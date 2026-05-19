export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/60 bg-white/55 px-4 py-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/35 animate-fade-in-up">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 rounded-[1.75rem] border border-white/60 bg-white/60 px-5 py-4 shadow-[0_12px_40px_rgba(15,23,42,0.06)] dark:border-white/10 dark:bg-slate-950/40 md:flex-row">
        <div className="text-sm text-muted-foreground">
          <p>© 2026 FitCheck. All rights reserved.</p>
        </div>
        <div className="rounded-full border border-emerald-200/70 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 text-sm text-emerald-900 shadow-sm dark:border-emerald-500/20 dark:from-emerald-500/10 dark:to-teal-500/10 dark:text-emerald-100">
          Developed by <span className="font-semibold">Shafiur Rahman Shafim</span>
        </div>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Modern, animated, dark-mode ready
        </div>
      </div>
    </footer>
  );
}
