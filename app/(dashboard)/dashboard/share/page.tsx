import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/session';
import { ShareableBmiCard } from '@/components/dashboard/share/shareable-bmi-card';

export default async function SharePage() {
  const session = await getAuthSession();
  const latest = session?.user?.id
    ? await prisma.bmiLog.findFirst({ where: { userId: session.user.id }, orderBy: { date: 'desc' } })
    : null;

  return (
    <ShareableBmiCard
      name={session?.user?.name ?? 'FitCheck Member'}
      bmi={latest?.bmi ?? 0}
      category={latest?.category ?? 'normal'}
      date={(latest?.date ?? new Date()).toLocaleDateString()}
    />
  );
}
