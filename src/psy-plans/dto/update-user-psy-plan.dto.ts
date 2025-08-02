import { PartialType } from '@nestjs/swagger';
import { CreateUserPsyPlanDto } from './create-user-psy-plan.dto';

export class UpdateUserPsyPlanDto extends PartialType(CreateUserPsyPlanDto) {}
