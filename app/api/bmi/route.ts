import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { bmiInputSchema } from '@/lib/schemas';
import { getAuthSession } from '@/lib/session';
import { calculateBmi } from '@/lib/calculators';

export async function POST(request: Request) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = bmiInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid BMI payload' }, { status: 400 });
  }

  const result = calculateBmi(parsed.data.heightCm, parsed.data.weightKg);
  const bmiLog = await prisma.bmiLog.create({
    data: {
      userId: session.user.id,
      bmi: result.bmi,
      weight: parsed.data.weightKg,
      height: parsed.data.heightCm,
      category: result.category,
      age: parsed.data.age,
      gender: parsed.data.gender,
      calories: payload.calories ? Number(payload.calories) : null
    }
  });

  const latestGoal = await prisma.goal.findFirst({
    where: {
      userId: session.user.id,
      achieved: false
    },
    orderBy: { targetDate: 'desc' }
  });

  if (latestGoal && bmiLog.weight <= latestGoal.targetWeight) {
    await prisma.goal.update({
      where: { id: latestGoal.id },
      data: { achieved: true }
    });
  }

  return NextResponse.json({ bmiLog });
}

export async function GET() {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const bmiLogs = await prisma.bmiLog.findMany({
    where: { userId: session.user.id },
    orderBy: { date: 'asc' }
  });

  return NextResponse.json({ bmiLogs });
}
