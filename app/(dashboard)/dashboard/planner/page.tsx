import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/session';
import { WorkoutPlanner } from '@/components/dashboard/planner/workout-planner';
import { calculateBmi } from '@/lib/calculators';

export default async function PlannerPage() {
  const session = await getAuthSession();
  const latest = session?.user?.id
    ? await prisma.bmiLog.findFirst({ where: { userId: session.user.id }, orderBy: { date: 'desc' } })
    : null;
  const category = latest?.category ?? calculateBmi(175, 75).category;
  return <WorkoutPlanner category={category as any} />;
}
