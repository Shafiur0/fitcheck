import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Activity, LineChart, ClipboardList, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const features = [
  { title: 'BMI + TDEE calculator', description: 'Instant body composition analysis with personalized calorie guidance.', icon: Activity },
  { title: 'Progress dashboards', description: 'Track BMI and weight history with charts that make trends obvious.', icon: LineChart },
  { title: 'Daily trackers', description: 'Log water, sleep, workouts, and goals in a single mobile-first flow.', icon: ClipboardList },
  { title: 'Badges and streaks', description: 'Earn milestone rewards that make consistency feel tangible.', icon: Trophy }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-16">
        <div className="rounded-[2rem] border border-emerald-100 bg-white/80 p-6 shadow-sm backdrop-blur lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6 animate-fadeUp">
              <BadgeLine />
              <h1 className="font-display text-5xl font-semibold tracking-tight text-emerald-950 sm:text-6xl">
                FitCheck turns your fitness numbers into daily momentum.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-emerald-900/75">
                A full-stack fitness app with BMI, TDEE, daily logs, workout plans, streaks, and shareable progress cards. Built for quick check-ins and clear progress.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/sign-up">Create account <ArrowRight className="h-4 w-4" /></Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/sign-in">Sign in</Link>
                </Button>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-emerald-900/70">
                <Pill>Next.js 14 App Router</Pill>
                <Pill>NextAuth.js</Pill>
                <Pill>Prisma + Neon</Pill>
                <Pill>Recharts</Pill>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={feature.title} className={`border-emerald-100 ${index === 0 ? 'lg:translate-x-6' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700"><Icon className="h-5 w-5" /></div>
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
      </section>

      <section className="mx-auto grid max-w-7xl gap-4 px-4 pb-12 lg:grid-cols-3 lg:px-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Built for deployment on Vercel</CardTitle>
            <CardDescription>Connect the GitHub repo, add environment variables, and ship with Neon as the free Postgres backend.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <MiniMetric label="Auth" value="Email + Google" />
            <MiniMetric label="Database" value="Neon Postgres" />
            <MiniMetric label="Charts" value="Recharts" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Protected dashboard</CardTitle>
            <CardDescription>Every log is tied to the signed-in user and stored in Prisma models.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-emerald-900/75">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-600" /> BMI checks</div>
              <div className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Middleware protection</div>
              <div className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-emerald-600" /> Personalized advice</div>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

function BadgeLine() {
  return <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800">Zero-config Vercel deployment</span>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full border border-emerald-200 bg-white px-3 py-1.5">{children}</span>;
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-emerald-50 p-4">
      <p className="text-xs uppercase tracking-wide text-emerald-700">{label}</p>
      <p className="mt-2 font-semibold text-emerald-950">{value}</p>
    </div>
  );
}
