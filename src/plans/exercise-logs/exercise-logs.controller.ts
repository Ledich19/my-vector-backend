import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { ExerciseLogsService } from './exercise-logs.service';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

import { ExerciseLogResponseDto } from '../dto/exercise-log-response.dto';
import { CreateExerciseLogDto } from '../dto/create-exercise-log.dto';
import { GetExerciseLogsFilterDto } from '../dto/get-exercise-logs-filter.dto';
import { UpdateExerciseLogDto } from '../dto/update-exercise-log.dto';

@ApiTags('exercise-logs')
@Controller('exercise-logs')
export class ExerciseLogsController {
  constructor(private readonly service: ExerciseLogsService) {}

  @Post()
  @ApiOperation({ summary: 'Create exercise log' })
  @ApiResponse({ status: 201, type: ExerciseLogResponseDto })
  async create(@Body() dto: CreateExerciseLogDto) {
    const created = await this.service.create(dto);
    return created;
  }

  @Get()
  @ApiOperation({ summary: 'Get exercise logs with filters and pagination' })
  @ApiResponse({ status: 200, type: [ExerciseLogResponseDto] })
  async find(@Query() filter: GetExerciseLogsFilterDto) {
    const logs = await this.service.getByFilter(filter);
    return logs;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get exercise log by id' })
  @ApiResponse({ status: 200, type: ExerciseLogResponseDto })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async findOne(@Param('id', ParseUUIDPipe) id:  number) {
    const log = await this.service.getById(id);
    return log;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update exercise log by id' })
  @ApiResponse({ status: 200, type: ExerciseLogResponseDto })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async update(
    @Param('id', ParseUUIDPipe) id:  number,
    @Body() dto: UpdateExerciseLogDto,
  ) {
    const updated = await this.service.update(id, dto);
    return updated;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete exercise log by id' })
  @ApiResponse({ status: 204 })
  @ApiParam({ name: 'id', type: 'string', format: 'uuid' })
  async remove(@Param('id', ParseUUIDPipe) id:  number) {
    await this.service.delete(id);
  }
}
