import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProtocolDto {
  @ApiProperty({ example: 'ТУК' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, example: 'Описание протокола' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 'Содержание протокола' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
