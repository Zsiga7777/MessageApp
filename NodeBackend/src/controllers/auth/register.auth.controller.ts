import { Request, Response } from "express";
import BadRequestError from "../../errors/badRequestError";
import bcrypt from 'bcryptjs';
import { generateRandom6DigitString } from "../../utils/util";
import asyncHandler from 'express';
import { createUser, findUserByEmail } from "../../services/userServices";
import { ErrorCode } from "../../errors/customError";
import { getAllRolesService } from "../../services/roleServices";
import { registerUserInput} from "../../validations/auth.validation"
import { EventEmitterInstance } from "../../configs/eventEmitter";

export const registerUser = asyncHandler(async (req: Request<object, object, registerUserInput>, res: Response) => {
 const { email, password, name } = req.body;

  const userExists = await findUserByEmail(email);
 if (userExists) {
     throw new BadRequestError('User with this email already exists', ErrorCode.BAD_REQUEST);
 }

 const roles = await getAllRolesService();
const role = roles.find(r => r.name === "admin");

 const salt = await bcrypt.genSalt(10);
 const hashPassword = await bcrypt.hash(password, salt);

  const code = generateRandom6DigitString();
 const verificationExpires = parseInt(process.env.VERIFICATION_CODE_EXP ?? "30", 10) * 1000 * 60;

 await createUser({
 …req.body,
 role: role,
 password: hashPassword,
 OTPCode: code,
 OTPCodeExpires: Date.now() + verificationExpires,
 });

EventEmitterInstance.emit('signup', { code, name, email });

 res.status(201).json({ success: true, message: 'Verification email sent' });