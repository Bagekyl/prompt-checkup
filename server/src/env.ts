import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DIFY_API_BASE_URL: z.string().url().default('https://api.dify.ai/v1'),
  DIFY_API_KEY: z.string().optional(),
  DIFY_USER: z.string().min(1).default('local-user'),
  NODE_ENV: z.string().optional(),
  SERVER_PORT: z.coerce.number().int().positive().default(8787)
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const fields = parsed.error.flatten().fieldErrors;
  throw new Error(`Invalid server environment: ${JSON.stringify(fields)}`);
}

const stripTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const env = {
  difyApiBaseUrl: stripTrailingSlash(parsed.data.DIFY_API_BASE_URL),
  difyApiKey: parsed.data.DIFY_API_KEY,
  difyUser: parsed.data.DIFY_USER,
  nodeEnv: parsed.data.NODE_ENV,
  port: parsed.data.SERVER_PORT
};

export function isDifyConfigured() {
  return Boolean(env.difyApiKey && env.difyApiKey !== 'your_dify_app_api_key_here');
}
