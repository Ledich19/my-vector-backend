import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';
import { type NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import path from 'path';
import pg from 'pg';
import { exit } from 'process';

import * as allSchema from './schema';
import defaultEmotions from './data/defaultEmotions';

dotenv.config();

(async () => {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
  });
  let db: NodePgDatabase<typeof allSchema> | null = null;
  db = drizzle(pool, {
    schema: {
      ...allSchema,
    },
  });

  // Look for migrations in the src/drizzle/migrations folder
  const migrationPath = path.join(process.cwd(), 'src/drizzle/migrations');

  // Run the migrations
  await migrate(db, { migrationsFolder: migrationPath });

  // Insert default roles
  for (const role of ['Super Admin', 'Admin', 'User', 'Guest']) {
    const existingUserRole = await db
      ?.select({
        name: allSchema.user_role.name,
      })
      .from(allSchema.user_role)
      .where(eq(allSchema.user_role.name, role));
    if (!existingUserRole[0]) {
      await db?.insert(allSchema.user_role).values({ name: role });
    }
  }

  for (const emotion of defaultEmotions) {
    const exists = await db
      ?.select()
      .from(allSchema.emotions)
      .where(eq(allSchema.emotions.value, emotion.value))
      .limit(1);

    if (!exists?.length) {
      await db?.insert(allSchema.emotions).values(emotion);
    }
  }

  console.log('Migration complete');
  exit(0);
})();
