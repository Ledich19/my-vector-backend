import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { surveyResults } from './surveyResults';
import { surveyQuestions } from './surveyQuestions';
import { surveyAnswerOptions } from './surveyAnswerOptions';

export const surveyUserAnswers = pgTable('survey_user_answers', {
  id: integer('id').primaryKey(),
  resultId: integer('result_id')
    .notNull()
    .references(() => surveyResults.id, { onDelete: 'cascade' }),
  questionId: integer('question_id')
    .notNull()
    .references(() => surveyQuestions.id, { onDelete: 'cascade' }),
  selectedOptionId: integer('selected_option_id').references(
    () => surveyAnswerOptions.id,
    { onDelete: 'set null' },
  ),
  freeTextAnswer: text('free_text_answer'),
});

export const surveyUserAnswersRelations = relations(
  surveyUserAnswers,
  ({ one }) => ({
    result: one(surveyResults, {
      fields: [surveyUserAnswers.resultId],
      references: [surveyResults.id],
    }),
    question: one(surveyQuestions, {
      fields: [surveyUserAnswers.questionId],
      references: [surveyQuestions.id],
    }),
    selectedOption: one(surveyAnswerOptions, {
      fields: [surveyUserAnswers.selectedOptionId],
      references: [surveyAnswerOptions.id],
    }),
  }),
);
