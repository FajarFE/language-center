import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const Lead = pgTable('Lead', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  noWhatapps: varchar('no_whatapps').notNull(),
});
