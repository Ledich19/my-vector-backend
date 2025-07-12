import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsInt, IsOptional } from 'class-validator';
export class GetExerciseLogsFilterDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsInt()
  userId: number;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsInt()
  @IsOptional()
  userPlanId?: number;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @ApiPropertyOptional({ type: String, format: 'date-time' })
  @IsDateString()
  @IsOptional()
  dateTo?: string;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ type: Number })
  @IsInt()
  @IsOptional()
  pageSize?: number;
}
