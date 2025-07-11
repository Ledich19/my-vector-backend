export const exerciseTypes = [
  'strength',
  'cardio',
  'flexibility',
  'memory',
  'speech',
  'reflection',
] as const;

export type ExerciseType = (typeof exerciseTypes)[number];
