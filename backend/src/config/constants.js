const path = require("path");
const { z } = require("zod");

require("dotenv").config({ path: path.join(__dirname, "../../.env") });
require("dotenv").config();

const envSchema = z.object({
  DATABASE_URL: z.string().url("DATABASE_URL must be a valid Postgres connection string"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),
  JWT_EXPIRES_IN: z.string().min(1).default("1h"),
  DEMO_ADMIN_USERNAME: z.string().trim().min(1).default("satvik"),
  DEMO_ADMIN_PASSWORD: z.string().min(8).default("password123"),
  HOST: z.string().trim().min(1).default("127.0.0.1"),
  PORT: z.coerce.number().int().positive().default(5001),
  CORS_ORIGINS: z.string().default("http://localhost:3000")
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const messages = parsedEnv.error.issues.map((issue) => {
    return `${issue.path.join(".")}: ${issue.message}`;
  });

  throw new Error(`Invalid environment configuration:\n${messages.join("\n")}`);
}

module.exports = parsedEnv.data;
