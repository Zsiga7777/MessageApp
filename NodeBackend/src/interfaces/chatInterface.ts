import { Types } from "mongoose";

export interface IChat {
  name: string;
  users: Types.ObjectId[];
}
