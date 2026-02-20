import { Schema, model } from "mongoose";
import { IRefreshToken } from "../interfaces/refreshTokenInterface";

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    token: {
      type: String,
      required: [true, "Refresh token is reqiured!"],
      unique: true,
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id is reqiured!"],
      index: true,
    },
    expires: {
      type: Date,
      required: [true, "Expiration date is reqiured!"],
      index: true,
    },
    blacklisted: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true },
);

export default model<IRefreshToken>("RefreshToken", refreshTokenSchema);
