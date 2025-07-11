// src/exercises/dto/update-exercise.dto.ts
import { ApiPropertyOptional } from '@nestjs/swagger';
import { ExerciseType, exerciseTypes } from 'src/common/types/exercise-types';
import { InputFormat, inputFormats } from 'src/common/types/input-formats';
import { PracticeType, practiceTypes } from 'src/common/types/practice-types';

export class UpdateExerciseDto {
  @ApiPropertyOptional({ type: String, description: 'Название упражнения' })
  title?: string;

  @ApiPropertyOptional({ type: String, description: 'Описание упражнения' })
  description?: string;

  @ApiPropertyOptional({
    enum: exerciseTypes,
    description: 'Тип упражнения',
  })
  exerciseType?: ExerciseType;

  @ApiPropertyOptional({
    enum: practiceTypes,
    description: 'Тип практики',
  })
  practiceType?: PracticeType;

  @ApiPropertyOptional({
    enum: inputFormats,
    description: 'Формат ввода',
  })
  inputFormat?: InputFormat;
}
