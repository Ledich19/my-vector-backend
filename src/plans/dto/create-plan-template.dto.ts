// src/plan-templates/dto/create-plan-template.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExerciseSlotTemplateDto {
  @ApiProperty({ type: String, description: 'ID упражнения' })
  exerciseId: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Время выполнения (например, "08:00")',
  })
  time?: string;

  @ApiPropertyOptional({ type: Number, description: 'Количество повторений' })
  repetitions?: number;

  @ApiPropertyOptional({ type: Number, description: 'Длительность в секундах' })
  durationSeconds?: number;
}

export class CreateScheduledDayTemplateDto {
  @ApiProperty({ type: Number, description: 'Номер дня в плане' })
  dayNumber: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Количество повторений дня (циклов)',
  })
  repetitions?: number;

  @ApiProperty({
    type: [CreateExerciseSlotTemplateDto],
    description: 'Слоты упражнений для дня',
  })
  exerciseSlots: CreateExerciseSlotTemplateDto[];
}

export class CreatePlanTemplateDto {
  @ApiProperty({ type: String, description: 'Название плана' })
  title: string;

  @ApiPropertyOptional({ type: String, description: 'Описание плана' })
  description?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Количество повторений плана (циклов)',
  })
  repetitions?: number;

  @ApiProperty({
    type: [CreateScheduledDayTemplateDto],
    description: 'Дни плана',
  })
  days: CreateScheduledDayTemplateDto[];
}
