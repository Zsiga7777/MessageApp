import { model, Schema } from "mongoose";
import { IChat } from "../interfaces/chatInterface";

const chatSchema = new Schema<IChat>({
  name: { type: String, required: [true, "Chat name is required!"] },
  users: [{type: Schema.Types.ObjectId, ref: "User"}]
});

export default model<IChat>("Chat", chatSchema);
