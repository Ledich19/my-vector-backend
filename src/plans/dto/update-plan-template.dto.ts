import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class UpdateExerciseSlotTemplateDto {
  @ApiProperty({ type: String, description: 'ID слота упражнения' })
  id: number;

  @ApiPropertyOptional({ type: String, description: 'ID упражнения' })
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

export class UpdateScheduledDayTemplateDto {
  @ApiProperty({ type: String, description: 'ID дня шаблона' })
  id: number;

  @ApiPropertyOptional({ type: Number, description: 'Номер дня в плане' })
  dayNumber: number;

  @ApiPropertyOptional({
    type: [UpdateExerciseSlotTemplateDto],
    description: 'Слоты упражнений',
  })
  exerciseSlots: UpdateExerciseSlotTemplateDto[];
}

export class UpdatePlanTemplateDto {
  @ApiPropertyOptional({ type: String, description: 'Название плана' })
  title?: string;

  @ApiPropertyOptional({ type: String, description: 'Описание плана' })
  description?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Количество повторений плана',
  })
  repetitions?: number;

  @ApiPropertyOptional({
    type: [UpdateScheduledDayTemplateDto],
    description: 'Дни плана',
  })
  days: UpdateScheduledDayTemplateDto[];
}
