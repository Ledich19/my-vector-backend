import { Inject, Injectable } from '@nestjs/common';
import { userPsyPlans } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import * as schema from '../../drizzle/schema';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { UserPsyPlanResponseDto } from '../dto/user-psy-plan-response.dto';
import { CreateUserPsyPlanDto } from '../dto/create-user-psy-plan.dto';
import { UpdateUserPsyPlanDto } from '../dto/update-user-psy-plan.dto';

@Injectable()
export class UserPsyPlansService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: CreateUserPsyPlanDto): Promise<UserPsyPlanResponseDto> {
    const [result] = await this.db.insert(userPsyPlans).values(dto).returning();
    return result;
  }

  async findAll(): Promise<UserPsyPlanResponseDto[]> {
    return this.db.select().from(userPsyPlans);
  }

  async findOne(id: number): Promise<UserPsyPlanResponseDto> {
    const [result] = await this.db
      .select()
      .from(userPsyPlans)
      .where(eq(userPsyPlans.id, id));
    return result;
  }

  async update(
    id: number,
    dto: UpdateUserPsyPlanDto,
  ): Promise<UserPsyPlanResponseDto> {
    const [result] = await this.db
      .update(userPsyPlans)
      .set(dto)
      .where(eq(userPsyPlans.id, id))
      .returning();
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(userPsyPlans).where(eq(userPsyPlans.id, id));
  }
}
