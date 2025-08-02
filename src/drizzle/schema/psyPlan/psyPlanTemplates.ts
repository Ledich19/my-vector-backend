import { relations } from 'drizzle-orm';
import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core';
import { psyTaskTemplates } from './psyTaskTemplates';

export const psyPlanTemplates = pgTable('psy_plan_templates', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  repetitions: integer('repetitions'),
});

export const psyPlanTemplateRelations = relations(
  psyPlanTemplates,
  ({ many }) => ({
    tasks: many(psyTaskTemplates),
  }),
);
