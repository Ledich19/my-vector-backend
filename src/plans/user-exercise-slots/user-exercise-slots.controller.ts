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
import { UserExerciseSlotsService } from './user-exercise-slots.service';

@Controller('user-exercise-slots')
export class UserExerciseSlotsController {
  constructor(private readonly service: UserExerciseSlotsService) {}

  // @Get(':dayId')
  // getSlots(@Param('dayId') dayId: string) {
  //   return this.service.getSlotsByDay(dayId);
  // }

  // @Post()
  // create(@Body() dto: CreateUserExerciseSlotDto) {
  //   return this.service.create(dto);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() dto: UpdateUserExerciseSlotDto) {
  //   return this.service.update(id, dto);
  // }

  // @Delete(':id')
  // delete(@Param('id') id: string) {
  //   return this.service.delete(id);
  // }
}
