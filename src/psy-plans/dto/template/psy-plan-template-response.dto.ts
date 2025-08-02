import { ApiProperty } from '@nestjs/swagger';
import { CreatePsyTaskTemplateDto } from './create-psy-task-template.dto';

export class PsyPlanTemplateResponseDto {
  @ApiProperty({ description: 'Уникальный идентификатор шаблона плана' })
  id: number;

  @ApiProperty({ description: 'Название шаблона психологического плана' })
  title: string;

  @ApiProperty({
    description: 'Описание шаблона психологического плана',
    required: false,
  })
  description?: string | null;

  @ApiProperty({
    description: 'Количество повторений для шаблона плана',
    required: false,
  })
  repetitions?: number | null;

  @ApiProperty({
    description: 'Список задач, связанных с шаблоном плана',
    type: [CreatePsyTaskTemplateDto],
    required: false,
  })
  tasks?: CreatePsyTaskTemplateDto[];
}
