import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { scheduledDayTemplates } from './scheduledDayTemplates';
import { exercises } from './exercises';
import { relations } from 'drizzle-orm';

export const exerciseSlotTemplates = pgTable('exercise_slot_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  scheduledDayTemplateId: uuid('scheduled_day_template_id')
    .notNull()
    .references(() => scheduledDayTemplates.id),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercises.id),
  time: text('time'),
  repetitions: integer('repetitions'),
  durationSeconds: integer('duration_seconds'),
});

export const exerciseSlotTemplateRelations = relations(
  exerciseSlotTemplates,
  ({ one }) => ({
    scheduledDayTemplate: one(scheduledDayTemplates, {
      fields: [exerciseSlotTemplates.scheduledDayTemplateId],
      references: [scheduledDayTemplates.id],
    }),
    exercise: one(exercises, {
      fields: [exerciseSlotTemplates.exerciseId],
      references: [exercises.id],
    }),
  }),
);
