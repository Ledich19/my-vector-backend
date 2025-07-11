import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../../drizzle/schema';

@Injectable()
export class UserExerciseSlotsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // async getSlotsByDay(dayId: string) {
  //   // получить слоты упражнений по дню
  // }

  // async create(data: any) {
  //   // создать слот упражнения
  // }

  // async update(id: string, data: any) {
  //   // обновить слот упражнения
  // }

  // async delete(id: string) {
  //   // удалить слот упражнения (логическое удаление)
  // }
}