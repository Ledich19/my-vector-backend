import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmotionEntrieDto } from './dto/create-emotion-entrie.dto';
import { UpdateEmotionEntrieDto } from './dto/update-emotion-entrie.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { and, eq, sql } from 'drizzle-orm';
import { FindEmotionEntriesQueryDto } from './dto/find-emotion-entries-query.dto';

@Injectable()
export class EmotionEntrieService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: CreateEmotionEntrieDto) {
    const [created] = await this.db
      .insert(schema.emotionEntries)
      .values(dto)
      .returning();

    return created;
  }

  async findAll() {
    return this.db.query.emotionEntries.findMany({});
  }

  async findOne(id: number) {
    const result = await this.db.query.emotionEntries.findFirst({
      where: eq(schema.emotionEntries.id, id),
    });

    if (!result) {
      throw new NotFoundException(`Emotion entry with id ${id} not found`);
    }

    return result;
  }

  async findByUserId(dto: FindEmotionEntriesQueryDto, userId: number) {
    const offset = (dto.page - 1) * dto.limit;

    const conditions = [eq(schema.emotionEntries.userId, userId)];

    if (dto.emotionId) {
      conditions.push(eq(schema.emotionEntries.emotionId, dto.emotionId));
    }

    const [items, totalResult] = await Promise.all([
      this.db.query.emotionEntries.findMany({
        where: and(...conditions),
        limit: dto.limit,
        offset,
        with: {
          emotion: true, // ← подтягиваем связанные данные эмоции
        },
        orderBy: (entry, { desc }) => desc(entry.createdAt),
      }),
      this.db
        .select({ count: sql<number>`count(*)` })
        .from(schema.emotionEntries)
        .where(and(...conditions))
        .then((res) => res[0].count),
    ]);

    return {
      items,
      totalCount: totalResult,
    };
  }

  async countEmotionsByUserId(userId: number) {
    const result = await this.db
      .select({
        emotionId: schema.emotionEntries.emotionId,
        count: sql<number>`count(*)`,
        label: schema.emotions.label,
        icon: schema.emotions.icon,
      })
      .from(schema.emotionEntries)
      .leftJoin(
        schema.emotions,
        eq(schema.emotionEntries.emotionId, schema.emotions.id),
      )
      .where(eq(schema.emotionEntries.userId, userId))
      .groupBy(
        schema.emotionEntries.emotionId,
        schema.emotions.label,
        schema.emotions.icon,
      );

    return result;
  }

  async update(id: number, dto: UpdateEmotionEntrieDto) {
    const [updated] = await this.db
      .update(schema.emotionEntries)
      .set(dto)
      .where(eq(schema.emotionEntries.id, id))
      .returning();

    if (!updated) {
      throw new NotFoundException(`Emotion entry with id ${id} not found`);
    }

    return updated;
  }

  async remove(id: number) {
    const [deleted] = await this.db
      .delete(schema.emotionEntries)
      .where(eq(schema.emotionEntries.id, id))
      .returning();

    if (!deleted) {
      throw new NotFoundException(`Emotion entry with id ${id} not found`);
    }

    return deleted;
  }
}
