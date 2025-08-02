import { Type, Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, IsOptional, IsDate } from 'class-validator';

@Exclude()
export class SurveyResultDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNumber()
  userId!: number;

  @Expose()
  @IsNumber()
  surveyId!: number;

  @Expose()
  @IsNumber()
  totalScore: number;

  @Expose()
  @IsOptional()
  @IsString()
  resultLabel?: string;

  @Expose()
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  createdAt?: Date = new Date();
}
