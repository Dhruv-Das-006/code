import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Lazy initialization to prevent build-time errors when env vars are missing
let queryClient: any;
let dbInstance: any;

export const getDb = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  if (!dbInstance) {
    queryClient = postgres(process.env.DATABASE_URL);
    dbInstance = drizzle(queryClient, { schema });
  }
  return dbInstance;
};

// Export a proxy or just the function
export const db = new Proxy({} as any, {
  get: (target, prop) => {
    return getDb()[prop];
  }
});
