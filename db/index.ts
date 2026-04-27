import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Simplified lazy initialization
let dbInstance: any;

export const getDb = () => {
  if (!dbInstance) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }
    const queryClient = postgres(process.env.DATABASE_URL, {
      ssl: 'require', // Ensure SSL is used as requested by Neon URL
    });
    dbInstance = drizzle(queryClient, { schema });
  }
  return dbInstance;
};

// Export db as a getter to ensure it's always initialized correctly
export const db = new Proxy({} as any, {
  get: (target, prop) => {
    return getDb()[prop];
  }
});
