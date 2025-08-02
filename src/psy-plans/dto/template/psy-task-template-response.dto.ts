import { ApiProperty } from '@nestjs/swagger';

export class PsyTaskTemplateResponseDto {
  @ApiProperty({ description: 'Unique identifier of the task template' })
  id: number;

  @ApiProperty({ description: 'Title of the psychological task template' })
  title: string;

  @ApiProperty({
    description: 'Description of the psychological task template',
    required: false,
  })
  description?: string | null;

  @ApiProperty({ description: 'Day number in the plan' })
  dayNumber: number;

  @ApiProperty({ description: 'Order of execution within the day' })
  order: number;
}
