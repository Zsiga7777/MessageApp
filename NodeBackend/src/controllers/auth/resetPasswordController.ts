import { Request, Response } from "express";
import { resetPasswordInput } from "../../validations/auth.validation";
import bcrypt from 'bcryptjs'
import BadRequestError from "../../errors/badRequestError";
import asyncHandler from "express";
import { findUserByEmail } from "../../services/userServices";
import { ErrorCode } from "../../errors/customError";

//@desc reset password
//@method POST /customer-auth/resetPassword
//@access public
export const resetPassword = asyncHandler(async (req: Request<object, object, resetPasswordInput>, res: Response) => {
    const { email, passwordResetCode, password } = req.body;

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode || user.OTPCodeExpires < Date.now()) {
        throw new BadRequestError('Could not reset user password', ErrorCode.BAD_REQUEST);
    }

    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Update user's password and clear password reset code
    user.password = hashedPassword;
    user.passwordResetCode = null;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully', success: true });
});