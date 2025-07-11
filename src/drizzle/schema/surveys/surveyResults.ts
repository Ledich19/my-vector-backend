import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { surveys } from './surveys';
import { surveyUserAnswers } from './surveyUserAnswers';

export const surveyResults = pgTable('survey_results', {
  id: integer('id').primaryKey(),
  userId: integer('user_id').notNull(),
  surveyId: integer('survey_id')
    .notNull()
    .references(() => surveys.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  totalScore: integer('total_score').notNull(),
  resultLabel: text('result_label'),
});

export const surveyResultsRelations = relations(
  surveyResults,
  ({ one, many }) => ({
    survey: one(surveys, {
      fields: [surveyResults.surveyId],
      references: [surveys.id],
    }),
    answers: many(surveyUserAnswers),
  }),
);
