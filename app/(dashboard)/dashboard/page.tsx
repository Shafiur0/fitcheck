import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/session';
import { calculateBmi, streakWeeks } from '@/lib/calculators';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressDashboard } from '@/components/dashboard/charts/progress-dashboard';
import { GoalSystem } from '@/components/dashboard/stats/goal-system';
import { DailyTrackers } from '@/components/tracking/daily-trackers';
import { WorkoutPlanner } from '@/components/dashboard/planner/workout-planner';
import { BmiCalculator } from '@/components/tracking/bmi-calculator';

export default async function DashboardPage() {
  const session = await getAuthSession();
  const userId = session?.user?.id as string;
  const [user, bmiLogs, dailyLogs, goals] = await Promise.all([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.bmiLog.findMany({ where: { userId }, orderBy: { date: 'asc' } }),
    prisma.dailyLog.findMany({ where: { userId }, orderBy: { date: 'desc' }, take: 30 }),
    prisma.goal.findMany({ where: { userId }, orderBy: { targetDate: 'desc' }, take: 1 })
  ]);

  const latestBmiLog = bmiLogs.at(-1) ?? null;
  const startingBmiLog = bmiLogs[0] ?? null;
  const latestWeight = latestBmiLog?.weight ?? 0;
  const latestCategory = latestBmiLog?.category ?? calculateBmi(175, 75).category;
  const weekStreak = streakWeeks(bmiLogs.map((log: { date: Date }) => log.date));
  const latestGoal = goals[0] ?? null;
  const goalProgress = latestGoal ? Math.min(100, Math.max(0, ((startingBmiLog?.weight ?? latestWeight) - latestGoal.targetWeight) / Math.max(1, (startingBmiLog?.weight ?? latestWeight) - latestGoal.targetWeight + 20) * 100)) : 0;
  const latestDaily = dailyLogs[0];
  const workoutCompletions = await prisma.workoutCompletion.findMany({
    where: { userId, category: latestCategory },
    orderBy: { dayKey: 'asc' }
  });

  const bmiSeries = bmiLogs.map((log: { date: Date; bmi: number }) => ({ date: log.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: log.bmi }));
  const weightSeries = bmiLogs.map((log: { date: Date; weight: number }) => ({ date: log.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), value: log.weight }));
  const totalChange = bmiLogs.length > 1 ? bmiLogs.at(-1)!.bmi - bmiLogs[0].bmi : null;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome back, {user?.name ?? 'athlete'}</CardTitle>
          <CardDescription>Here is the current snapshot of your fitness journey.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <SummaryTile label="Logs" value={`${bmiLogs.length} BMI checks`} />
          <SummaryTile label="Latest category" value={latestCategory} />
          <SummaryTile label="Daily streak" value={`${weekStreak} weeks`} />
        </CardContent>
      </Card>

      <ProgressDashboard
        bmiSeries={bmiSeries}
        weightSeries={weightSeries}
        streakWeeks={weekStreak}
        latestBmi={latestBmiLog?.bmi ?? null}
        startingBmi={startingBmiLog?.bmi ?? null}
        totalChange={totalChange}
        goalProgress={goalProgress}
      />

      <GoalSystem
        currentWeight={latestWeight || 75}
        initialTargetWeight={latestGoal?.targetWeight}
        initialTargetDate={latestGoal?.targetDate.toISOString().slice(0, 10)}
        logsCount={bmiLogs.length}
        streakWeeks={weekStreak}
        goalAchieved={latestGoal?.achieved ?? false}
        goalId={latestGoal?.id}
      />

      <div className="grid gap-6 xl:grid-cols-2">
        <DailyTrackers
          initialWater={latestDaily?.waterGlasses ?? 0}
          initialSleepHours={latestDaily?.sleepHours ?? 0}
          initialSleepQuality={latestDaily?.sleepQuality ?? 3}
        />
        <WorkoutPlanner
          category={latestCategory as any}
          initialCompletions={workoutCompletions.map((completion) => ({
            dayKey: completion.dayKey,
            completed: completion.completed
          }))}
        />
      </div>

      <BmiCalculator />
    </div>
  );
}

function SummaryTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-emerald-50 p-4">
      <p className="text-xs uppercase tracking-wide text-emerald-700">{label}</p>
      <p className="mt-2 text-lg font-semibold text-emerald-950">{value}</p>
    </div>
  );
}
