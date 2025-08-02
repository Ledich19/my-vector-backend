import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePsyTaskTemplateDto {
  @ApiProperty({
    description: 'Title of the psychological task template',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Description of the psychological task template',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

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
}
