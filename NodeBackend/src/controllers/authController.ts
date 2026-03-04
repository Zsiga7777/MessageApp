import { Request, Response } from "express";
import { activateUserInput } from "../validations/activateUserValidation";
import BadRequestError from "../errors/badRequestError";
import {
  createUserServiceAsync,
  getUserByEmailServiceAsync,
  getUserByEmailWithQueryOptionsServiceAsync,
  getUserByIdWithQueryOptionsServiceAsync,
  updateUserByIdServiceAsync,
} from "../services/userServices";
import { ErrorCode } from "../errors/customError";
import { IUserMessage } from "../middleware/authJWTMiddleware";
import { changeOldPasswordInput } from "../validations/changeOldPasswordValidation";
import { ForbiddenError, NotFoundError } from "../errors/indexError";
import bcrypt from "bcryptjs";
import { generateRandom6DigitString } from "../utils/util";
import { EventEmitterInstance } from "../configs/eventEmitter";
import { forgotPasswordInput } from "../validations/forgotPasswordValidation";
import { validateEnv } from "../configs/envConfig";
import { signJwt } from "../utils/jwt";
import { IRefreshToken } from "../interfaces/refreshTokenInterface";
import { createRefreshTokenServiceAsync } from "../services/refreshTokenServices";
import { loginUserInput } from "../validations/loginUserValidation";
import { registerUserInput } from "../validations/registerUserValidation";
import { getAllRolesServiceAsync } from "../services/roleServices";
import { IUser } from "../interfaces/userInterface";
import { resetPasswordInput } from "../validations/resetPasswordValidation";
import { UpdateQuery } from "mongoose";

export const activateUserAsync = async (
  req: Request<object, object, activateUserInput>,
  res: Response,
) => {
  const { OTPCode, email } = req.body;

  // Find user by email
  const user = await getUserByEmailWithQueryOptionsServiceAsync(
    { email },
    { select: "+password +OTPCode +OTPCodeExpires" },
  );
  if (!user)
    throw new BadRequestError("User does not exist", ErrorCode.BAD_REQUEST);
  if (user.isActive)
    throw new BadRequestError(
      "User has already been verified",
      ErrorCode.BAD_REQUEST,
    );

  // Validate OTP code
  if (user.OTPCode !== OTPCode || user.OTPCodeExpires < Date.now()) {
    throw new BadRequestError(
      "Invalid or expired OTP code",
      ErrorCode.BAD_REQUEST,
    );
  }

  // Save updated user
  const updatedUser: UpdateQuery<IUser> = {
    OTPCode: "",
    OTPCodeExpires: 0,
    isActive: true,
  };
  const result = await updateUserByIdServiceAsync(user._id, updatedUser);

  if (!result.success) {
    throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
  }

  res.status(201).json({ message: "Verified successfully", success: true });
};

//@desc Change password of logged-in customer
//@method PATCH /cutomer-auth/changePassword
//@access protected
export const changePasswordAsync = async (
  req: IUserMessage<object, object, changeOldPasswordInput>,
  res: Response,
) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req?.userData.userId;

  // Find user by ID
  const user = await getUserByIdWithQueryOptionsServiceAsync(
    { _id: userId },
    { select: "+password" },
  );
  if (!user) {
    throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
  }

  // Check if the old password matches
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new BadRequestError("Incorrect password", ErrorCode.BAD_REQUEST);
  }

  // Generate a new hashed password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(newPassword, salt);

  const updatedUser: UpdateQuery<IUser> = { password: hashPassword };
  const result = await updateUserByIdServiceAsync(user._id, updatedUser);

  if (!result.success) {
    throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
  }

  res
    .status(200)
    .json({ message: "Password changed successfully", success: true });
};

