import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
  IsNumber,
} from 'class-validator';

export class CreateUserPsyPlanDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'Plan Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2025-07-26' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-08-26', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  psyPlanTemplateId: number;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  templateVersion?: number;

  @ApiProperty({ example: 'active', required: false })
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty({
    type: String,
    description:
      'Источник шаблона (например, текст с заданиями в формате Markdown)',
  })
  source?: string;
}
