import { relations } from 'drizzle-orm';
import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core';
import { scheduledDayTemplates } from './scheduledDayTemplates';

export const planTemplates = pgTable('plan_templates', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  repetitions: integer('repetitions'),
});

export const planTemplateRelations = relations(planTemplates, ({ many }) => ({
  days: many(scheduledDayTemplates),
}));
