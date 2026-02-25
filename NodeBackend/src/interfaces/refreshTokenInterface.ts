import { Types } from "mongoose";

export interface IRefreshToken{
  token: string;
  user: Types.ObjectId;
  expires: Date;
  blacklisted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
