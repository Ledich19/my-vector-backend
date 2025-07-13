import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExerciseSlotResponseDto {
  @ApiProperty({ type: String })
  id: number;

  @ApiPropertyOptional({ type: Number, nullable: true })
  repetitions: number | null;

  @ApiProperty({ type: String })
  exerciseId: number;

  @ApiProperty({ type: String })
  scheduledDayTemplateId: number;

  @ApiPropertyOptional({ type: String, nullable: true })
  time: string | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  durationSeconds: number | null;
}

export class ScheduledDayResponseDto {
  @ApiProperty({ type: String })
  id: number;

  @ApiProperty({ type: String })
  planTemplateId: number;

  @ApiProperty({ type: Number })
  dayNumber: number;

  @ApiProperty({ type: [ExerciseSlotResponseDto] })
  slots: ExerciseSlotResponseDto[];
}

export class PlanTemplateResponseDto {
  @ApiProperty({ type: String })
  id: number;

  @ApiProperty({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  description: string | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  repetitions: number | null;

  @ApiProperty({ type: [ScheduledDayResponseDto] })
  days: ScheduledDayResponseDto[];
}
