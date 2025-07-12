import { pgTable, text, integer, timestamp, serial } from 'drizzle-orm/pg-core';
import { relations, sql } from 'drizzle-orm';
import { users } from './users';
import { emotions } from './emotions';

export const emotionEntries = pgTable('emotion_entries', {
  id: serial('id').primaryKey(),

  userId: integer('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),

  emotionId: integer('emotion_id')
    .notNull()
    .references(() => emotions.id),

  situation: text('situation').notNull(),
  thoughts: text('thoughts').notNull(),
  sensations: text('sensations').notNull(),
  actions: text('actions').notNull(),

  createdAt: timestamp('created_at', { mode: 'date' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const emotionEntriesRelations = relations(emotionEntries, ({ one }) => ({
  user: one(users, {
    fields: [emotionEntries.userId],
    references: [users.id],
  }),

  emotion: one(emotions, {
    fields: [emotionEntries.emotionId],
    references: [emotions.id],
  }),
}));
