import { pgTable, text, integer, serial } from 'drizzle-orm/pg-core';
import { psyPlanTemplates } from './psyPlanTemplates';
import { relations } from 'drizzle-orm';

export const psyTaskTemplates = pgTable('psy_task_templates', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  dayNumber: integer('day_number').notNull(), // порядковый номер дня в плане
  order: integer('order').notNull(), // порядок выполнения в дне
  planTemplateId: integer('plan_template_id')
    .notNull()
    .references(() => psyPlanTemplates.id, { onDelete: 'cascade' }),
});

export const psyTaskTemplateRelations = relations(
  psyTaskTemplates,
  ({ one }) => ({
    planTemplate: one(psyPlanTemplates, {
      fields: [psyTaskTemplates.planTemplateId],
      references: [psyPlanTemplates.id],
    }),
  }),
);
