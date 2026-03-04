import { Request, Response } from "express";
import { activateUserInput } from "../validations/activateUserValidation";
import BadRequestError from "../errors/badRequestError";
import { getUserByEmailService, getUserByEmailWithQueryOptionsService, getUserByIdService, getUserByIdWithQueryOptionsService } from "../services/userServices";
import { ErrorCode } from "../errors/customError";
import { IUserMessage } from "../middleware/authJWTMiddleware";
import { changeOldPasswordInput } from "../validations/changeOldPasswordValidation";
import { NotFoundError } from "../errors/indexError";
import bcrypt from "bcryptjs/umd/types";
import { getUserByEmail } from "./userController";
import { generateRandom6DigitString } from "../utils/util";
import { EventEmitterInstance } from "../configs/eventEmitter";
import { forgotPasswordInput } from "../validations/forgotPasswordValidation";

export const activateUser = async (req: Request<object, object, activateUserInput>, res: Response) => {
    const { OTPCode, email } = req.body;

    // Find user by email
    const user = await getUserByEmailWithQueryOptionsService({ email }, { select: "+password +OTPCode +OTPCodeExpires" });
    if (!user) throw new BadRequestError('User does not exist', ErrorCode.BAD_REQUEST);
    if (user.isActive) throw new BadRequestError('User has already been verified',  ErrorCode.BAD_REQUEST);

    // Validate OTP code
    if (user.OTPCode !== OTPCode || user.OTPCodeExpires < Date.now()) {
        throw new BadRequestError('Invalid or expired OTP code',  ErrorCode.BAD_REQUEST);
    }

    // Update user as active and clear OTP code
    user.OTPCode = "";
    user.OTPCodeExpires = 0;
    user.isActive = true;
    const userId = user._id

    // Save updated user
    await user.save();

    res.status(201).json({ message: 'Verified successfully', success: true });
};

//@desc Change password of logged-in customer
//@method PATCH /cutomer-auth/changePassword
//@access protected
export const changePassword = async (req: IUserMessage<object, object, changeOldPasswordInput>, res: Response) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req?.userData.userId;

    // Find user by ID
    const user = await getUserByIdWithQueryOptionsService({ _id: userId }, { select: "+password" });
    if (!user) {
        throw new NotFoundError("User not found",  ErrorCode.NOT_FOUND);
    }

    // Check if the old password matches
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
        throw new BadRequestError("Incorrect password",  ErrorCode.BAD_REQUEST);
    }

    // Generate a new hashed password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashPassword;

    // Save the updated password
    await user.save();

    res.status(200).json({ message: "Password changed successfully", success: true });
};

//@desc forgot password for customer
//@method POST /customer-auth/forgetPassword
//@access public
export const forgotPassword = async (req: Request<object, object, forgotPasswordInput>, res: Response) => {
    const { email } = req.body;

    // Find user by email
    const user = await getUserByEmailService(email);
    if (!user) {
        throw new NotFoundError("User not found",  ErrorCode.NOT_FOUND);
    }

    // Check if the user is active
    if (!user.isActive) {
        throw new BadRequestError("Please verify your email first", ErrorCode.BAD_REQUEST);
    }

    // Generate password reset code
    const code = generateRandom6DigitString();
    const verificationExpires = parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60;

    // Update user's password reset code and expiration
    user.passwordResetCode = code;
    user.OTPCodeExpires = Date.now() + verificationExpires;
    await user.save();

    // Emit event for sending password reset email or SMS
    const link = `https://localhost:3000/auth/reset?passwordResetCode=${code}&email=${email}`;
    EventEmitterInstance.emit('forgot', { code, name: user.name, email: user.email, link });

    res.status(201).json({ message: "If a user with that email is registered, you will receive a password reset email or OTP code via SMS", email, success: true });
};