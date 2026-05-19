import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthSession } from '@/lib/session';
import { workoutPlanForCategory } from '@/lib/calculators';
import { z } from 'zod';

const workoutCompletionSchema = z.object({
  category: z.enum(['underweight', 'normal', 'overweight', 'obese']),
  dayKey: z.string().min(1),
  completed: z.boolean().optional()
});

export async function GET(request: Request) {
  const session = await getAuthSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');

  const where = category
    ? {
        userId,
        category
      }
    : { userId };

  const completions = await prisma.workoutCompletion.findMany({
    where,
    orderBy: { dayKey: 'asc' }
  });

  return NextResponse.json({ completions });
}

export async function POST(request: Request) {
  const session = await getAuthSession();
  const userId = (session?.user as { id?: string } | undefined)?.id;
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const parsed = workoutCompletionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid workout completion' }, { status: 400 });
  }

  const plan = workoutPlanForCategory(parsed.data.category);
  const workout = plan.find((day) => day.day === parsed.data.dayKey);
  if (!workout) {
    return NextResponse.json({ error: 'Workout day not found' }, { status: 404 });
  }

  const completion = await prisma.workoutCompletion.upsert({
    where: {
      userId_category_dayKey: {
        userId,
        category: parsed.data.category,
        dayKey: parsed.data.dayKey
      }
    },
    update: {
      exerciseName: workout.name,
      details: workout.details,
      difficulty: workout.difficulty,
      completed: parsed.data.completed ?? true
    },
    create: {
      userId,
      category: parsed.data.category,
      dayKey: parsed.data.dayKey,
      exerciseName: workout.name,
      details: workout.details,
      difficulty: workout.difficulty,
      completed: parsed.data.completed ?? true
    }
  });

  return NextResponse.json({ completion });
}
