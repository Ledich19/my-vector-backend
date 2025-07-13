import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

@Exclude()
export class CreateScoringThresholdDto {
  @ApiProperty({ example: 0, description: 'Минимальное значение баллов' })
  @Expose()
  @IsInt()
  @Min(0)
  min!: number;

  @ApiProperty({ example: 10, description: 'Максимальное значение баллов' })
  @Expose()
  @IsInt()
  @Min(0)
  max!: number;

  @ApiProperty({
    example: 'Низкий уровень тревожности',
    description: 'Описание для данного диапазона',
  })
  @Expose()
  @IsString()
  label!: string;

  @ApiProperty({
    example: 'Низкий уровень тревожности',
    description: 'Описание для данного диапазона',
  })
  @Expose()
  @IsString()
  description?: string;
}
