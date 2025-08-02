import {
  pgTable,
  integer,
  boolean,
  serial,
  date,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userPsyPlans } from './userPsyPlans';
import { psyTaskTemplates } from './psyTaskTemplates';
export const userPsyTasks = pgTable('user_psy_tasks', {
  id: serial('id').primaryKey(),
  userPsyPlanId: integer('user_psy_plan_id')
    .notNull()
    .references(() => userPsyPlans.id, { onDelete: 'cascade' }),
  originalTaskTemplateId: integer('original_task_template_id').references(
    () => psyTaskTemplates.id,
    { onDelete: 'set null' },
  ),

  titleOverride: varchar('title_override', { length: 120 }),
  descriptionOverride: varchar('description_override', { length: 1000 }),

  dayNumber: integer('day_number').notNull(), // Номер дня в плане (например, 1, 2, 3 и т.д.)
  taskDate: date('task_date').notNull(),

  order: integer('order').notNull(), // Порядок выполнения задачи внутри дня (для сортировки)

  isCompleted: boolean('is_completed').default(false),
  notes: varchar('notes', { length: 1000 }),
});

export const userPsyTaskRelations = relations(userPsyTasks, ({ one }) => ({
  userPsyPlan: one(userPsyPlans, {
    fields: [userPsyTasks.userPsyPlanId],
    references: [userPsyPlans.id],
  }),
  originalTaskTemplate: one(psyTaskTemplates, {
    fields: [userPsyTasks.originalTaskTemplateId],
    references: [psyTaskTemplates.id],
  }),
}));
