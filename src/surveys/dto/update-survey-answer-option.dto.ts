import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyAnswerOptionDto } from './create-survey-answer-option.dto';

export class UpdateSurveyAnswerOptionDto extends PartialType(
  CreateSurveyAnswerOptionDto,
) {}
