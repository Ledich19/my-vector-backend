export const emotionValues = [
  'happy',
  'sad',
  'angry',
  'tired',
  'anxious',
  'excited',
  'neutral',
  'confused',
  'bored',
  'surprised',
  'proud',
  'disgusted',
  'fearful',
  'lonely',
  'hopeful',
  'relaxed',
] as const;

export type Emotion = (typeof emotionValues)[number];
