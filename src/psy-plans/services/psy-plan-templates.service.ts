import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { psyPlanTemplates } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../../drizzle/schema';
import { PsyTaskTemplatesService } from './psy-task-templates.service';
import { CreatePsyPlanTemplateDto } from '../dto/template/create-psy-plan-template.dto';
import { PsyPlanTemplateResponseDto } from '../dto/template/psy-plan-template-response.dto';
import { UpdatePsyPlanTemplateDto } from '../dto/template/update-psy-plan-template.dto';

@Injectable()
export class PsyPlanTemplatesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,

    private readonly psyTaskTemplatesService: PsyTaskTemplatesService,
  ) {}

  async create(
    dto: CreatePsyPlanTemplateDto,
  ): Promise<PsyPlanTemplateResponseDto> {
    const [result] = await this.db
      .insert(psyPlanTemplates)
      .values(dto)
      .returning();

    for (const [dayIndex, day] of (dto.days ?? []).entries()) {
      const dayRepetitions = day.repetitions ?? 1;

      for (let rep = 0; rep < dayRepetitions; rep++) {
        for (const task of day.tasks ?? []) {
          await this.psyTaskTemplatesService.create({
            ...task,
            planTemplateId: result.id,
            dayNumber: dayIndex * dayRepetitions + rep,
          });
        }
      }
    }

    return result;
  }

  async findAll(): Promise<PsyPlanTemplateResponseDto[]> {
    return this.db.select().from(psyPlanTemplates);
  }

  async findOne(id: number): Promise<PsyPlanTemplateResponseDto> {
    const result = await this.db.query.psyPlanTemplates.findFirst({
      where: eq(psyPlanTemplates.id, id),
      with: {
        tasks: true,
      },
    });

    if (!result) {
      throw new NotFoundException(`PsyPlanTemplate #${id} not found`);
    }

    return result;
  }

  async update(
    id: number,
    dto: UpdatePsyPlanTemplateDto,
  ): Promise<PsyPlanTemplateResponseDto> {
    const [result] = await this.db
      .update(psyPlanTemplates)
      .set(dto)
      .where(eq(psyPlanTemplates.id, id))
      .returning();
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(psyPlanTemplates).where(eq(psyPlanTemplates.id, id));
  }
}
