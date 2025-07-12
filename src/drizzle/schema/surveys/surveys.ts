import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { surveyQuestions } from './surveyQuestions';
import { surveyScoringThresholds } from './surveyScoringThresholds';
import { surveyResults } from './surveyResults';

export const surveys = pgTable('surveys', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'),
  scoringMethod: text('scoring_method').notNull(),
  scoringFormula: text('scoring_formula'),
});

export const surveysRelations = relations(surveys, ({ many }) => ({
  questions: many(surveyQuestions),
  thresholds: many(surveyScoringThresholds),
  results: many(surveyResults),
}));
