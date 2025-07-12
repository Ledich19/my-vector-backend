import { Inject, Injectable } from '@nestjs/common';
import {
  NodePgDatabase,
  NodePgQueryResultHKT,
} from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../../drizzle/schema';
import { eq, ExtractTablesWithRelations, inArray } from 'drizzle-orm';
import { CreatePlanTemplateDto } from '../dto/create-plan-template.dto';
import {
  UpdateExerciseSlotTemplateDto,
  UpdatePlanTemplateDto,
} from '../dto/update-plan-template.dto';
import { PgTransaction } from 'drizzle-orm/pg-core';

@Injectable()
export class PlanTemplatesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getAll() {
    return this.db.select().from(schema.planTemplates);
  }

  async getById(id: number) {
    const plan = await this.db.query.planTemplates.findFirst({
      where: (plan) => eq(plan.id, id),
      with: {
        days: {
          with: {
            slots: true,
          },
        },
      },
    });
    return plan;
  }

  async create(data: CreatePlanTemplateDto) {
    return this.db.transaction(async (tx) => {
      const [plan] = await tx
        .insert(schema.planTemplates)
        .values({
          title: data.title,
          description: data.description,
          repetitions: data.repetitions,
        })
        .returning();

      for (const day of data.days) {
        const [createdDay] = await tx
          .insert(schema.scheduledDayTemplates)
          .values({
            planTemplateId: plan.id,
            dayNumber: day.dayNumber,
          })
          .returning();

        for (const slot of day.exerciseSlots) {
          await tx.insert(schema.exerciseSlotTemplates).values({
            scheduledDayTemplateId: createdDay.id,
            exerciseId: slot.exerciseId,
            time: slot.time,
            repetitions: slot.repetitions,
            durationSeconds: slot.durationSeconds,
          });
        }
      }

      return plan;
    });
  }

  async update(id: number, data: UpdatePlanTemplateDto) {
    return this.db.transaction(async (tx) => {
      // Обновить поля плана
      await tx
        .update(schema.planTemplates)
        .set({
          title: data.title,
          description: data.description,
          repetitions: data.repetitions,
        })
        .where(eq(schema.planTemplates.id, id));

      // Получить текущие дни шаблона
      const existingDays = await tx
        .select()
        .from(schema.scheduledDayTemplates)
        .where(eq(schema.scheduledDayTemplates.planTemplateId, id));

      const existingDayIds = existingDays.map((d) => d.id);

      const incomingDayIds = data.days.map((d) => d.id).filter(Boolean);

      // Удалить дни, которых нет в пришедших данных
      const daysToDelete = existingDayIds.filter(
        (id) => !incomingDayIds.includes(id),
      );
      if (daysToDelete.length) {
        await tx
          .delete(schema.scheduledDayTemplates)
          .where(inArray(schema.scheduledDayTemplates.id, daysToDelete));
      }

      for (const day of data.days) {
        if (day.id && existingDayIds.includes(day.id)) {
          // Обновить существующий день
          await tx
            .update(schema.scheduledDayTemplates)
            .set({ dayNumber: day.dayNumber })
            .where(eq(schema.scheduledDayTemplates.id, day.id));

          // Обработать слоты дня
          await this.syncExerciseSlots(tx, day.id, day.exerciseSlots);
        } else {
          // Создать новый день
          const [createdDay] = await tx
            .insert(schema.scheduledDayTemplates)
            .values({
              planTemplateId: id,
              dayNumber: day.dayNumber,
            })
            .returning();

          // Создать слоты нового дня
          for (const slot of day.exerciseSlots) {
            await tx.insert(schema.exerciseSlotTemplates).values({
              scheduledDayTemplateId: createdDay.id,
              exerciseId: slot.exerciseId,
              time: slot.time,
              repetitions: slot.repetitions,
              durationSeconds: slot.durationSeconds,
            });
          }
        }
      }
    });
  }

  async syncExerciseSlots(
    tx: PgTransaction<
      NodePgQueryResultHKT,
      typeof schema,
      ExtractTablesWithRelations<typeof schema>
    >,
    dayId: number,
    slots: UpdateExerciseSlotTemplateDto[],
  ) {
    const existingSlots = await tx
      .select()
      .from(schema.exerciseSlotTemplates)
      .where(eq(schema.exerciseSlotTemplates.scheduledDayTemplateId, dayId));

    const existingSlotIds = existingSlots.map((s) => s.id);
    const incomingSlotIds = slots.map((s) => s.id).filter(Boolean);

    // Удалить отсутствующие слоты
    const slotsToDelete = existingSlotIds.filter(
      (id) => !incomingSlotIds.includes(id),
    );
    if (slotsToDelete.length) {
      await tx
        .delete(schema.exerciseSlotTemplates)
        .where(inArray(schema.exerciseSlotTemplates.id, slotsToDelete));
    }

    for (const slot of slots) {
      if (slot.id && existingSlotIds.includes(slot.id)) {
        // Обновить слот
        await tx
          .update(schema.exerciseSlotTemplates)
          .set({
            exerciseId: slot.exerciseId,
            time: slot.time,
            repetitions: slot.repetitions,
            durationSeconds: slot.durationSeconds,
          })
          .where(eq(schema.exerciseSlotTemplates.id, slot.id));
      } else {
        // Создать новый слот
        await tx.insert(schema.exerciseSlotTemplates).values({
          scheduledDayTemplateId: dayId,
          exerciseId: slot.exerciseId,
          time: slot.time,
          repetitions: slot.repetitions,
          durationSeconds: slot.durationSeconds,
        });
      }
    }
  }
  // Вспомогательная функция для синхронизации exerciseSlots одного дня

  async delete(id: number) {
    await this.db
      .delete(schema.planTemplates)
      .where(eq(schema.planTemplates.id, id));
  }
}
