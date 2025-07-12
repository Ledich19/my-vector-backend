import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExerciseLogDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsInt()
  userId: number;

  @ApiProperty({ type: String, format: 'uuid' })
  @IsInt()
  exerciseId: number;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsInt()
  @IsOptional()
  userPlanId?: number;

  @ApiProperty({ type: String, format: 'date-time' })
  @IsDateString()
  date: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isCompleted: boolean;

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
