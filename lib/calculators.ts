export type BmiCategory = 'underweight' | 'normal' | 'overweight' | 'obese';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
export type Gender = 'male' | 'female' | 'other';

const categoryByBmi = (bmi: number): BmiCategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

export const getBmiCategory = categoryByBmi;

export const calculateBmi = (heightCm: number, weightKg: number) => {
  const bmi = weightKg / Math.pow(heightCm / 100, 2);
  const roundedBmi = Number.isFinite(bmi) ? Number(bmi.toFixed(1)) : 0;
  const category = categoryByBmi(roundedBmi);
  return { bmi: roundedBmi, category };
};

export const calculateTdee = (args: {
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  activityLevel: ActivityLevel;
}) => {
  const { age, gender, heightCm, weightKg, activityLevel } = args;
  const bmrBase = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = gender === 'male' ? bmrBase + 5 : bmrBase - 161;
  const factors: Record<ActivityLevel, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725
  };
  const tdee = Math.round(bmr * factors[activityLevel]);
  return {
    bmr: Math.round(bmr),
    tdee,
    loseWeight: Math.round(tdee - 400),
    gainMuscle: Math.round(tdee + 250)
  };
};

export const idealWeightRange = (heightCm: number) => {
  const min = 18.5 * Math.pow(heightCm / 100, 2);
  const max = 24.9 * Math.pow(heightCm / 100, 2);
  return {
    min: Number(min.toFixed(1)),
    max: Number(max.toFixed(1))
  };
};

export const suggestWorkoutIntensity = (category: BmiCategory) => {
  switch (category) {
    case 'underweight':
      return 'Moderate strength training with recovery-focused cardio';
    case 'normal':
      return 'Balanced mix of strength and cardio 4-5 days/week';
    case 'overweight':
      return 'Low-impact cardio, walking, and progressive strength work';
    case 'obese':
      return 'Start with joint-friendly cardio, mobility, and light resistance';
  }
};

export const suggestDietTips = (category: BmiCategory) => {
  switch (category) {
    case 'underweight':
      return ['Add calorie-dense meals', 'Prioritize protein every meal', 'Use snacks between meals'];
    case 'normal':
      return ['Keep protein high', 'Balance carbs around workouts', 'Stay consistent with portions'];
    case 'overweight':
      return ['Build meals around lean protein and fiber', 'Reduce liquid calories', 'Track portions for 2 weeks'];
    case 'obese':
      return ['Start with simple meals you can repeat', 'Increase vegetables and protein', 'Cut ultra-processed snacks first'];
  }
};

export const calorieTargets = (tdee: number) => ({
  maintenance: tdee,
  loseWeight: Math.round(tdee - 400),
  gainMuscle: Math.round(tdee + 250)
});

export const waterGoal = 8;

export const workoutPlanForCategory = (category: BmiCategory) => {
  const templates = {
    underweight: [
      ['Upper body strength', '3 x 8-10', 'moderate'],
      ['Lower body strength', '3 x 8-10', 'moderate'],
      ['Active recovery walk', '20 min', 'easy'],
      ['Push strength', '3 x 8', 'moderate'],
      ['Pull strength', '3 x 8', 'moderate'],
      ['Mobility and core', '15 min', 'easy'],
      ['Full body lift', '3 x 6-8', 'moderate']
    ],
    normal: [
      ['Strength upper', '4 x 8', 'moderate'],
      ['Cardio intervals', '25 min', 'challenging'],
      ['Strength lower', '4 x 8', 'moderate'],
      ['Mobility', '20 min', 'easy'],
      ['Full body circuit', '3 rounds', 'moderate'],
      ['Zone 2 cardio', '35 min', 'easy'],
      ['Rest or stretch', '15 min', 'easy']
    ],
    overweight: [
      ['Brisk walk', '30 min', 'easy'],
      ['Light cardio + core', '20 min', 'easy'],
      ['Incline walk', '25 min', 'moderate'],
      ['Bodyweight strength', '3 x 10', 'moderate'],
      ['Recovery walk', '20 min', 'easy'],
      ['Low-impact cardio', '30 min', 'moderate'],
      ['Mobility reset', '15 min', 'easy']
    ],
    obese: [
      ['Easy walk', '15-20 min', 'easy'],
      ['Chair strength', '3 x 8', 'easy'],
      ['Walk breaks', '10 x 2 min', 'easy'],
      ['Mobility flow', '15 min', 'easy'],
      ['Low-impact cardio', '20 min', 'moderate'],
      ['Strength circuit', '2 x 10', 'easy'],
      ['Rest and stretch', '15 min', 'easy']
    ]
  } as const;

  return templates[category].map(([name, details, difficulty], index) => ({
    day: `Day ${index + 1}`,
    name,
    details,
    difficulty
  }));
};

export const streakWeeks = (dates: Date[]) => {
  if (dates.length === 0) return 0;
  const sorted = [...dates].sort((a, b) => a.getTime() - b.getTime());
  let streak = 1;
  let anchor = sorted[sorted.length - 1];
  for (let index = sorted.length - 2; index >= 0; index -= 1) {
    const diffWeeks = (anchor.getTime() - sorted[index].getTime()) / (1000 * 60 * 60 * 24 * 7);
    if (diffWeeks <= 1.15) {
      streak += 1;
      anchor = sorted[index];
    } else {
      break;
    }
  }
  return streak;
};
