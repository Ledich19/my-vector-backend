import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PsyTaskTemplatesService } from '../services/psy-task-templates.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PsyTaskTemplateResponseDto } from '../dto/template/psy-task-template-response.dto';
import { CreatePsyTaskTemplateDto } from '../dto/template/create-psy-task-template.dto';
import { UpdatePsyTaskTemplateDto } from '../dto/template/update-psy-task-template.dto';

@ApiTags('psy-task-templates')
@Controller('psy-task-templates')
export class PsyTaskTemplatesController {
  constructor(
    private readonly psyTaskTemplatesService: PsyTaskTemplatesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new psychological task template' })
  @ApiResponse({
    status: 201,
    description: 'Task template created',
    type: PsyTaskTemplateResponseDto,
  })
  create(
    @Body() createDto: CreatePsyTaskTemplateDto,
  ): Promise<PsyTaskTemplateResponseDto> {
    return this.psyTaskTemplatesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all psychological task templates' })
  @ApiResponse({
    status: 200,
    description: 'List of task templates',
    type: [PsyTaskTemplateResponseDto],
  })
  findAll(): Promise<PsyTaskTemplateResponseDto[]> {
    return this.psyTaskTemplatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a psychological task template by ID' })
  @ApiResponse({
    status: 200,
    description: 'Task template details',
    type: PsyTaskTemplateResponseDto,
  })
  findOne(@Param('id') id: string): Promise<PsyTaskTemplateResponseDto> {
    return this.psyTaskTemplatesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a psychological task template' })
  @ApiResponse({
    status: 200,
    description: 'Updated task template',
    type: PsyTaskTemplateResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePsyTaskTemplateDto,
  ): Promise<PsyTaskTemplateResponseDto> {
    return this.psyTaskTemplatesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a psychological task template' })
  @ApiResponse({ status: 204, description: 'Task template deleted' })
  delete(@Param('id') id: string): Promise<void> {
    return this.psyTaskTemplatesService.delete(+id);
  }
}
