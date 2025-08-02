import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PsyPlanTemplatesService } from '../services/psy-plan-templates.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PsyPlanTemplateResponseDto } from '../dto/template/psy-plan-template-response.dto';
import { CreatePsyPlanTemplateDto } from '../dto/template/create-psy-plan-template.dto';
import { UpdatePsyPlanTemplateDto } from '../dto/template/update-psy-plan-template.dto';

@ApiTags('psy-plan-templates')
@Controller('psy-plan-templates')
export class PsyPlanTemplatesController {
  constructor(
    private readonly psyPlanTemplatesService: PsyPlanTemplatesService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new psychological plan template' })
  @ApiResponse({
    status: 201,
    description: 'Plan template created',
    type: PsyPlanTemplateResponseDto,
  })
  create(
    @Body() createDto: CreatePsyPlanTemplateDto,
  ): Promise<PsyPlanTemplateResponseDto> {
    return this.psyPlanTemplatesService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all psychological plan templates' })
  @ApiResponse({
    status: 200,
    description: 'List of plan templates',
    type: [PsyPlanTemplateResponseDto],
  })
  findAll(): Promise<PsyPlanTemplateResponseDto[]> {
    return this.psyPlanTemplatesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a psychological plan template by ID' })
  @ApiResponse({
    status: 200,
    description: 'Plan template details',
    type: PsyPlanTemplateResponseDto,
  })
  findOne(@Param('id') id: string): Promise<PsyPlanTemplateResponseDto> {
    return this.psyPlanTemplatesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a psychological plan template' })
  @ApiResponse({
    status: 200,
    description: 'Updated plan template',
    type: PsyPlanTemplateResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdatePsyPlanTemplateDto,
  ): Promise<PsyPlanTemplateResponseDto> {
    return this.psyPlanTemplatesService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a psychological plan template' })
  @ApiResponse({ status: 204, description: 'Plan template deleted' })
  delete(@Param('id') id: string): Promise<void> {
    return this.psyPlanTemplatesService.delete(+id);
  }
}
