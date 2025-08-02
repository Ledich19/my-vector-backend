import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateUserPsyPlanDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 'Plan Title' })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ example: '2025-07-26' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2025-08-26', required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;

  @ApiProperty({ example: 'Description', required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
