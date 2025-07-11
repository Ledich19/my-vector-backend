export const inputFormats = [
  'repetition',
  'duration',
  'text',
  'boolean',
] as const;

export type InputFormat = (typeof inputFormats)[number];
