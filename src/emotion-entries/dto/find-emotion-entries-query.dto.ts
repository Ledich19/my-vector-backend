import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
export class FindEmotionEntriesQueryDto {
  @ApiPropertyOptional({ example: 'b3cb9d15-3e52-43cb-9021-1c6d9f46ed83' })
  @IsInt()
  @IsOptional()
  emotionId?: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @ApiProperty({ example: 10 })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number;
}
