import { ApiProperty } from '@nestjs/swagger';
import { emotionValues } from 'src/common/constants';
import type { Emotion } from 'src/common/constants';

export class EmotionResponseDto {
  @ApiProperty({ example: '' })
  id: number;

  @ApiProperty({ enum: emotionValues })
  value: Emotion;

  @ApiProperty({ example: 'Счастье' })
  label: string;

  @ApiProperty({ example: '😊', required: false, nullable: true })
  icon?: string | null;
}
