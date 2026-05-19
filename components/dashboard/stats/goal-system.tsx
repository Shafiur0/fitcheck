"use client";

import { useEffect, useMemo, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Trophy, Flame, Medal, Target } from 'lucide-react';

export function GoalSystem({ currentWeight, initialTargetWeight, initialTargetDate, logsCount, streakWeeks, goalAchieved, goalId }: { currentWeight: number; initialTargetWeight?: number; initialTargetDate?: string; logsCount: number; streakWeeks: number; goalAchieved: boolean; goalId?: string | null; }) {
  const [targetWeight, setTargetWeight] = useState(initialTargetWeight ?? currentWeight - 5);
  const [targetDate, setTargetDate] = useState(initialTargetDate ?? new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10));
  const [status, setStatus] = useState('');
  const [isGoalAchieved, setIsGoalAchieved] = useState(goalAchieved);

  useEffect(() => {
    setIsGoalAchieved(goalAchieved);
  }, [goalAchieved]);

  const shouldAchieveGoal = Boolean(goalId && !isGoalAchieved && currentWeight <= targetWeight);

  const goalProgress = useMemo(() => {
    const diff = Math.max(0, currentWeight - targetWeight);
    return Math.min(100, Math.max(0, (diff / Math.max(1, currentWeight - (currentWeight - 20))) * 100));
  }, [currentWeight, targetWeight]);

  useEffect(() => {
    const markGoalAsReached = async () => {
      if (!shouldAchieveGoal || !goalId) return;
      const response = await fetch(`/api/goals/${goalId}`, { method: 'PATCH' });
      if (response.ok) {
        setStatus('Goal reached and synced.');
        setIsGoalAchieved(true);
      }
    };

    void markGoalAsReached();
  }, [goalId, shouldAchieveGoal]);

  const saveGoal = async () => {
    const response = await fetch('/api/goals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        targetWeight,
        targetDate: new Date(targetDate).toISOString()
      })
    });
    setStatus(response.ok ? 'Goal saved.' : 'Could not save goal.');
  };

  const badges = [
    { label: 'First Check-In', reached: logsCount >= 1, icon: <Trophy className="h-4 w-4" /> },
    { label: '5 Logs', reached: logsCount >= 5, icon: <Medal className="h-4 w-4" /> },
    { label: '1 Month Streak', reached: streakWeeks >= 4, icon: <Flame className="h-4 w-4" /> },
    { label: 'Goal Reached', reached: isGoalAchieved, icon: <Target className="h-4 w-4" /> }
  ];

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Goal setup</CardTitle>
          <CardDescription>Set your target weight and target date.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="targetWeight">Target weight</Label>
            <Input id="targetWeight" type="number" value={targetWeight} onChange={(event) => setTargetWeight(Number(event.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetDate">Target date</Label>
            <Input id="targetDate" type="date" value={targetDate} onChange={(event) => setTargetDate(event.target.value)} />
          </div>
          <Button className="w-full" onClick={() => void saveGoal()} type="button">Save goal</Button>
          <p className="text-sm text-emerald-900/70">{status}</p>
          <div className="space-y-3 rounded-2xl bg-emerald-50 p-4">
            <div className="flex items-center justify-between text-sm"><span>Progress to target</span><span>{Math.round(goalProgress)}%</span></div>
            <Progress value={goalProgress} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Badges</CardTitle>
          <CardDescription>Earn milestones as you stay consistent.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {badges.map((badge) => (
            <div key={badge.label} className={`rounded-2xl border p-4 ${badge.reached ? 'border-emerald-500 bg-emerald-50' : 'border-emerald-100 bg-white'}`}>
              <div className="flex items-center gap-2 text-emerald-700">{badge.icon}<span className="text-sm font-medium">{badge.label}</span></div>
              <p className="mt-2 text-sm text-emerald-900/70">{badge.reached ? 'Unlocked' : 'Locked'}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
