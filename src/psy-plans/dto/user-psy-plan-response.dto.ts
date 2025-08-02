import { ApiProperty } from '@nestjs/swagger';

export class UserPsyPlanResponseDto {
  @ApiProperty({ description: 'Unique identifier of the user plan' })
  id: number;

  @ApiProperty({ description: 'User ID associated with the plan' })
  userId: number;

  @ApiProperty({ description: 'Title of the user psychological plan' })
  title: string;

  @ApiProperty({ description: 'Start date of the plan' })
  startDate: string;

  @ApiProperty({ description: 'End date of the plan', required: false })
  endDate?: string | null;

  @ApiProperty({
    description: 'Description of the user psychological plan',
    required: false,
  })
  description?: string | null;
}
