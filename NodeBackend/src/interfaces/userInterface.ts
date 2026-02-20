import { Document, ObjectId } from "mongoose";

export interface IUser extends Document {
  password: string;
  email: string;
  name: string;
  isActive: boolean;
  OTPCode?: string;
  OTPCodeExpires?: number;
  passwordResetCode?: string;
  role: ObjectId;
  age: number;
}
