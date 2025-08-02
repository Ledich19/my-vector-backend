import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserPsyPlansService } from '../services/user-psy-plans.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserPsyPlanResponseDto } from '../dto/user-psy-plan-response.dto';
import { CreateUserPsyPlanDto } from '../dto/create-user-psy-plan.dto';
import { UpdateUserPsyPlanDto } from '../dto/update-user-psy-plan.dto';

@ApiTags('user-psy-plans')
@Controller('user-psy-plans')
export class UserPsyPlansController {
  constructor(private readonly userPsyPlansService: UserPsyPlansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new user psychological plan' })
  @ApiResponse({
    status: 201,
    description: 'User plan created',
    type: UserPsyPlanResponseDto,
  })
  create(
    @Body() createDto: CreateUserPsyPlanDto,
  ): Promise<UserPsyPlanResponseDto> {
    return this.userPsyPlansService.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user psychological plans' })
  @ApiResponse({
    status: 200,
    description: 'List of user plans',
    type: [UserPsyPlanResponseDto],
  })
  findAll(): Promise<UserPsyPlanResponseDto[]> {
    return this.userPsyPlansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user psychological plan by ID' })
  @ApiResponse({
    status: 200,
    description: 'User plan details',
    type: UserPsyPlanResponseDto,
  })
  findOne(@Param('id') id: string): Promise<UserPsyPlanResponseDto> {
    return this.userPsyPlansService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user psychological plan' })
  @ApiResponse({
    status: 200,
    description: 'Updated user plan',
    type: UserPsyPlanResponseDto,
  })
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateUserPsyPlanDto,
  ): Promise<UserPsyPlanResponseDto> {
    return this.userPsyPlansService.update(+id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user psychological plan' })
  @ApiResponse({ status: 204, description: 'User plan deleted' })
  delete(@Param('id') id: string): Promise<void> {
    return this.userPsyPlansService.delete(+id);
  }
}
