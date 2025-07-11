import { relations } from 'drizzle-orm';
import { pgTable, text, uuid, integer } from 'drizzle-orm/pg-core';
import { scheduledDayTemplates } from './scheduledDayTemplates';

export const planTemplates = pgTable('plan_templates', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  repetitions: integer('repetitions'),
});

export const planTemplateRelations = relations(planTemplates, ({ many }) => ({
  days: many(scheduledDayTemplates),
}));
