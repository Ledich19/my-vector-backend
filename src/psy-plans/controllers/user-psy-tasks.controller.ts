import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPsyTasksService } from '../services/user-psy-tasks.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserPsyTaskResponseDto } from '../dto/user-psy-task-response.dto';
import { CreateUserPsyTaskDto } from '../dto/create-user-psy-task.dto';
import { UpdateUserPsyTaskDto } from '../dto/update-user-psy-task.dto';

@ApiTags('user-psy-tasks')
@Controller('user-psy-tasks')
export class UserPsyTasksController {
  constructor(private readonly userPsyTasksService: UserPsyTasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user psychological task' })
  @ApiResponse({
    status: 201,
    description: 'User task created',
    type: UserPsyTaskResponseDto,
  })
  create(
    @Body() createDto: CreateUserPsyTaskDto,
  ): Promise<UserPsyTaskResponseDto> {
    return this.userPsyTasksService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user psychological tasks' })
  @ApiResponse({
    status: 200,
    description: 'List of user tasks',
    type: [UserPsyTaskResponseDto],
  })
  findAll(): Promise<UserPsyTaskResponseDto[]> {
    return this.userPsyTasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user psychological task by ID' })
  @ApiResponse({
    status: 200,
    description: 'User task details',
    type: UserPsyTaskResponseDto,
  })
  findOne(@Param('id') id: string): Promise<UserPsyTaskResponseDto> {
    return this.userPsyTasksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user psychological task' })
  @ApiResponse({
    status: 200,
    description: 'Updated user task',
    type: UserPsyTaskResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserPsyTaskDto,
  ): Promise<UserPsyTaskResponseDto> {
    return this.userPsyTasksService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user psychological task' })
  @ApiResponse({ status: 204, description: 'User task deleted' })
  delete(@Param('id') id: string): Promise<void> {
    return this.userPsyTasksService.delete(+id);
  }
}
