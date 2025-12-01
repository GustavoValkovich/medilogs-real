import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

// In production require explicit env vars to avoid accidental default credentials
if (process.env.NODE_ENV === 'production') {
  const missing = [] as string[];
  if (!process.env.PGUSER && !process.env.POSTGRES_USER && !process.env.DB_USER) missing.push('PGUSER/POSTGRES_USER/DB_USER');
  if (!process.env.PGHOST && !process.env.PG_HOST && !process.env.DB_HOST) missing.push('PGHOST/PG_HOST/DB_HOST');
  if (!process.env.PGDATABASE && !process.env.POSTGRES_DB && !process.env.DB_NAME) missing.push('PGDATABASE/POSTGRES_DB/DB_NAME');
  if (!process.env.PGPASSWORD && !process.env.POSTGRES_PASSWORD && !process.env.DB_PASSWORD) missing.push('PGPASSWORD/POSTGRES_PASSWORD/DB_PASSWORD');
  if (missing.length > 0) {
    throw new Error(`Missing required DB environment variables in production: ${missing.join(', ')}`);
  }
}

const poolConfig = {
  user: process.env.PGUSER || process.env.POSTGRES_USER || process.env.DB_USER || 'postgres',
  host: process.env.PGHOST || process.env.DB_HOST || 'localhost',
  database: process.env.PGDATABASE || process.env.POSTGRES_DB || process.env.DB_NAME || 'medilogs',
  password: process.env.PGPASSWORD || process.env.POSTGRES_PASSWORD || process.env.DB_PASSWORD || 'postgres',
  port: Number(process.env.PGPORT || process.env.DB_PORT || 5432),
};

export const pool = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "medilogs",
  port: Number(process.env.DB_PORT) || 5432,
})