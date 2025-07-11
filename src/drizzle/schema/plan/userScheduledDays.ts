import {
  pgTable,
  text,
  uuid,
  integer,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { userPlans } from './userPlans';
import { scheduledDayTemplates } from './scheduledDayTemplates';
import { relations } from 'drizzle-orm';
import { userExerciseSlots } from './userExerciseSlots';

export const userScheduledDays = pgTable(
  'user_scheduled_days',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userPlanId: uuid('user_plan_id')
      .notNull()
      .references(() => userPlans.id, { onDelete: 'cascade' }),
    templateDayId: uuid('template_day_id')
      .notNull()
      .references(() => scheduledDayTemplates.id, { onDelete: 'cascade' }),
    date: timestamp('date'),
    dayNumber: integer('day_number'),
    notes: text('notes'),
  },
  (table) => [index('idx_user_plan_id_day_number').on(table.userPlanId)],
);

export const userScheduledDayRelations = relations(
  userScheduledDays,
  ({ one, many }) => ({
    userPlan: one(userPlans, {
      fields: [userScheduledDays.userPlanId],
      references: [userPlans.id],
    }),
    templateDay: one(scheduledDayTemplates, {
      fields: [userScheduledDays.templateDayId],
      references: [scheduledDayTemplates.id],
    }),
    slots: many(userExerciseSlots),
  }),
);
