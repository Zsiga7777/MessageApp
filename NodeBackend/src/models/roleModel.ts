import { Schema, model } from "mongoose";
import { IRole } from "../interfaces/roleInterface";

const roleSchema = new Schema<IRole>(
  {
    name: {
      type: String,
      required: [true, "Name is reqiured!"],
      unique: true,
      index: true,
    },
  },
  { timestamps: true },
);
export default model<IRole>("Role", roleSchema);
