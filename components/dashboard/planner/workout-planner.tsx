"use client";

import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { workoutPlanForCategory, type BmiCategory } from '@/lib/calculators';
import { CheckCircle2 } from 'lucide-react';

type WorkoutCompletion = {
  dayKey: string;
  completed: boolean;
};

export function WorkoutPlanner({ category, initialCompletions = [] }: { category: BmiCategory; initialCompletions?: WorkoutCompletion[] }) {
  const plan = useMemo(() => workoutPlanForCategory(category), [category]);
  const [completed, setCompleted] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(initialCompletions.map((item) => [item.dayKey, item.completed]))
  );
  const [status, setStatus] = useState('');

  useEffect(() => {
    setCompleted(Object.fromEntries(initialCompletions.map((item) => [item.dayKey, item.completed])));
  }, [category, initialCompletions]);

  const toggleCompletion = async (dayKey: string, nextCompleted: boolean) => {
    setCompleted((current) => ({ ...current, [dayKey]: nextCompleted }));
    setStatus('');
    const response = await fetch('/api/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category, dayKey, completed: nextCompleted })
    });
    setStatus(response.ok ? 'Workout progress synced.' : 'Could not sync workout progress.');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>7-day workout plan</CardTitle>
        <CardDescription>Generated for the {category} BMI category.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {plan.map((day) => {
          const done = completed[day.day];
          return (
            <div key={day.day} className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${done ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-100 bg-white'}`}>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-emerald-950">{day.day}</p>
                  <Badge variant={day.difficulty === 'challenging' ? 'default' : 'secondary'}>{day.difficulty}</Badge>
                </div>
                <p className="text-sm text-emerald-900/80">{day.name}</p>
                <p className="text-sm text-emerald-900/60">{day.details}</p>
              </div>
              <Button variant={done ? 'secondary' : 'outline'} onClick={() => void toggleCompletion(day.day, !done)} type="button">
                <CheckCircle2 className="h-4 w-4" /> {done ? 'Completed' : 'Mark complete'}
              </Button>
            </div>
          );
        })}
        <p className="text-sm text-emerald-900/70">{status}</p>
      </CardContent>
    </Card>
  );
}
