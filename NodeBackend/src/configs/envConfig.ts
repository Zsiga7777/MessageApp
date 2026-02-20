import dotenv from "dotenv";
import { EnvConfig, envSchema } from "../validations/env.validation";
import { ZodError } from "zod";
dotenv.config();

export const validateEnv = () => {
  try {
    const envVars: EnvConfig = envSchema.parse(process.env);
    return {
      port: +envVars.PORT,
      env: envVars.NODE_ENV,
      MONGO_DB_URI: envVars.MONGO_DB_URI,
      jwtconfig: {
        accessSecret: envVars.JWT_SECRET_KEY,
        refreshTokenSecret: envVars.JWT_REFRESH_SECRET_KEY,
      },
      smtp: {
        host: envVars.SMTP_HOST,
        port: envVars.SMTP_PORT,
        service: envVars.SMTP_SERVICE,
        mail: envVars.SMTP_MAIL,
        password: envVars.SMTP_PASSWORD,
      },
    };
  } catch (error) {
    let message = undefined;
    if (error instanceof ZodError) {
      message = error.message;
      console.error("Validation failed:", error.message);
    } else {
      console.error("Error parsing environment variables:", error);
    }
  }
};
