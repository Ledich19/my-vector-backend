import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateUserPsyTaskDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userPsyPlanId: number;

  @ApiProperty({ example: 1, required: false })
  @IsOptional()
  originalTaskTemplateId?: number;

  @ApiProperty({ example: 'Overridden Title', required: false })
  @IsOptional()
  @IsString()
  titleOverride?: string;

  @ApiProperty({ example: 'Overridden description', required: false })
  @IsOptional()
  @IsString()
  descriptionOverride?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  dayNumber: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  order: number;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  isCompleted?: boolean;

  @ApiProperty({ example: 'Notes about task', required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ example: '2025-07-26' })
  @IsDateString()
  @IsNotEmpty()
  taskDate: string;
}
