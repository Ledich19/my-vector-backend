import { Inject, Injectable } from '@nestjs/common';
import { psyTaskTemplates } from '../../drizzle/schema';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../../drizzle/schema';
import { CreatePsyTaskTemplateDto } from '../dto/template/create-psy-task-template.dto';
import { PsyTaskTemplateResponseDto } from '../dto/template/psy-task-template-response.dto';
import { UpdatePsyTaskTemplateDto } from '../dto/template/update-psy-task-template.dto';

@Injectable()
export class PsyTaskTemplatesService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(
    dto: CreatePsyTaskTemplateDto,
  ): Promise<PsyTaskTemplateResponseDto> {
    const [result] = await this.db
      .insert(psyTaskTemplates)
      .values(dto)
      .returning();

    return result;
  }

  findAll(): Promise<PsyTaskTemplateResponseDto[]> {
    return this.db.select().from(psyTaskTemplates);
  }

  async findOne(id: number): Promise<PsyTaskTemplateResponseDto> {
    const [result] = await this.db
      .select()
      .from(psyTaskTemplates)
      .where(eq(psyTaskTemplates.id, id));
    return result;
  }

  async update(
    id: number,
    dto: UpdatePsyTaskTemplateDto,
  ): Promise<PsyTaskTemplateResponseDto> {
    const [result] = await this.db
      .update(psyTaskTemplates)
      .set(dto)
      .where(eq(psyTaskTemplates.id, id))
      .returning();
    return result;
  }

  async delete(id: number): Promise<void> {
    await this.db.delete(psyTaskTemplates).where(eq(psyTaskTemplates.id, id));
  }
}
