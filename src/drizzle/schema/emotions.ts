import { pgEnum, pgTable, text, serial } from 'drizzle-orm/pg-core';
import { emotionCategories, emotionValues } from 'src/common/constants';

export const emotionEnum = pgEnum('emotion_enum', [...emotionValues]);

export const emotionCategoryEnum = pgEnum('emotion_category_enum', [
  ...emotionCategories,
]);

export const emotions = pgTable('emotions', {
  id: serial('id').primaryKey(),
  value: emotionEnum('value').notNull(),
  label: text('label').notNull(),
  icon: text('icon').default(''),
  category: emotionCategoryEnum('category').notNull(),
  color: text('color').notNull(),
});
