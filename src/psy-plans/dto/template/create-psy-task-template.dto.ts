import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePsyTaskTemplateDto {
  @ApiProperty({
    description: 'Title of the psychological task template',
    maxLength: 120,
  })
  @IsString()
  @MaxLength(120)
  title: string;

  @ApiProperty({
    type: String,
    description: 'Description of the psychological task template',
    required: false,
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  description?: string | null;

  @ApiProperty({ description: 'Day number in the plan' })
  @IsInt()
  dayNumber: number;

  @ApiProperty({ description: '' })
  @IsInt()
  planTemplateId: number;

  @ApiProperty({
    description: 'Order of execution within the day',
    maxLength: 1000,
  })
  @IsInt()
  @MaxLength(1000)
  order: number;
}
