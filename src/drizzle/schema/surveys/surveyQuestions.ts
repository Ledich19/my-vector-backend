import { pgTable, text, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { surveys } from './surveys';
import { surveyAnswerOptions } from './surveyAnswerOptions';
import { surveyUserAnswers } from './surveyUserAnswers';
import { questionTypes } from 'src/common/types/question-types';

export const questionTypeEnum = pgEnum('question_type_enum', questionTypes);

export const surveyQuestions = pgTable('survey_questions', {
  id: integer('id').primaryKey(),
  surveyId: integer('survey_id')
    .notNull()
    .references(() => surveys.id, { onDelete: 'cascade' }),
  text: text('text').notNull(),
  type: questionTypeEnum('type').notNull(),
  weight: integer('weight').default(1),
});

export const surveyQuestionsRelations = relations(
  surveyQuestions,
  ({ one, many }) => ({
    survey: one(surveys, {
      fields: [surveyQuestions.surveyId],
      references: [surveys.id],
    }),
    answerOptions: many(surveyAnswerOptions),
    userAnswers: many(surveyUserAnswers),
  }),
);
