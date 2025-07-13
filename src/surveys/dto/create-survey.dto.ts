import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { CreateSurveyQuestionDto } from './create-survey-question.dto';
import { ApiProperty } from '@nestjs/swagger';
import { ScoringThresholdDto } from './get-survey.dto';

@Exclude()
export class CreateSurveyDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Опрос об эмоциях' })
  title!: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'Описание опроса', required: false })
  description?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'emotions', required: false })
  category?: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'sum' })
  scoringMethod!: string;

  @Expose()
  @IsOptional()
  @IsString()
  @ApiProperty({ example: 'a + b * 2', required: false })
  scoringFormula?: string;

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSurveyQuestionDto)
  @ApiProperty({ type: CreateSurveyQuestionDto, isArray: true })
  questions!: CreateSurveyQuestionDto[];

  @Expose()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScoringThresholdDto)
  @ApiProperty({ type: [ScoringThresholdDto] })
  thresholds: ScoringThresholdDto[];
}
