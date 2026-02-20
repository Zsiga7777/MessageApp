import { model, Schema } from "mongoose";
import { IMessage } from "../interfaces/messageInterface";

const messageSchema = new Schema<IMessage>({
  message: { type: String, required: [true, "Message id is required!"] },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
    required: [true, "Chat id is required!"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User id is required!"],
  },
  sentDate: { type: Date, required: [true, "Sent date is required!"] },
});

export default model<IMessage>("Message", messageSchema);
