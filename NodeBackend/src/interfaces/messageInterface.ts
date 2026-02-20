import { Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
  message: string;
  user: ObjectId;
  chat: ObjectId;
  sentDate: Date;
}
