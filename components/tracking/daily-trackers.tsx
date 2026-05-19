"use client";

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { waterGoal } from '@/lib/calculators';
import { Droplets, MoonStar } from 'lucide-react';

export function DailyTrackers({ initialWater = 0, initialSleepHours = 0, initialSleepQuality = 3 }: { initialWater?: number; initialSleepHours?: number; initialSleepQuality?: number }) {
  const [waterGlasses, setWaterGlasses] = useState(initialWater);
  const [sleepHours, setSleepHours] = useState(initialSleepHours);
  const [sleepQuality, setSleepQuality] = useState(initialSleepQuality);
  const [status, setStatus] = useState('');

  const percent = useMemo(() => Math.min(100, Math.round((waterGlasses / waterGoal) * 100)), [waterGlasses]);

  const save = async (nextValues?: { waterGlasses?: number; sleepHours?: number; sleepQuality?: number }) => {
    const response = await fetch('/api/daily', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        waterGlasses: nextValues?.waterGlasses ?? waterGlasses,
        sleepHours: nextValues?.sleepHours ?? sleepHours,
        sleepQuality: nextValues?.sleepQuality ?? sleepQuality
      })
    });
    setStatus(response.ok ? 'Daily log saved.' : 'Could not save daily log.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Droplets className="h-5 w-5" /> Water tracker</CardTitle>
          <CardDescription>Tap the glass to hit your 8-glass goal.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
            {Array.from({ length: waterGoal }).map((_, index) => {
              const filled = index < waterGlasses;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    const next = Math.min(waterGoal, Math.max(index + 1, waterGlasses));
                    setWaterGlasses(next);
                    void save({ waterGlasses: next });
                  }}
                  className={`aspect-square rounded-2xl border p-3 text-2xl transition ${filled ? 'border-emerald-500 bg-emerald-100' : 'border-emerald-200 bg-white'}`}
                >
                  🥤
                </button>
              );
            })}
          </div>
          <Progress value={percent} />
          <p className="text-sm text-emerald-900/70">{waterGlasses}/{waterGoal} glasses today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MoonStar className="h-5 w-5" /> Sleep logger</CardTitle>
          <CardDescription>Track hours slept and quality from 1 to 5.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sleep-hours">Hours slept</Label>
            <Input id="sleep-hours" type="number" step="0.1" value={sleepHours} onChange={(event) => setSleepHours(Number(event.target.value))} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sleep-quality">Quality rating</Label>
            <Input id="sleep-quality" type="number" min={1} max={5} value={sleepQuality} onChange={(event) => setSleepQuality(Number(event.target.value))} />
          </div>
          <Button className="w-full" onClick={() => void save()} type="button">Save sleep log</Button>
          <p className="text-sm text-emerald-900/70">{status}</p>
        </CardContent>
      </Card>
    </div>
  );
}
