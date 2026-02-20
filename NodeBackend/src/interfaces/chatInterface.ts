import Document, { ObjectId } from "mongoose";

export interface IChat extends Document {
  name: string;
  users: ObjectId[];
}
