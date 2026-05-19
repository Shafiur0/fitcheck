import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { goalSchema } from '@/lib/schemas';
import { getAuthSession } from '@/lib/session';

export async function GET() {
  const session = await getAuthSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const goals = await prisma.goal.findMany({
    where: { userId },
    orderBy: { targetDate: 'asc' }
  });

  return NextResponse.json({ goals });
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = goalSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid goal payload' }, { status: 400 });
  }

  const goal = await prisma.goal.create({
    data: {
      userId,
      targetWeight: parsed.data.targetWeight,
      targetDate: new Date(parsed.data.targetDate),
      achieved: false
    }
  });

  return NextResponse.json({ goal });
}
