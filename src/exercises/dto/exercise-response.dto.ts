// src/exercises/dto/exercise-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { ExerciseType, exerciseTypes } from 'src/common/types/exercise-types';
import { InputFormat, inputFormats } from 'src/common/types/input-formats';
import { PracticeType, practiceTypes } from 'src/common/types/practice-types';

export class ExerciseResponseDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  id: string;

  @ApiProperty({ type: 'string' })
  title: string;

  @ApiProperty({ type: 'string', required: false })
  description?: string;

  @ApiProperty({
    enum: exerciseTypes,
  })
  exerciseType: ExerciseType;

  @ApiProperty({ enum: practiceTypes })
  practiceType: PracticeType;

  @ApiProperty({ enum: inputFormats })
  inputFormat: InputFormat;
}
