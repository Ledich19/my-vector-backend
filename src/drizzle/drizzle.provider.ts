import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';
import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
export const DrizzleAsyncProvider = 'DrizzleAsyncProvider';

export const drizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      // const connectionString = configService.get<string>('DATABASE_URL');
      const connectionString = process.env.DATABASE_URL;
      // 'postgresql://postgres:postgres@localhost:5432/statistic?schema=public';
      const pool = new Pool({
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        connectionString,
      });

      return drizzle(pool, { schema }) as NodePgDatabase<typeof schema>;
    },
  },
];
