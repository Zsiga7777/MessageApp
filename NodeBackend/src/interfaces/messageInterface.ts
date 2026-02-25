import { Types } from "mongoose";

export interface IMessage {
  message: string;
  user: Types.ObjectId;
  chat: Types.ObjectId;
  sentDate: Date;
}
