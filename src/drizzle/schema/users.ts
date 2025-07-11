import { integer, text, pgTable } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { user_role } from './user_role';

export const users = pgTable('users', {
  id: integer('id').primaryKey(),
  email: text('email').unique(),
  role_id: integer('role_id'),
});

export const usersRelations = relations(users, ({ one }) => ({
  user_role: one(user_role, {
    fields: [users.role_id],
    references: [user_role.id],
  }),
}));
