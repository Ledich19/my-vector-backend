import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyUserAnswerDto } from './create-survey-user-answer.dto';

export class UpdateSurveyUserAnswerDto extends PartialType(
  CreateSurveyUserAnswerDto,
) {}
