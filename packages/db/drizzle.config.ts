import { loadEnvFile } from "node:process";

import type { Config } from "drizzle-kit";

// Load .env from /apps/web
loadEnvFile("../../apps/web/.env");

export default {
  out: "./migrations",
  schema: "./src/schema/index.ts",
  breakpoints: true,
  verbose: true,
  strict: true,
  casing: "snake_case",

  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
} satisfies Config;
