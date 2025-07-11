import { ApiProperty } from '@nestjs/swagger';
import { ExerciseType, exerciseTypes } from 'src/common/types/exercise-types';
import { InputFormat, inputFormats } from 'src/common/types/input-formats';

import { PracticeType, practiceTypes } from 'src/common/types/practice-types';

export class CreateExerciseDto {
  @ApiProperty({ type: String, description: 'Название упражнения' })
  title: string;

  @ApiProperty({
    type: String,
    description: 'Описание упражнения',
    required: false,
  })
  description?: string;

  @ApiProperty({ enum: exerciseTypes, description: 'Тип упражнения' })
  exerciseType: ExerciseType;

  @ApiProperty({
    enum: practiceTypes,
    description: 'Тип практики',
  })
  practiceType: PracticeType;

  @ApiProperty({
    enum: inputFormats,
    description: 'Формат ввода',
  })
  inputFormat: InputFormat;
}
