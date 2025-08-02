// src/exercises/exercises.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ExercisesService } from './exercises.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Exercises')
@Controller('exercises')
export class ExercisesController {
  constructor(private readonly service: ExercisesService) {}

  @Post()
  @ApiOperation({ summary: 'Создать упражнение' })
  create(@Body() dto: CreateExerciseDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список упражнений' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить упражнение по ID' })
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить упражнение' })
  update(
    @Param('id', ParseUUIDPipe) id: number,
    @Body() dto: UpdateExerciseDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить упражнение' })
  remove(@Param('id', ParseUUIDPipe) id: number) {
    return this.service.remove(id);
  }
}
