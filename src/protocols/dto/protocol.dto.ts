import { ApiProperty } from '@nestjs/swagger';

export class ProtocolDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'TUK Protocol' })
  name: string;

  @ApiProperty({
    example: 'Protocol for improving communication skills',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({ example: 'Protocol content' })
  content: string;

  @ApiProperty({ example: '2025-06-25T21:55:01.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-06-25T21:55:01.000Z' })
  updatedAt: string;
}
