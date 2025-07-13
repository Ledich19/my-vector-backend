import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { CreateSurveyAnswerOptionDto } from './create-survey-answer-option.dto';
import { QuestionType, questionTypes } from 'src/common/types/question-types';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateSurveyQuestionDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ example: 1 })
  surveyId!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Как вы себя чувствуете?' })
  text!: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @IsIn(questionTypes)
  @ApiProperty({ example: 'single', enum: questionTypes })
  type!: QuestionType;

  @Expose()
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1, required: false })
  weight?: number = 1;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSurveyAnswerOptionDto)
  @ApiProperty({
    type: CreateSurveyAnswerOptionDto,
    isArray: true,
    required: false,
  })
  answerOptions!: CreateSurveyAnswerOptionDto[];
}
