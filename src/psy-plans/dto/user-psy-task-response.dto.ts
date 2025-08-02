import { ApiProperty } from '@nestjs/swagger';

export class UserPsyTaskResponseDto {
  @ApiProperty({ description: 'Unique identifier of the user task' })
  id: number;

  @ApiProperty({ description: 'ID of the associated user psychological plan' })
  userPsyPlanId: number;

  @ApiProperty({
    description: 'ID of the original task template',
    required: false,
  })
  originalTaskTemplateId?: number | null;

  @ApiProperty({ description: 'Overridden title of the task', required: false })
  titleOverride?: string | null;

  @ApiProperty({
    description: 'Overridden description of the task',
    required: false,
  })
  descriptionOverride?: string | null;

  @ApiProperty({ description: 'Day number in the plan' })
  dayNumber: number;

  @ApiProperty({ description: 'Order of execution within the day' })
  order: number;

  @ApiProperty({ description: 'Completion status of the task' })
  isCompleted: boolean | null;

  @ApiProperty({ description: 'Notes for the task', required: false })
  notes?: string | null;

  @ApiProperty({ description: 'Date of the task' })
  taskDate: string;
}
