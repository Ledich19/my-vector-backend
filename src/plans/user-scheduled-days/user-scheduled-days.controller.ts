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
import { UserScheduledDaysService } from './user-scheduled-days.service';

@Controller('user-scheduled-days')
export class UserScheduledDaysController {
  constructor(private readonly service: UserScheduledDaysService) {}


}
