import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CreateSurveyAnswerOptionDto {
  @Expose()
  @IsNumber()
  @ApiProperty({ example: 1 })
  questionId!: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Очень хорошо' })
  text!: string;

  @Expose()
  @IsNumber()
  @ApiProperty({ example: 5 })
  value!: number;
}
