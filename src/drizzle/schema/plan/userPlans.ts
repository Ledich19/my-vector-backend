import {
  pgTable,
  integer,
  timestamp,
  index,
  serial,
} from 'drizzle-orm/pg-core';
import { planTemplates } from './planTemplates';
import { relations } from 'drizzle-orm';
import { userScheduledDays } from './userScheduledDays';

export const userPlans = pgTable(
  'user_plans',
  {
    id: serial('id').primaryKey(),
    templateId: integer('template_id')
      .notNull()
      .references(() => planTemplates.id, { onDelete: 'restrict' }),
    userId: integer('user_id').notNull(),
    startDate: timestamp('start_date').notNull(),
    repetitions: integer('repetitions'),
  },
  (table) => [index('idx_template_id_user_id').on(table.userId)],
);

export const userPlansRelations = relations(userPlans, ({ one, many }) => ({
  template: one(planTemplates, {
    fields: [userPlans.templateId],
    references: [planTemplates.id],
  }),
  days: many(userScheduledDays),
}));
