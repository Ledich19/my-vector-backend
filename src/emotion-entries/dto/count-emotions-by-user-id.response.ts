import { ApiProperty } from '@nestjs/swagger';

export class CountEmotionsByUserIdResponse {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  emotionId: number;

  @ApiProperty({ example: 5 })
  count: number;

  @ApiProperty({ example: 'Счастье' })
  label: string;

  @ApiProperty({ example: '😊' })
  icon: string;
}
