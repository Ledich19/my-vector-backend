import { Inject, Injectable } from '@nestjs/common';
import { userPsyTasks } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../../drizzle/schema';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { CreateUserPsyTaskDto } from '../dto/create-user-psy-task.dto';
import { UserPsyTaskResponseDto } from '../dto/user-psy-task-response.dto';
import { UpdateUserPsyTaskDto } from '../dto/update-user-psy-task.dto';

@Injectable()
export class UserPsyTasksService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: CreateUserPsyTaskDto): Promise<UserPsyTaskResponseDto> {
    const [result] = await this.db.insert(userPsyTasks).values(dto).returning();
    return result;
  }

  async findAll(): Promise<UserPsyTaskResponseDto[]> {
    return this.db.select().from(userPsyTasks);
  }

  async findOne(id: number): Promise<UserPsyTaskResponseDto> {
    const [result] = await this.db
      .select()
      .from(userPsyTasks)
      .where(eq(userPsyTasks.id, id));
    return result;
  }

  async update(
    id: number,
    dto: UpdateUserPsyTaskDto,
  ): Promise<UserPsyTaskResponseDto> {
    const [result] = await this.db
      .update(userPsyTasks)
      .set(dto)
      .where(eq(userPsyTasks.id, id))
      .returning();
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(userPsyTasks).where(eq(userPsyTasks.id, id));
  }
}
