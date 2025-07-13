// dto/get-survey.dto.ts
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { questionTypes, QuestionType } from 'src/common/types/question-types';
import { IsInt, IsString, Min } from 'class-validator';

@Exclude()
export class SurveyAnswerOptionDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id!: number;

  @ApiProperty({ example: 'Option text' })
  @Expose()
  text!: string;

  @ApiProperty({ example: 5 })
  @Expose()
  value!: number;
}

@Exclude()
export class SurveyQuestionDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id!: number;

  @ApiProperty({ example: 1 })
  @Expose()
  surveyId!: number;

  @ApiProperty({ example: 'What is your favorite color?' })
  @Expose()
  text!: string;

  @ApiProperty({ example: 'single-choice', enum: questionTypes })
  @Expose()
  type!: QuestionType;

  @ApiProperty({ example: 1, minimum: 1 })
  @Expose()
  weight!: number;

  @ApiProperty({ type: [SurveyAnswerOptionDto] })
  @Expose()
  @Type(() => SurveyAnswerOptionDto)
  answerOptions!: SurveyAnswerOptionDto[];
}

export class ScoringThresholdDto {
  @ApiProperty({ example: 0, description: 'Минимальное значение баллов' })
  @Expose()
  @IsInt()
  @Min(0)
  min!: number;

  @ApiProperty({ example: 10, description: 'Максимальное значение баллов' })
  @Expose()
  @IsInt()
  @Min(0)
  max!: number;

  @ApiProperty({
    example: 'Низкий уровень тревожности',
    description: 'Описание для данного диапазона',
  })
  @Expose()
  @IsString()
  label!: string;

  @ApiProperty({ example: 'Survey about customer satisfaction' })
  @Expose()
  @IsString()
  description?: string;
}

@Exclude()
export class SurveyDto {
  @ApiProperty({ example: 1 })
  @Expose()
  id!: number;

  @ApiProperty({ example: 'Customer Satisfaction Survey' })
  @Expose()
  title!: string;

  @ApiPropertyOptional({ example: 'Survey about customer satisfaction' })
  @Expose()
  description?: string;

  @ApiPropertyOptional({ example: 'customer-feedback' })
  @Expose()
  category?: string;

  @ApiProperty({ example: 'sum' })
  @Expose()
  scoringMethod!: string;

  @ApiPropertyOptional({ example: 'SUM(answers)' })
  @Expose()
  scoringFormula?: string;

  @ApiProperty({ type: [SurveyQuestionDto] })
  @Expose()
  @Type(() => SurveyQuestionDto)
  questions!: SurveyQuestionDto[];

  @ApiProperty({ type: [ScoringThresholdDto] })
  @Expose()
  @Type(() => ScoringThresholdDto)
  thresholds: ScoringThresholdDto[];
}
