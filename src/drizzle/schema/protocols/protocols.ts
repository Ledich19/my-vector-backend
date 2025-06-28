import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const protocols = pgTable('protocols', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  content: text('content').notNull(),
  createdAt: timestamp('created_at')
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp('updated_at')
    .notNull()
    .default(sql`now()`),
});
