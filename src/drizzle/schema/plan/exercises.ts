import { pgEnum, pgTable, text, serial } from 'drizzle-orm/pg-core';
import { exerciseTypes } from 'src/common/types/exercise-types';
import { inputFormats } from 'src/common/types/input-formats';
import { practiceTypes } from 'src/common/types/practice-types';

export const exerciseEnum = pgEnum('exercise_enum', exerciseTypes);
export const practiceTypeEnum = pgEnum('practice_type_enum', practiceTypes);
export const inputFormatEnum = pgEnum('input_format_enum', inputFormats);

export const exercises = pgTable('exercises', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  exerciseType: exerciseEnum('exercise_type').notNull(),
  practiceType: practiceTypeEnum('practice_type').notNull(),
  inputFormat: inputFormatEnum('input_format').notNull(),
});
