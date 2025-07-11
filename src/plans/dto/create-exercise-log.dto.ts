import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsUUID,
  IsDateString,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateExerciseLogDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  exerciseId: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  userPlanId?: string;

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
  @IsUUID()
  @IsOptional()
  emotionId?: string;
}
