import { IsString, IsUUID, IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class EmotionEntryDTO {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  id: string;

  @ApiProperty({ example: 'Went for a run' })
  @IsString()
  actions: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  emotionId: string;

  @ApiProperty({ example: 'At the park' })
  @IsString()
  situation: string;

  @ApiProperty({ example: 'Feeling energized' })
  @IsString()
  thoughts: string;

  @ApiProperty({ example: 'Lightness in chest' })
  @IsString()
  sensations: string;

  @ApiProperty({
    example: '2025-06-21T12:00:00Z',
    type: String,
    format: 'date-time',
  })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;
}
