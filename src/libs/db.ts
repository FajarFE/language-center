import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

import * as schema from '../../db/schema';

const sqlDb = neon(process.env.DATABASE_URL!);

export const db = drizzle(sqlDb, { schema });
