import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExerciseLogResponseDto {
  @ApiProperty({ format: 'uuid' })
  id: number;

  @ApiProperty({ format: 'uuid' })
  userId: number;

  @ApiProperty({ format: 'uuid' })
  exerciseId: number;

  @ApiPropertyOptional({ format: 'uuid' })
  userPlanId?: string;

  @ApiProperty({ type: 'string', format: 'date-time' })
  date: string;

  @ApiProperty()
  isCompleted: boolean;

  @ApiPropertyOptional()
  rating?: number;

  @ApiPropertyOptional()
  notes?: string;

  @ApiPropertyOptional({ format: 'uuid' })
  emotionId?: string;
}
