"use client";

import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Select } from '@/components/ui/select';
import { calculateBmi, calculateTdee, idealWeightRange, suggestDietTips, suggestWorkoutIntensity, type ActivityLevel, type Gender, type BmiCategory } from '@/lib/calculators';

type UnitMode = 'metric' | 'imperial';

const categoryLabels: Record<BmiCategory, string> = {
  underweight: 'Underweight',
  normal: 'Normal',
  overweight: 'Overweight',
  obese: 'Obese'
};

const gaugeColors: Record<BmiCategory, string> = {
  underweight: 'from-sky-400 to-sky-500',
  normal: 'from-emerald-500 to-lime-500',
  overweight: 'from-amber-400 to-orange-500',
  obese: 'from-rose-500 to-red-600'
};

const activityLabels: Record<ActivityLevel, string> = {
  sedentary: 'Sedentary',
  lightly_active: 'Lightly active',
  moderately_active: 'Moderately active',
  very_active: 'Very active'
};

export function BmiCalculator() {
  const { data: session } = useSession();
  const [unitMode, setUnitMode] = useState<UnitMode>('metric');
  const [weightMode, setWeightMode] = useState<'kg' | 'lbs'>('kg');
  const [heightCm, setHeightCm] = useState(175);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);
  const [weight, setWeight] = useState(75);
  const [age, setAge] = useState(29);
  const [gender, setGender] = useState<Gender>('male');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderately_active');
  const [savedMessage, setSavedMessage] = useState('');

  const heightForCalc = unitMode === 'metric' ? heightCm : ((heightFeet * 12 + heightInches) * 2.54);
  const weightForCalc = weightMode === 'kg' ? weight : weight * 0.453592;
  const result = useMemo(() => calculateBmi(heightForCalc, weightForCalc), [heightForCalc, weightForCalc]);
  const tdee = useMemo(() => calculateTdee({ age, gender, heightCm: heightForCalc, weightKg: weightForCalc, activityLevel }), [age, gender, heightForCalc, weightForCalc, activityLevel]);
  const idealRange = idealWeightRange(heightForCalc);

  const saveCheckIn = async () => {
    setSavedMessage('');
    if (!session?.user) {
      setSavedMessage('Sign in to save this check-in.');
      return;
    }

    const response = await fetch('/api/bmi', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        bmi: result.bmi,
        weightKg: Number(weightForCalc.toFixed(1)),
        heightCm: Number(heightForCalc.toFixed(1)),
        age,
        gender,
        category: result.category,
        calories: tdee.tdee
      })
    });

    setSavedMessage(response.ok ? 'Saved to your dashboard.' : 'Could not save this check-in.');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <CardHeader>
          <CardTitle>BMI Calculator</CardTitle>
          <CardDescription>Instant body composition feedback with personalized guidance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex gap-2 rounded-2xl bg-emerald-50 p-1">
            <button className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium ${unitMode === 'metric' ? 'bg-white shadow-sm' : ''}`} onClick={() => setUnitMode('metric')} type="button">Metric</button>
            <button className={`flex-1 rounded-xl px-4 py-2 text-sm font-medium ${unitMode === 'imperial' ? 'bg-white shadow-sm' : ''}`} onClick={() => setUnitMode('imperial')} type="button">Imperial</button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>{unitMode === 'metric' ? 'Height (cm)' : 'Height (ft/in)'}</Label>
              {unitMode === 'metric' ? (
                <Input type="number" value={heightCm} onChange={(event) => setHeightCm(Number(event.target.value))} />
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" value={heightFeet} onChange={(event) => setHeightFeet(Number(event.target.value))} />
                  <Input type="number" value={heightInches} onChange={(event) => setHeightInches(Number(event.target.value))} />
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label>Weight</Label>
              <div className="grid grid-cols-[1fr_auto] gap-2">
                <Input type="number" value={weight} onChange={(event) => setWeight(Number(event.target.value))} />
                <button className="rounded-xl border border-emerald-200 bg-white px-3 text-sm" onClick={() => setWeightMode(weightMode === 'kg' ? 'lbs' : 'kg')} type="button">
                  {weightMode}
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Age</Label>
              <Input type="number" value={age} onChange={(event) => setAge(Number(event.target.value))} />
            </div>
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onChange={(event) => setGender(event.target.value as Gender)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Activity level</Label>
            <Select value={activityLevel} onChange={(event) => setActivityLevel(event.target.value as ActivityLevel)}>
              {Object.entries(activityLabels).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </Select>
          </div>
          <Button onClick={saveCheckIn} className="w-full">Save this check-in</Button>
          <p className="text-sm text-emerald-900/70">{savedMessage}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>{result.bmi}</CardTitle>
              <CardDescription>Your BMI</CardDescription>
            </div>
            <Badge>{categoryLabels[result.category]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <div>
            <div className="mb-2 flex items-center justify-between text-sm text-emerald-900/70">
              <span>Category gauge</span>
              <span>{result.category}</span>
            </div>
            <div className="h-4 rounded-full bg-emerald-100 p-1">
              <div className={`h-full rounded-full bg-gradient-to-r ${gaugeColors[result.category]}`} style={{ width: `${Math.min(100, Math.max(18, result.bmi * 3))}%` }} />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs uppercase text-emerald-700">Recommended calories</p>
              <p className="mt-1 text-lg font-semibold">{tdee.tdee} kcal</p>
              <p className="text-sm text-emerald-900/70">Lose weight: {tdee.loseWeight}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 p-4">
              <p className="text-xs uppercase text-emerald-700">Ideal weight range</p>
              <p className="mt-1 text-lg font-semibold">{idealRange.min} - {idealRange.max} kg</p>
              <p className="text-sm text-emerald-900/70">Based on your height</p>
            </div>
          </div>
          <div className="space-y-3">
            <AdviceCard title="Workout intensity" text={suggestWorkoutIntensity(result.category)} />
            <AdviceCard title="Diet tips" text={suggestDietTips(result.category).join(' • ')} />
            <AdviceCard title="TDEE" text={`Maintenance ${tdee.tdee} kcal | Gain muscle ${tdee.gainMuscle} kcal | BMR ${tdee.bmr} kcal`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdviceCard({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4">
      <p className="text-sm font-semibold text-emerald-950">{title}</p>
      <p className="mt-1 text-sm leading-6 text-emerald-900/75">{text}</p>
    </div>
  );
}
