// Файл: create-emotion-entrie.dto.ts

import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CreateEmotionEntrieDto {
  @ApiProperty({ example: 'Walked in the park' })
  @IsString()
  @Expose()
  actions: string;

  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  @Expose()
  userId: string;

  @Expose()
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  @IsUUID()
  emotionId: string;

  @ApiProperty({ example: 'Saw a friend unexpectedly' })
  @IsString()
  @Expose()
  situation: string;

  @ApiProperty({ example: 'Felt relaxed and positive' })
  @IsString()
  @Expose()
  thoughts: string;

  @ApiProperty({ example: 'Warm feeling in chest' })
  @IsString()
  @Expose()
  sensations: string;
}
