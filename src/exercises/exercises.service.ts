// src/exercises/exercises.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { eq } from 'drizzle-orm';

@Injectable()
export class ExercisesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: CreateExerciseDto) {
    const [newExercise] = await this.db
      .insert(schema.exercises)
      .values(dto)
      .returning();
    return newExercise;
  }

  async findAll() {
    return this.db.select().from(schema.exercises);
  }

  async findOne(id: string) {
    return this.db.query.exercises.findFirst({
      where: eq(schema.exercises.id, id),
    });
  }

  async update(id: string, dto: UpdateExerciseDto) {
    const [updated] = await this.db
      .update(schema.exercises)
      .set(dto)
      .where(eq(schema.exercises.id, id))
      .returning();
    return updated;
  }

  async remove(id: string) {
    return this.db.delete(schema.exercises).where(eq(schema.exercises.id, id));
  }
}
