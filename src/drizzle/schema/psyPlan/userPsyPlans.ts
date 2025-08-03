import {
  pgTable,
  text,
  integer,
  serial,
  timestamp,
  date,
  varchar,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userPsyTasks } from './userPsyTasks';
import { users } from '../users';
import { psyPlanTemplates } from './psyPlanTemplates';

export const userPsyPlans = pgTable('user_psy_plans', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  title: text('title').notNull(),
  description: text('description'),

  startDate: date('start_date').notNull(),
  endDate: date('end_date'),

  templateId: integer('template_id').references(() => psyPlanTemplates.id, {
    onDelete: 'set null',
  }),
  templateVersion: integer('template_version').notNull(),
  status: varchar('status', { length: 20 }).default('active'),

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
    template: one(psyPlanTemplates, {
      fields: [userPsyPlans.templateId],
      references: [psyPlanTemplates.id],
    }),
  }),
);
