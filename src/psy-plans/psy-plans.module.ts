import { Module } from '@nestjs/common';
import { PsyPlanTemplatesController } from './controllers/psy-plan-templates.controller';
import { DrizzleModule } from 'src/drizzle/drizzle.module';
import { PsyTaskTemplatesController } from './controllers/psy-task-templates.controller';
import { UserPsyPlansController } from './controllers/user-psy-plans.controller';
import { UserPsyTasksController } from './controllers/user-psy-tasks.controller';
import { PsyPlanTemplatesService } from './services/psy-plan-templates.service';
import { PsyTaskTemplatesService } from './services/psy-task-templates.service';
import { UserPsyPlansService } from './services/user-psy-plans.service';
import { UserPsyTasksService } from './services/user-psy-tasks.service';
@Module({
  imports: [DrizzleModule],
  controllers: [
    PsyPlanTemplatesController,
    PsyTaskTemplatesController,
    UserPsyPlansController,
    UserPsyTasksController,
  ],
  providers: [
    PsyPlanTemplatesService,
    PsyTaskTemplatesService,
    UserPsyPlansService,
    UserPsyTasksService,
  ],
})
export class PsyPlansModule {}
