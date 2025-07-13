import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

@Exclude()
export class CreateSurveyUserAnswerDto {
  @Expose()
  @IsNumber()
  resultId!: number;

  @Expose()
  @IsNumber()
  questionId!: number;

  @Expose()
  @IsOptional()
  @IsNumber()
  selectedOptionId?: number;

  @Expose()
  @IsOptional()
  @IsString()
  freeTextAnswer?: string;
}
