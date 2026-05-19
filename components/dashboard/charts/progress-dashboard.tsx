"use client";

import { LineChart, Line, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowDownRight, ArrowUpRight, Scale, Activity } from 'lucide-react';

export function ProgressDashboard({
  bmiSeries,
  weightSeries,
  streakWeeks,
  latestBmi,
  startingBmi,
  totalChange,
  goalProgress
}: {
  bmiSeries: Array<{ date: string; value: number }>;
  weightSeries: Array<{ date: string; value: number }>;
  streakWeeks: number;
  latestBmi: number | null;
  startingBmi: number | null;
  totalChange: number | null;
  goalProgress: number;
}) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={<Scale className="h-4 w-4" />} label="Latest BMI" value={latestBmi?.toFixed(1) ?? '—'} />
        <StatCard icon={<ArrowDownRight className="h-4 w-4" />} label="Starting BMI" value={startingBmi?.toFixed(1) ?? '—'} />
        <StatCard icon={<ArrowUpRight className="h-4 w-4" />} label="Total change" value={totalChange !== null ? `${totalChange > 0 ? '+' : ''}${totalChange.toFixed(1)}` : '—'} />
        <StatCard icon={<Activity className="h-4 w-4" />} label="Streak" value={`${streakWeeks} weeks`} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="BMI over time" description="Track composition changes with your check-ins.">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={bmiSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="date" stroke="#0f766e" fontSize={12} />
              <YAxis stroke="#0f766e" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#059669" fill="#d1fae5" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Weight over time" description="See your scale trend at a glance.">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={weightSeries}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="date" stroke="#0f766e" fontSize={12} />
              <YAxis stroke="#0f766e" fontSize={12} />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#16a34a" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Goal progress</CardTitle>
          <CardDescription>How far you are from your target weight.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Progress value={goalProgress} />
          <div className="flex items-center justify-between text-sm text-emerald-900/70">
            <span>Current progress</span>
            <Badge variant="secondary">{Math.round(goalProgress)}%</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ChartCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm text-emerald-900/70">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-emerald-100 p-3 text-emerald-700">{icon}</div>
      </CardContent>
    </Card>
  );
}
