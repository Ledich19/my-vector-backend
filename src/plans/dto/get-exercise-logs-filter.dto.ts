import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsDateString, IsInt, IsOptional } from 'class-validator';
export class GetExerciseLogsFilterDto {
  @ApiProperty({ type: String, format: 'uuid' })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ type: String, format: 'uuid' })
  @IsUUID()
  @IsOptional()
  userPlanId?: string;

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
