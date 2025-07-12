import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PlanTemplatesService } from './plan-templates.service';

@Controller('plan-templates')
export class PlanTemplatesController {
  constructor(private readonly service: PlanTemplatesService) {}

  // @Post()
  // create(@Body() dto: CreatePlanTemplateDto) {
  //   return this.service.create(dto);
  // }

  // @Get()
  // getAll() {
  //   return this.service.getAll();
  // }

  // @Get(':id')
  // getOne(@Param('id', ParseUUIDPipe) id:  number) {
  //   return this.service.getOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id') id:  number, @Body() dto: UpdatePlanTemplateDto) {
  //   return this.service.update(id, dto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id:  number) {
  //   return this.service.delete(id);
  // }
}
