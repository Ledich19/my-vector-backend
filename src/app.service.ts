import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './drizzle/schema';
import { DrizzleAsyncProvider } from './drizzle/drizzle.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async getHello() {
    await this.db.insert(schema.users).values({
      id: '550e8400-e29b-41d4-a716-446655440000',
      email: 'test@example.com',
      role_id: 1,
    });
  }
}
