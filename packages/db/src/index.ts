import "@tanstack/react-start/server-only";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import { relations as authRelations } from "./schema/auth.schema";
import { relations } from "./schema/relations";

const client = postgres(process.env.DATABASE_URL as string);

export const db = drizzle({
  client,
  // authRelations must come first, since it's using defineRelations as the main relation
  // https://orm.drizzle.team/docs/relations-v2#relations-parts
  relations: { ...authRelations, ...relations },
});
