import { pgTable, integer, index, serial } from 'drizzle-orm/pg-core';
import { planTemplates } from './planTemplates';
import { relations } from 'drizzle-orm';
import { exerciseSlotTemplates } from './exerciseSlotTemplates';

export const scheduledDayTemplates = pgTable(
  'scheduled_day_templates',
  {
    id: serial('id').primaryKey(),
    planTemplateId: integer('plan_template_id')
      .notNull()
      .references(() => planTemplates.id, { onDelete: 'cascade' }),
    dayNumber: integer('day_number').notNull(),
    repetitions: integer('repetitions'),
  },
  (table) => [
    index('idx_plan_template_id_day_number').on(table.planTemplateId),
  ],
);

export const scheduledDayTemplateRelations = relations(
  scheduledDayTemplates,
  ({ one, many }) => ({
    planTemplate: one(planTemplates, {
      fields: [scheduledDayTemplates.planTemplateId],
      references: [planTemplates.id],
    }),
    slots: many(exerciseSlotTemplates),
  }),
);
