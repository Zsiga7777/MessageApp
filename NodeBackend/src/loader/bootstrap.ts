import { bootstrapExpress } from "./app";
import { logger } from '../configs/logger';
import { validateEnv } from "../configs/envConfig";
import { connectToDB } from "../configs/mongoose";
import { EventEmitterInstance } from "../configs/eventEmitter";
import { signUpSubscriber, forgetPasswordSubscriber } from "../subscribers/authSubscriber";

export const bootstrap = async (app) => {
    validateEnv()
    await connectToDB();
    bootstrapExpress(app);
    logger.info('Express app initiated.')
    
    EventEmitterInstance.on("signup", signUpSubscriber);
    EventEmitterInstance.on("forgot", forgetPasswordSubscriber);
};