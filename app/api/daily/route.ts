import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { dailyLogSchema } from '@/lib/schemas';
import { getAuthSession } from '@/lib/session';

export async function GET() {
  const session = await getAuthSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const logs = await prisma.dailyLog.findMany({
    where: { userId },
    orderBy: { date: 'desc' },
    take: 30
  });

  return NextResponse.json({ logs });
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = dailyLogSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid daily log' }, { status: 400 });
  }

  const date = parsed.data.date ? new Date(parsed.data.date) : new Date();
  date.setHours(0, 0, 0, 0);
  const log = await prisma.dailyLog.upsert({
    where: {
      userId_date: {
        userId,
        date
      }
    },
    update: {
      waterGlasses: parsed.data.waterGlasses,
      sleepHours: parsed.data.sleepHours,
      sleepQuality: parsed.data.sleepQuality
    },
    create: {
      userId,
      date,
      waterGlasses: parsed.data.waterGlasses,
      sleepHours: parsed.data.sleepHours,
      sleepQuality: parsed.data.sleepQuality
    }
  });

  return NextResponse.json({ log });
}
