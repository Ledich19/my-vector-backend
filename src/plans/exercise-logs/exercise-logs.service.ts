import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../../drizzle/schema';
import { and, eq, gte, lte } from 'drizzle-orm';
import { GetExerciseLogsFilterDto } from '../dto/get-exercise-logs-filter.dto';
import { UpdateExerciseLogDto } from '../dto/update-exercise-log.dto';
import { CreateExerciseLogDto } from '../dto/create-exercise-log.dto';

@Injectable()
export class ExerciseLogsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(data: CreateExerciseLogDto) {
    const insertData = {
      ...data,
      date: new Date(data.date),
    };
    const [created] = await this.db
      .insert(schema.exerciseLogs)
      .values(insertData)
      .returning();
    return created;
  }

  async getByFilter(filter: GetExerciseLogsFilterDto) {
    const {
      userId,
      userPlanId,
      dateFrom,
      dateTo,
      page = 1,
      pageSize = 20,
    } = filter;

    const whereConditions = [eq(schema.exerciseLogs.userId, userId)];

    if (userPlanId)
      whereConditions.push(eq(schema.exerciseLogs.userPlanId, userPlanId));
    if (dateFrom)
      whereConditions.push(gte(schema.exerciseLogs.date, new Date(dateFrom)));
    if (dateTo)
      whereConditions.push(lte(schema.exerciseLogs.date, new Date(dateTo)));

    return this.db
      .select()
      .from(schema.exerciseLogs)
      .where(and(...whereConditions))
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  }

  async update(id: number, data: UpdateExerciseLogDto) {
    const updateData = {
      ...data,
      date: data.date ? new Date(data.date) : undefined,
    };

    return this.db
      .update(schema.exerciseLogs)
      .set(updateData)
      .where(eq(schema.exerciseLogs.id, id));
  }

  async delete(id: number) {
    return this.db
      .delete(schema.exerciseLogs)
      .where(eq(schema.exerciseLogs.id, id));
  }

  async getById(id: number) {
    const log = await this.db
      .select()
      .from(schema.exerciseLogs)
      .where(eq(schema.exerciseLogs.id, id))
      .limit(1);
    return log[0] ?? null;
  }
}
