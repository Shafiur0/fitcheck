import Link from 'next/link';
import { ReactNode } from 'react';
import { ActivitySquare, BarChart3, Flame, Salad, Share2, Droplets } from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: BarChart3 },
  { href: '/dashboard/check-in', label: 'Check-In', icon: ActivitySquare },
  { href: '/dashboard/trackers', label: 'Trackers', icon: Droplets },
  { href: '/dashboard/planner', label: 'Workout Plan', icon: Flame },
  { href: '/dashboard/share', label: 'Share Card', icon: Share2 }
];

export function DashboardShell({ children, name, email }: { children: ReactNode; name?: string | null; email?: string | null }) {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,rgba(236,253,245,0.7),rgba(255,255,255,0.95))]">
      <div className="mx-auto grid min-h-screen max-w-7xl gap-6 p-4 lg:grid-cols-[280px_1fr] lg:p-6">
        <aside className="rounded-3xl border border-emerald-100 bg-white/90 p-5 shadow-sm backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-emerald-600 p-3 text-white shadow-soft">
              <Salad className="h-6 w-6" />
            </div>
            <div>
              <p className="font-display text-xl font-semibold">FitCheck</p>
              <p className="text-sm text-emerald-900/60">Your personal fitness hub</p>
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-700">Signed in</p>
            <p className="mt-1 font-medium text-emerald-950">{name ?? 'Member'}</p>
            <p className="text-sm text-emerald-900/70">{email ?? ''}</p>
          </div>
          <nav className="mt-6 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-emerald-900 transition hover:bg-emerald-50">
                  <Icon className="h-4 w-4 text-emerald-600" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-6 space-y-3">
            <Badge variant="secondary" className="w-fit">Neon + Prisma</Badge>
            <Badge variant="outline" className="w-fit">NextAuth secured</Badge>
          </div>
          <div className="mt-6">
            <LogoutButton />
          </div>
        </aside>
        <main className="space-y-6">{children}</main>
      </div>
    </div>
  );
}
