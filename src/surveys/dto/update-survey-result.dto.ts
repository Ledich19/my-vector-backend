import { PartialType } from '@nestjs/mapped-types';
import { CreateSurveyResultDto } from './create-survey-result.dto';

export class UpdateSurveyResultDto extends PartialType(CreateSurveyResultDto) {}
