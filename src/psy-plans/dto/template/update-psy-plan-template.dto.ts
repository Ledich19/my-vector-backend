import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdatePsyPlanTemplateDto {
  @ApiProperty({
    description: 'Title of the psychological plan template',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Description of the psychological plan template',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Number of repetitions for the plan template',
    required: false,
  })
  @IsInt()
  @IsOptional()
  repetitions?: number;
}
