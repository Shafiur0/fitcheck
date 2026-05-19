import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/session';

export async function PATCH(_request: Request, { params }: { params: { goalId: string } }) {
  const session = await getAuthSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { goalId } = params;
  const goal = await prisma.goal.findFirst({
    where: {
      id: goalId,
      userId
    }
  });

  if (!goal) {
    return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
  }

  const updatedGoal = await prisma.goal.update({
    where: { id: goalId },
    data: { achieved: true }
  });

  return NextResponse.json({ goal: updatedGoal });
}
