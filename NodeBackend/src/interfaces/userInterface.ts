import { Types } from "mongoose";

export interface IUser {
  password: string;
  email: string;
  name: string;
  isActive: boolean;
  OTPCode?: string;
  OTPCodeExpires?: number;
  passwordResetCode?: string;
  role: Types.ObjectId;
  age: number;
}
