import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { surveys } from './surveys';

export const surveyScoringThresholds = pgTable('survey_scoring_thresholds', {
  id: integer('id').primaryKey(),
  surveyId: integer('survey_id')
    .notNull()
    .references(() => surveys.id, { onDelete: 'cascade' }),
  min: integer('min').notNull(),
  max: integer('max').notNull(),
  label: text('label').notNull(),
});

export const surveyScoringThresholdsRelations = relations(
  surveyScoringThresholds,
  ({ one }) => ({
    survey: one(surveys, {
      fields: [surveyScoringThresholds.surveyId],
      references: [surveys.id],
    }),
  }),
);
