import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import { CreateSurveyDto } from './dto/create-survey.dto';
import { CreateSurveyQuestionDto } from './dto/create-survey-question.dto';
import { CreateSurveyAnswerOptionDto } from './dto/create-survey-answer-option.dto';
import { CreateSurveyUserAnswerDto } from './dto/create-survey-user-answer.dto';
import { CreateSurveyResultDto } from './dto/create-survey-result.dto';
import { CreateScoringThresholdDto } from './dto/create-scoring-threshold.dto';
import { log } from 'console';

@Injectable()
export class SurveysService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // Комплексное создание опроса с вопросами и вариантами ответов
  async createSurveyWithQuestions(dto: CreateSurveyDto) {
    const survey = await this.createSurvey(dto);

    for (const questionDto of dto.questions) {
      const question = await this.createQuestion(survey.id, questionDto);

      if (questionDto.answerOptions.length) {
        for (const answerOptionDto of questionDto.answerOptions) {
          await this.createAnswerOption(question.id, answerOptionDto);
        }
      }
    }

    if (dto.thresholds.length) {
      for (const thresholdDto of dto.thresholds) {
        await this.createScoringThreshold(survey.id, thresholdDto);
      }
    }

    return survey;
  }

  async createSurvey(dto: Omit<CreateSurveyDto, 'questions'>) {
    const [survey] = await this.db
      .insert(schema.surveys)
      .values({
        title: dto.title,
        description: dto.description,
        category: dto.category,
        scoringMethod: dto.scoringMethod,
        scoringFormula: dto.scoringFormula,
      })
      .returning();
    return survey;
  }

  async createQuestion(
    surveyId: number,
    dto: Omit<CreateSurveyQuestionDto, 'answerOptions'>,
  ) {
    log(dto);
    const [question] = await this.db
      .insert(schema.surveyQuestions)
      .values({
        surveyId,
        text: dto.text,
        type: dto.type,
        weight: dto.weight ?? 1,
      })
      .returning();
    return question;
  }

  async createAnswerOption(
    questionId: number,
    dto: CreateSurveyAnswerOptionDto,
  ) {
    const [answerOption] = await this.db
      .insert(schema.surveyAnswerOptions)
      .values({
        questionId,
        text: dto.text,
        value: dto.value,
      })
      .returning();
    return answerOption;
  }

  async createScoringThreshold(
    surveyId: number,
    dto: CreateScoringThresholdDto,
  ) {
    const [threshold] = await this.db
      .insert(schema.surveyScoringThresholds)
      .values({
        surveyId,
        min: dto.min,
        max: dto.max,
        label: dto.label,
        description: dto.description,
      })
      .returning();
    return threshold;
  }

  // Получение всех опросов
  async getAllSurveys() {
    return await this.db.query.surveys.findMany({
      // with: {
      //   questions: true,
      //   thresholds: true,
      // },
    });
  }

  // Получение опроса по ID с вопросами и порогами
  async getSurveyById(id: number) {
    return await this.db.query.surveys.findFirst({
      where: (survey) => eq(survey.id, id),
      with: {
        questions: {
          with: {
            answerOptions: true,
          },
        },
        thresholds: true,
        results: true,
      },
    });
  }

  // Удаление опроса (каскадное удаление вопросов и порогов благодаря onDelete: 'cascade')
  async deleteSurvey(id: number) {
    const [deletedSurvey] = await this.db
      .delete(schema.surveys)
      .where(eq(schema.surveys.id, id))
      .returning();

    if (!deletedSurvey) {
      throw new NotFoundException(`Survey with ID ${id} not found`);
    }

    return deletedSurvey;
  }

  // Сохранение ответа пользователя
  async saveUserAnswer(dto: CreateSurveyUserAnswerDto) {
    const { resultId, questionId, selectedOptionId, freeTextAnswer } = dto;
    const [userAnswer] = await this.db
      .insert(schema.surveyUserAnswers)
      .values({
        resultId,
        questionId,
        selectedOptionId,
        freeTextAnswer,
      })
      .returning();
    return userAnswer;
  }

  // Создание результата опроса
  async createSurveyResult(dto: CreateSurveyResultDto) {
    const { userId, surveyId, totalScore, resultLabel } = dto;
    const [result] = await this.db
      .insert(schema.surveyResults)
      .values({
        userId,
        surveyId,
        totalScore,
        resultLabel,
      })
      .returning();
    return result;
  }

  // Создание порога для оценки

  // Получение результатов опроса для пользователя
  async getUserSurveyResults(userId: number, surveyId: number) {
    const results = await this.db
      .select()
      .from(schema.surveyResults)
      .where(
        and(
          eq(schema.surveyResults.userId, userId),
          eq(schema.surveyResults.surveyId, surveyId),
        ),
      )
      .leftJoin(
        schema.surveyUserAnswers,
        eq(schema.surveyResults.id, schema.surveyUserAnswers.resultId),
      );

    if (!results.length) {
      throw new NotFoundException(
        `No results found for user ${userId} and survey ${surveyId}`,
      );
    }

    return results;
  }
}
