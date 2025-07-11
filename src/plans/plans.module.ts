import { Module } from '@nestjs/common';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { PlanTemplatesService } from './plan-templates/plan-templates.service';
import { UserPlansService } from './user-plans/user-plans.service';
import { UserScheduledDaysService } from './user-scheduled-days/user-scheduled-days.service';
import { UserExerciseSlotsService } from './user-exercise-slots/user-exercise-slots.service';
import { ExerciseLogsService } from './exercise-logs/exercise-logs.service';

import { PlanTemplatesController } from './plan-templates/plan-templates.controller';
import { UserPlansController } from './user-plans/user-plans.controller';
import { UserScheduledDaysController } from './user-scheduled-days/user-scheduled-days.controller';
import { UserExerciseSlotsController } from './user-exercise-slots/user-exercise-slots.controller';
import { ExerciseLogsController } from './exercise-logs/exercise-logs.controller';

@Module({
  imports: [DrizzleModule],
  controllers: [
    PlanTemplatesController,
    UserPlansController,
    UserScheduledDaysController,
    UserExerciseSlotsController,
    ExerciseLogsController,
  ],
  providers: [
    PlanTemplatesService,
    UserPlansService,
    UserScheduledDaysService,
    UserExerciseSlotsService,
    ExerciseLogsService,
  ],
})
export class PlansModule {}
