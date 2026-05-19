export function Footer() {
  return (
    <footer className="mt-auto border-t border-white/60 bg-white/55 px-4 py-6 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/35 animate-fade-in-up">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-sm text-muted-foreground">
          <p>© 2026 FitCheck. All rights reserved.</p>
        </div>
        <div className="rounded-full border border-emerald-200/70 bg-emerald-50/80 px-4 py-2 text-sm text-emerald-900 shadow-sm dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-100">
          Developed by <span className="font-semibold">Shafiur Rahman Shafim</span>
        </div>
        <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Build momentum from day one
        </div>
      </div>
    </footer>
  );
}
