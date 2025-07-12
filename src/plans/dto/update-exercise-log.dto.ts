import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateExerciseLogDto {
  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsInt()
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsInt()
  @IsOptional()
  exerciseId?: number;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsInt()
  @IsOptional()
  userPlanId?: number;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsDateString()
  @IsOptional()
  date?: string;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  rating?: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsInt()
  @IsOptional()
  emotionId?: number;
}