//@desc forgot password for customer
//@method POST /customer-auth/forgetPassword
//@access public
export const forgotPasswordAsync = async (
  req: Request<object, object, forgotPasswordInput>,
  res: Response,
) => {
  const { email } = req.body;

  // Find user by email
  const user = await getUserByEmailServiceAsync(email);
  if (!user) {
    throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
  }

  // Check if the user is active
  if (!user.isActive) {
    throw new BadRequestError(
      "Please verify your email first",
      ErrorCode.BAD_REQUEST,
    );
  }

  // Generate password reset code
  const code = generateRandom6DigitString();
  const verificationExpires =
    parseInt(process.env.VERIFICATION_CODE_EXP ?? "30") * 1000 * 60;

  const updatedUser: UpdateQuery<IUser> = {
    passwordResetCode: code,
    OTPCodeExpires: Date.now() + verificationExpires,
  };
  const result = await updateUserByIdServiceAsync(user._id, updatedUser);

  if (!result.success) {
    throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
  }
  // Emit event for sending password reset email or SMS
  const link = `https://localhost:3000/auth/reset?passwordResetCode=${code}&email=${email}`;
  EventEmitterInstance.emit("forgot", {
    code,
    name: user.name,
    email: user.email,
    link,
  });

  res
    .status(201)
    .json({
      message:
        "If a user with that email is registered, you will receive a password reset email or OTP code via SMS",
      email,
      success: true,
    });
};

export const loginAsync = async (
  req: Request<object, object, loginUserInput>,
  res: Response,
) => {
  const { password, email } = req.body;

  // Find user by email
  const user = await getUserByEmailWithQueryOptionsServiceAsync(
    { email },
    { select: "+password", lean: true },
  );
  if (!user)
    throw new ForbiddenError("User does not exist", ErrorCode.FORBIDDEN);
  if (!user.isActive)
    throw new BadRequestError(
      "Please verify your email first",
      ErrorCode.BAD_REQUEST,
    );

  const secretKey = validateEnv()?.jwtconfig.accessSecret;

  // Compare password
  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new ForbiddenError("Invalid credentials", ErrorCode.FORBIDDEN);

  // Generate and store access token
  const accessToken = signJwt({ userId: user._id }, secretKey as string, {
    expiresIn: "3d",
  });
  const refreshTokenModel: Partial<IRefreshToken> = {
    token: accessToken,
    user: user._id,
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  };
  createRefreshTokenServiceAsync(refreshTokenModel);

  // Remove sensitive data from user object
  delete user.password;

  // Send response with user data and access token
  res.status(200).json({
    success: true,
    user: user,
    message: "Logged in successfully",
    accessToken,
  });
};

export const registerUserAsync = async (
  req: Request<object, object, registerUserInput>,
  res: Response,
) => {
  const { email, password, age, role, name } = req.body;

  const userExists = await getUserByEmailServiceAsync(email);
  if (userExists) {
    throw new BadRequestError(
      "User with this email already exists",
      ErrorCode.BAD_REQUEST,
    );
  }

  const roles = await getAllRolesServiceAsync();
  const selectedRole = roles.find((r) => r.name === role);

  if (!selectedRole) {
    throw new NotFoundError("Role not found!", ErrorCode.NOT_FOUND);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const code = generateRandom6DigitString();
  const verificationExpires =
    parseInt(process.env.VERIFICATION_CODE_EXP ?? "30", 10) * 1000 * 60;

  const userModel: Partial<IUser> = {
    email,
    name,
    password: hashPassword,
    age,
    role: selectedRole._id,
    OTPCode: code,
    OTPCodeExpires: Date.now() + verificationExpires,
  };
  createUserServiceAsync(userModel);

  EventEmitterInstance.emit("signup", { code, name, email });

  res.status(201).json({ success: true, message: "Verification email sent" });
};

export const resetPasswordAsync = async (
  req: Request<object, object, resetPasswordInput>,
  res: Response,
) => {
  const { email, passwordResetCode, password } = req.body;

  // Find user by email
  const user = await getUserByEmailServiceAsync(email);
  if (
    !user ||
    !user.passwordResetCode ||
    user.passwordResetCode !== passwordResetCode ||
    user.OTPCodeExpires < Date.now()
  ) {
    throw new BadRequestError(
      "Could not reset user password",
      ErrorCode.BAD_REQUEST,
    );
  }

  // Generate hashed password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update user's password and clear password reset code
  user.password = hashedPassword;
  user.passwordResetCode = null;
  await user.save();

  const updatedUser: UpdateQuery<IUser> = {
    passwordResetCode: null,
    password: hashedPassword,
    OTPCodeExpires: 0,
  };
  const result = await updateUserByIdServiceAsync(user._id, updatedUser);

  if (!result.success) {
    throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
  }

  res
    .status(200)
    .json({ message: "Password updated successfully", success: true });
};
