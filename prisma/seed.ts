import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';
import { calculateBmi, workoutPlanForCategory } from '../lib/calculators';

async function main() {
  const passwordHash = await bcrypt.hash('Demo1234!', 12);

  const user = await prisma.user.upsert({
    where: { email: 'demo@fitcheck.app' },
    update: {
      name: 'Demo Athlete',
      image: null,
      passwordHash
    },
    create: {
      name: 'Demo Athlete',
      email: 'demo@fitcheck.app',
      passwordHash,
      image: null
    }
  });

  const existingBmiLogs = await prisma.bmiLog.count({ where: { userId: user.id } });
  if (existingBmiLogs === 0) {
    const sampleLogs = [
      { height: 178, weight: 82, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 28) },
      { height: 178, weight: 80, date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14) },
      { height: 178, weight: 78, date: new Date() }
    ];

    for (const sample of sampleLogs) {
      const result = calculateBmi(sample.height, sample.weight);
      await prisma.bmiLog.create({
        data: {
          userId: user.id,
          bmi: result.bmi,
          weight: sample.weight,
          height: sample.height,
          date: sample.date,
          category: result.category,
          age: 29,
          gender: 'male',
          calories: 2400
        }
      });
    }
  }

  const latestLog = await prisma.bmiLog.findFirst({
    where: { userId: user.id },
    orderBy: { date: 'desc' }
  });

  const existingDailyLogs = await prisma.dailyLog.count({ where: { userId: user.id } });
  if (existingDailyLogs === 0) {
    await prisma.dailyLog.create({
      data: {
        userId: user.id,
        date: new Date(),
        waterGlasses: 6,
        sleepHours: 7.5,
        sleepQuality: 4
      }
    });
  }

  const existingGoal = await prisma.goal.count({ where: { userId: user.id } });
  if (existingGoal === 0) {
    await prisma.goal.create({
      data: {
        userId: user.id,
        targetWeight: 74,
        targetDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        achieved: false
      }
    });
  }

  if (latestLog) {
    const plan = workoutPlanForCategory(latestLog.category as Parameters<typeof workoutPlanForCategory>[0]);
    const existingWorkouts = await prisma.workoutCompletion.count({ where: { userId: user.id, category: latestLog.category } });
    if (existingWorkouts === 0) {
      for (const day of plan) {
        await prisma.workoutCompletion.create({
          data: {
            userId: user.id,
            category: latestLog.category,
            dayKey: day.day,
            exerciseName: day.name,
            details: day.details,
            difficulty: day.difficulty,
            completed: day.day === 'Day 1' || day.day === 'Day 2'
          }
        });
      }
    }
  }

  console.log('Seeded FitCheck demo user: demo@fitcheck.app / Demo1234!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });