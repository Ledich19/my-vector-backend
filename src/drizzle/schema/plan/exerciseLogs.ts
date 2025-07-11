import {
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';
import { exercises } from './exercises';
import { relations } from 'drizzle-orm';
import { users } from '../users';
import { userPlans } from './userPlans';
import { emotions } from '../emotions';

export const exerciseLogs = pgTable('exercise_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').notNull(),
  exerciseId: uuid('exercise_id')
    .notNull()
    .references(() => exercises.id),
  userPlanId: uuid('user_plan_id'),
  date: timestamp('date').notNull(),
  isCompleted: boolean('is_completed').notNull(),
  rating: integer('rating'),
  notes: text('notes'),
  emotionId: uuid('emotion_id'),
});

export const exerciseLogRelations = relations(exerciseLogs, ({ one }) => ({
  user: one(users, {
    fields: [exerciseLogs.userId],
    references: [users.id],
  }),
  exercise: one(exercises, {
    fields: [exerciseLogs.exerciseId],
    references: [exercises.id],
  }),
  userPlan: one(userPlans, {
    fields: [exerciseLogs.userPlanId],
    references: [userPlans.id],
  }),
  emotion: one(emotions, {
    fields: [exerciseLogs.emotionId],
    references: [emotions.id],
  }),
}));
