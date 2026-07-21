import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// neon-http, not a pg.Pool — a persistent pool per serverless invocation
// exhausts Neon's connection limit fast. neon-http doesn't support
// multi-statement transactions; nothing here needs one yet.
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set — copy .env.local.example to .env.local");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
