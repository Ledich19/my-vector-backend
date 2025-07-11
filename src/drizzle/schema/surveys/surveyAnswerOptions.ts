import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { surveyQuestions } from './surveyQuestions';
import { surveyUserAnswers } from './surveyUserAnswers';

export const surveyAnswerOptions = pgTable('survey_answer_options', {
  id: integer('id').primaryKey(),
  questionId: integer('question_id')
    .notNull()
    .references(() => surveyQuestions.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  value: integer('value').notNull(),
});

export const surveyAnswerOptionsRelations = relations(
  surveyAnswerOptions,
  ({ one, many }) => ({
    question: one(surveyQuestions, {
      fields: [surveyAnswerOptions.questionId],
      references: [surveyQuestions.id],
    }),
    userAnswers: many(surveyUserAnswers),
  }),
);
