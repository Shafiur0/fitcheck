import { z } from 'zod';

export const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8)
});

export const bmiInputSchema = z.object({
  heightCm: z.number().positive(),
  weightKg: z.number().positive(),
  age: z.number().int().positive(),
  gender: z.enum(['male', 'female', 'other']),
  activityLevel: z.enum(['sedentary', 'lightly_active', 'moderately_active', 'very_active'])
});

export const dailyLogSchema = z.object({
  date: z.string().datetime().optional(),
  waterGlasses: z.number().int().min(0).max(64),
  sleepHours: z.number().min(0).max(24),
  sleepQuality: z.number().int().min(1).max(5)
});

export const goalSchema = z.object({
  targetWeight: z.number().positive(),
  targetDate: z.string().datetime()
});
