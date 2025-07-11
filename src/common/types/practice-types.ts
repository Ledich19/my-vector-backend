export const practiceTypes = [
  'physical',
  'cognitive',
  'verbal',
  'reflective',
] as const;

export type PracticeType = (typeof practiceTypes)[number];
