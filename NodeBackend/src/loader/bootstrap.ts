import { bootstrapExpress } from "./app";
import { logger } from "../configs/logger";
import { validateEnv } from "../configs/envConfig";
import { connectToDBAsync } from "../configs/mongoose";
import { EventEmitterInstance } from "../configs/eventEmitter";
import {
  signUpSubscriberAsync,
  forgetPasswordSubscriberAsync,
} from "../subscribers/authSubscriber";

export const bootstrapAsync = async (app) => {
  validateEnv();
  await connectToDBAsync();
  bootstrapExpress(app);
  logger.info("Express app initiated.");

  EventEmitterInstance.on("signup", signUpSubscriberAsync);
  EventEmitterInstance.on("forgot", forgetPasswordSubscriberAsync);
};
