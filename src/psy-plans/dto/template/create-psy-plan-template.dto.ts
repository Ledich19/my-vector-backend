import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  IsOptional,
  IsArray,
  MaxLength,
} from 'class-validator';

export class PsyTaskTemplateDto {
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

  // @ApiProperty({ description: 'Day number in the plan' })
  // @IsInt()
  // dayNumber: number;

  // @ApiProperty({ description: '' })
  // @IsInt()
  // planTemplateId: number;

  @ApiProperty({
    description: 'Order of execution within the day',
    maxLength: 1000,
  })
  @IsInt()
  @MaxLength(1000)
  order: number;
}

export class CreatePsyPlanTemplateDayDto {
  @ApiProperty({
    description: 'Количество повторений для шаблона плана',
    required: false,
  })
  @IsInt()
  @IsOptional()
  repetitions?: number;

  @ApiProperty({
    description: 'Список задач для шаблона плана',
    type: [PsyTaskTemplateDto],
  })
  @IsArray()
  tasks: PsyTaskTemplateDto[];
}

export class CreatePsyPlanTemplateDto {
  @ApiProperty({ description: 'Название шаблона психологического плана' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Описание шаблона психологического плана',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Количество повторений для шаблона плана',
    required: false,
  })
  @IsInt()
  @IsOptional()
  repetitions?: number;

  // @ApiProperty({
  //   description: 'Список задач для шаблона плана',
  //   type: [CreatePsyTaskTemplateDto],
  //   required: false,
  // })
  // @IsArray()
  // @IsOptional()
  // tasks?: CreatePsyTaskTemplateDto[];

  @ApiProperty({
    description: 'Список дней для шаблона плана',
    type: [CreatePsyPlanTemplateDayDto],
  })
  @IsArray()
  days: CreatePsyPlanTemplateDayDto[];
}
