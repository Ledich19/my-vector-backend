import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProtocolDto } from './dto/create-protocol.dto';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq, ilike, sql } from 'drizzle-orm';
import * as schema from '../drizzle/schema';

@Injectable()
export class ProtocolsService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async create(dto: CreateProtocolDto) {
    const [protocol] = await this.db
      .insert(schema.protocols)
      .values({
        name: dto.name,
        description: dto.description ?? null,
        content: dto.content,
      })
      .returning();

    return protocol;
  }

  async findAll({
    page = 1,
    limit = 10,
    search = '',
  }: {
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const offset = (page - 1) * limit;

    const where = search
      ? ilike(schema.protocols.name, `%${search}%`)
      : undefined;

    const [data, total] = await Promise.all([
      this.db
        .select()
        .from(schema.protocols)
        .where(where)
        .limit(limit)
        .offset(offset),
      this.db
        .select({ count: sql<number>`count(*)` })
        .from(schema.protocols)
        .where(where)
        .then((res) => Number(res[0].count)),
    ]);

    return {
      data,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const [protocol] = await this.db
      .select()
      .from(schema.protocols)
      .where(eq(schema.protocols.id, id));

    if (!protocol) throw new NotFoundException(`Protocol ${id} not found`);

    return protocol;
  }

  async remove(id: number) {
    const [deleted] = await this.db
      .delete(schema.protocols)
      .where(eq(schema.protocols.id, id))
      .returning();

    if (!deleted) throw new NotFoundException(`Protocol ${id} not found`);
    return deleted;
  }
}
