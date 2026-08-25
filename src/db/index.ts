import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Falta la variable de entorno DATABASE_URL");
}

const client = postgres(connectionString, {
  ssl: connectionString.includes("localhost") ? false : "require",
});

export const db = drizzle(client, { schema });
