import { relations } from 'drizzle-orm';
import { pgTable, text, integer, serial, varchar } from 'drizzle-orm/pg-core';
import { psyTaskTemplates } from './psyTaskTemplates';

export const psyPlanTemplates = pgTable('psy_plan_templates', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  repetitions: integer('repetitions'),
  source: text('source'), // источник шаблона (например, текст с заданиями в формате маркдавна в будующем возможно будет использоваться АI для генерации и парсинга заданий)
  status: varchar('status', { length: 20 }).default('active'),
});

export const psyPlanTemplateRelations = relations(
  psyPlanTemplates,
  ({ many }) => ({
    tasks: many(psyTaskTemplates),
  }),
);
