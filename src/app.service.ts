import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

import * as schema from './drizzle/schema';
import { DrizzleAsyncProvider } from './drizzle/drizzle.provider';

@Injectable()
export class AppService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  async getHello() {
    await this.db.insert(schema.users).values({
      id: 1,
      email: 'test@example.com',
      role_id: 1,
    });

    return 'Hello World!';
  }
}
