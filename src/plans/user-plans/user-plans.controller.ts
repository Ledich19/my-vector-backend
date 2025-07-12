
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
import { UserPlansService } from './user-plans.service';

@Controller('user-plans')
export class UserPlansController {
  constructor(private readonly service: UserPlansService) {}

  // @Post()
  // create(@Body() dto: CreateUserPlanDto) {
  //   return this.service.createUserPlan(dto);
  // }

  // @Post('from-template')
  // createFromTemplate(@Body() dto: CreateUserPlanFromTemplateDto) {
  //   return this.service.createFromTemplate(dto);
  // }

  // @Get(':userId')
  // getUserPlans(@Param('userId', ParseUUIDPipe) userId:  number) {
  //   return this.service.getPlansByUser(userId);
  // }

  // @Get(':userId/full')
  // getFullPlans(@Param('userId', ParseUUIDPipe) userId:  number) {
  //   return this.service.getFullUserPlans(userId);
  // }

  // @Delete(':planId')
  // delete(@Param('planId', ParseUUIDPipe) planId:  number) {
  //   return this.service.deleteUserPlan(planId);
  // }
}
