import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ExerciseSlotResponseDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiPropertyOptional({ type: Number, nullable: true })
  repetitions: number | null;

  @ApiProperty({ type: String })
  exerciseId: string;

  @ApiProperty({ type: String })
  scheduledDayTemplateId: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  time: string | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  durationSeconds: number | null;
}

export class ScheduledDayResponseDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  planTemplateId: string;

  @ApiProperty({ type: Number })
  dayNumber: number;

  @ApiProperty({ type: [ExerciseSlotResponseDto] })
  slots: ExerciseSlotResponseDto[];
}

export class PlanTemplateResponseDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiPropertyOptional({ type: String, nullable: true })
  description: string | null;

  @ApiPropertyOptional({ type: Number, nullable: true })
  repetitions: number | null;

  @ApiProperty({ type: [ScheduledDayResponseDto] })
  days: ScheduledDayResponseDto[];
}
