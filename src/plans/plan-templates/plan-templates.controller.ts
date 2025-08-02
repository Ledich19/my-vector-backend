import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PlanTemplatesService } from './plan-templates.service';
import { CreatePlanTemplateDto } from '../dto/create-plan-template.dto';
import { UpdatePlanTemplateDto } from '../dto/update-plan-template.dto';

@ApiTags('Plan Templates')
@Controller('plan-templates')
export class PlanTemplatesController {
  constructor(private readonly service: PlanTemplatesService) {}

  @Get()
  @ApiOperation({ summary: 'Получить все шаблоны планов' })
  @ApiResponse({ status: 200, description: 'Список шаблонов' })
  async getAll() {
    return this.service.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить шаблон плана по ID' })
  @ApiResponse({
    status: 200,
    description: 'Один шаблон с вложенными днями и слотами',
  })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Создать новый шаблон плана' })
  @ApiResponse({ status: 201, description: 'Созданный шаблон' })
  async create(@Body() dto: CreatePlanTemplateDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить шаблон плана' })
  @ApiResponse({ status: 200, description: 'Обновлённый шаблон' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePlanTemplateDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить шаблон плана' })
  @ApiResponse({ status: 204, description: 'Удаление прошло успешно' })
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);
  }
}
