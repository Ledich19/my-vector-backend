import {
  pgTable,
  text,
  integer,
  serial,
  timestamp,
  date,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userPsyTasks } from './userPsyTasks';
import { users } from '../users';

export const userPsyPlans = pgTable('user_psy_plans', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  startDate: date('start_date').notNull(),
  endDate: date('end_date'),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const userPsyPlanRelations = relations(
  userPsyPlans,
  ({ many, one }) => ({
    tasks: many(userPsyTasks),
    user: one(users, {
      fields: [userPsyPlans.userId],
      references: [users.id],
    }),
  }),
);
