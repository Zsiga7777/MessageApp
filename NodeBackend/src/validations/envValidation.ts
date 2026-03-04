import { z } from 'zod';

export const envSchema = z.object({
    PORT: z.string({ error: "Port number is required" }),
    NODE_ENV: z.enum(['development', "production", "test"]),
    MONGO_DB_URI: z.string({ error: "Db url is required" }),
    JWT_SECRET_KEY: z.string({ error: "JWT secret key is required" }),
    JWT_REFRESH_SECRET_KEY:z.string({ error: "JWT Refresh secret key is required" }),
     SMTP_HOST: z.string().min(1, { message: "SMTP_HOST is required" }),
    SMTP_PORT: z.string().min(1, { message: "SMTP_PORT is required" }),
    SMTP_SERVICE: z.string().min(1, { message: "SMTP_SERVICE is required" }),
    SMTP_MAIL: z.string().min(1, { message: "SMTP_MAIL is required" }),
    SMTP_PASSWORD: z.string().min(1, { message: "SMTP_PASSWORD is required" }),
});
export type EnvConfig = z.infer<typeof envSchema>;