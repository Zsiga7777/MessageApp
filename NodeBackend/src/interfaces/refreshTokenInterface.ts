import { Document, ObjectId } from "mongoose";

export interface IRefreshToken extends Document {
  token: string;
  user: ObjectId;
  expires: Date;
  blacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
