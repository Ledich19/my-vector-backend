import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserPsyTaskDto {
  @ApiProperty({ description: 'Overridden title of the task', required: false })
  @IsString()
  @IsOptional()
  titleOverride?: string;

  @ApiProperty({
    description: 'Overridden description of the task',
    required: false,
  })
  @IsString()
  @IsOptional()
  descriptionOverride?: string;

  @ApiProperty({ description: 'Day number in the plan', required: false })
  @IsInt()
  @IsOptional()
  dayNumber?: number;

  @ApiProperty({
    description: 'Order of execution within the day',
    required: false,
  })
  @IsInt()
  @IsOptional()
  order?: number;

  @ApiProperty({
    description: 'Completion status of the task',
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isCompleted?: boolean;

  @ApiProperty({ description: 'Notes for the task', required: false })
  @IsString()
  @IsOptional()
  notes?: string;
}
