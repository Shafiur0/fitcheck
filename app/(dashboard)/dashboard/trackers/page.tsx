import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/session';
import { DailyTrackers } from '@/components/tracking/daily-trackers';

export default async function TrackersPage() {
  const session = await getAuthSession();
  const latest = session?.user?.id
    ? await prisma.dailyLog.findFirst({ where: { userId: session.user.id }, orderBy: { date: 'desc' } })
    : null;

  return (
    <DailyTrackers
      initialWater={latest?.waterGlasses ?? 0}
      initialSleepHours={latest?.sleepHours ?? 0}
      initialSleepQuality={latest?.sleepQuality ?? 3}
    />
  );
}
