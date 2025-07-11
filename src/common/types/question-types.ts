export const questionTypes = [
  'scale', // Вопрос с ответом по числовой шкале (например, 0–4)
  'single-choice', // Вопрос с выбором одного варианта ответа
  'multiple-choice', // Вопрос с выбором нескольких вариантов ответа
  'text', // Открытый текстовый ответ
] as const;

export type QuestionType = (typeof questionTypes)[number];
