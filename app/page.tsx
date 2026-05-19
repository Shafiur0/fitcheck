import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Activity, LineChart, ClipboardList, Trophy, Bolt, Flame, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ThemeToggle } from '@/components/theme-toggle';

const features = [
  { title: 'BMI + TDEE calculator', description: 'Instant body composition analysis with personalized calorie guidance.', icon: Activity },
  { title: 'Progress dashboards', description: 'Track BMI and weight history with charts that make trends obvious.', icon: LineChart },
  { title: 'Daily trackers', description: 'Log water, sleep, workouts, and goals in a single mobile-first flow.', icon: ClipboardList },
  { title: 'Badges and streaks', description: 'Earn milestone rewards that make consistency feel tangible.', icon: Trophy }
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl animate-float" />
        <div className="absolute right-[-6rem] top-32 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-8rem] left-[-5rem] h-96 w-96 rounded-full bg-lime-300/15 blur-3xl animate-float-slower" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_25%),radial-gradient(circle_at_80%_20%,_rgba(110,231,183,0.12),_transparent_20%)] opacity-80" />
      </div>

      <div className="relative z-10">
        <div className="absolute right-4 top-4 z-20 animate-fade-in md:right-6 md:top-6">
          <ThemeToggle />
        </div>

        <section className="mx-auto max-w-7xl px-4 pb-12 pt-20 lg:px-6 lg:pb-16 lg:pt-24">
          <div className="rounded-[2.25rem] border border-white/60 bg-white/70 p-6 shadow-[0_20px_80px_rgba(16,185,129,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/55 lg:p-10 animate-fade-in-up">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
              <div className="space-y-7 animate-slide-in-left">
                <BadgeLine />
                <div className="space-y-4">
                  <h1 className="max-w-3xl font-display text-5xl font-semibold tracking-tight text-emerald-950 sm:text-6xl lg:text-7xl dark:text-emerald-50">
                    Fitness tracking that feels polished, fast, and alive.
                  </h1>
                  <p className="max-w-2xl text-lg leading-8 text-emerald-950/70 dark:text-emerald-50/70">
                    FitCheck combines BMI, TDEE, goal tracking, daily check-ins, workout planning, and shareable progress cards into one modern dashboard.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-emerald-950/70 dark:text-emerald-50/70">
                  <span className="rounded-full border border-emerald-200/80 bg-white/80 px-4 py-2 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900/70">Designed by Shafiur Rahman Shafim</span>
                  <span className="rounded-full border border-emerald-200/80 bg-white/80 px-4 py-2 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900/70">Live theme switching</span>
                  <span className="rounded-full border border-emerald-200/80 bg-white/80 px-4 py-2 shadow-sm dark:border-emerald-500/20 dark:bg-slate-900/70">Smooth motion UI</span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button asChild size="lg" className="group shadow-lg shadow-emerald-500/20">
                    <Link href="/sign-up">
                      Create account
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="bg-white/70 backdrop-blur hover:bg-white dark:bg-slate-900/60 dark:hover:bg-slate-900">
                    <Link href="/sign-in">Sign in</Link>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-3 text-sm text-emerald-950/72 dark:text-emerald-50/72">
                  <Pill>Next.js 14 App Router</Pill>
                  <Pill>NextAuth.js</Pill>
                  <Pill>Prisma + Neon</Pill>
                  <Pill>Recharts</Pill>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-3">
                  <StatCard label="Consistency" value="94%" icon={Flame} />
                  <StatCard label="Weekly logs" value="18" icon={Bolt} />
                  <StatCard label="Goals hit" value="12" icon={Target} />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <Card
                        key={feature.title}
                        className={`border-white/70 bg-white/80 shadow-[0_10px_40px_rgba(15,23,42,0.08)] backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_50px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/55 ${index === 0 ? 'lg:translate-x-4' : ''}`}
                        style={{ animationDelay: `${index * 120}ms` }}
                      >
                        <CardHeader className="space-y-3">
                          <div className="flex items-center gap-3">
                            <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 shadow-inner dark:bg-emerald-500/15 dark:text-emerald-300">
                              <Icon className="h-5 w-5" />
                            </div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                          <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-14 lg:grid-cols-3 lg:px-6">
          <Card className="lg:col-span-2 animate-fade-in-up border-white/70 bg-white/70 shadow-[0_10px_50px_rgba(16,185,129,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(16,185,129,0.12)] dark:border-white/10 dark:bg-slate-950/55">
            <CardHeader>
              <CardTitle>Built for deployment on Vercel</CardTitle>
              <CardDescription>Connect the GitHub repo, add environment variables, and ship with Neon as the Postgres backend.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <MiniMetric label="Auth" value="Email + Google" />
              <MiniMetric label="Database" value="Neon Postgres" />
              <MiniMetric label="Charts" value="Recharts" />
            </CardContent>
          </Card>
          <Card className="animate-fade-in-up border-white/70 bg-gradient-to-br from-emerald-500/10 to-transparent shadow-[0_10px_50px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(15,23,42,0.12)] dark:border-white/10 dark:bg-slate-950/55">
            <CardHeader>
              <CardTitle>Protected dashboard</CardTitle>
              <CardDescription>Every log is tied to the signed-in user and stored in Prisma models.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-emerald-950/75 dark:text-emerald-50/75">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> BMI checks</div>
                <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Middleware protection</div>
                <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Personalized advice</div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

function BadgeLine() {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-200/80 bg-emerald-50/90 px-4 py-2 text-sm font-medium text-emerald-800 shadow-sm backdrop-blur animate-pulse-soft dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200">
      Modern UI • Dark mode • Motion design
    </span>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-emerald-200/80 bg-white/80 px-3 py-1.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-50 dark:border-white/10 dark:bg-slate-900/70 dark:hover:bg-slate-900">
      {children}
    </span>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/70 bg-emerald-50/70 p-4 shadow-sm dark:border-white/10 dark:bg-slate-900/60">
      <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{label}</p>
      <p className="mt-2 font-semibold text-emerald-950 dark:text-emerald-50">{value}</p>
    </div>
  );
}

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.ComponentType<{ className?: string }> }) {
  return (
    <div className="rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur animate-scale-in dark:border-white/10 dark:bg-slate-950/60">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-950 dark:text-emerald-50">{value}</p>
        </div>
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
