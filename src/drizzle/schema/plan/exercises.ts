import { pgEnum, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { exerciseTypes } from 'src/common/types/exercise-types';
import { inputFormats } from 'src/common/types/input-formats';
import { practiceTypes } from 'src/common/types/practice-types';

const exerciseEnum = pgEnum('exercise_enum', exerciseTypes);

const practiceTypeEnum = pgEnum('practice_type_enum', practiceTypes);

export const inputFormatEnum = pgEnum('input_format_enum', inputFormats);

export const exercises = pgTable('exercises', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  exerciseType: exerciseEnum('exercise_type').notNull(),
  practiceType: practiceTypeEnum('practice_type').notNull(),
  inputFormat: text('input_format').notNull(), // enum: repetition | duration | text | boolean
});
