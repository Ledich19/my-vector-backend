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
  'love',
  'grateful',
  'frustrated',
  'shame',
  'guilt',
  'jealous',
  'embarrassed',
] as const;

export const emotionCategories = ['positive', 'negative', 'neutral'] as const;

export type EmotionCategory = (typeof emotionCategories)[number];
export type Emotion = (typeof emotionValues)[number];
