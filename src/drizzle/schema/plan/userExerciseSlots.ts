import {
  pgTable,
  text,
  uuid,
  integer,
  boolean,
  index,
} from 'drizzle-orm/pg-core';
import { userScheduledDays } from './userScheduledDays';
import { relations } from 'drizzle-orm';
import { exercises } from './exercises';

export const userExerciseSlots = pgTable(
  'user_exercise_slots',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userScheduledDayId: uuid('user_scheduled_day_id')
      .notNull()
      .references(() => userScheduledDays.id, { onDelete: 'cascade' }),
    templateSlotId: uuid('template_slot_id'), // может быть null при создании нового

    exerciseId: uuid('exercise_id').references(() => exercises.id, {
      onDelete: 'set null',
    }), // может переопределять или быть обязательным при templateSlotId === null

    time: text('time'),
    repetitions: integer('repetitions'),
    durationSeconds: integer('duration_seconds'),
    isDeleted: boolean('is_deleted').default(false),
  },
  (table) => [
    index('idx_user_scheduled_day_id_exercise_id').on(table.userScheduledDayId),
  ],
);

export const userExerciseSlotRelations = relations(
  userExerciseSlots,
  ({ one }) => ({
    userScheduledDay: one(userScheduledDays, {
      fields: [userExerciseSlots.userScheduledDayId],
      references: [userScheduledDays.id],
    }),
    exercise: one(exercises, {
      fields: [userExerciseSlots.exerciseId],
      references: [exercises.id],
    }),
  }),
);
