import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UnAuthenticatedError from "../errors/unAuthorizedError";
import ForbiddenError from "../errors/forbiddenError";
import { ErrorCode } from "../errors/customError";
import { validateEnv } from "../configs/envConfig";
import { findUser } from "../services/userServices";
import NotFoundError from "../errors/notFoundError";
import { IRole } from "../interfaces/roleInterface";
import { IUser } from "../interfaces/userInterface";
import { extractTokenfromHeader } from "../utils/util";

export interface UserDataType {
 userId: string;
 role?: IRole
}

export interface IUserMessage<TParams = any, TQuery = any, TBody = any> extends Request<TParams, TQuery, TBody> {
 userData: UserDataType;
}

export const AuthJWT = (
 req: IUserMessage,
 res: Response,
 next: NextFunction
) => {
    try {
 const jwtconfig = validateEnv()?.jwtconfig
 const token = extractTokenfromHeader(req)
 if (!token) throw new UnAuthenticatedError("Provide token", ErrorCode.NOT_FOUND);

 jwt.verify(token, jwtconfig?.accessSecret, async (err, decoded) => {
 if (err) return next(new ForbiddenError("Token expires", ErrorCode?.UNAUTHENTICATED_USER));

 const decodeData = decoded as UserDataType;
 const userWithPermission = await findUser(decodeData?.userId)

 if (!userWithPermission) throw new NotFoundError("User not found", ErrorCode.NOT_FOUND)
 req.userData = {
 userId: decodeData?.userId,
 //role: userWithPermission.role
}

next();
 });
 
 } catch (err) {
 throw new UnAuthenticatedError("Provide token", ErrorCode.NOT_FOUND);
 }
};