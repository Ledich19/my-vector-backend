export const scoringMethods = ['sum'] as const;

export type ScoringMethodType = (typeof scoringMethods)[number];
