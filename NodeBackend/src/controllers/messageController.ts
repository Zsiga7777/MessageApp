import { Request, Response } from "express";
import { IMessage } from "../interfaces/messageInterface";
import { ErrorCode } from "../errors/customError";
import {
  createMessageServiceAsync,
  deleteMessageByIdServiceAsync,
  findMessagesByChatIdServiceAsync,
  updateMessageByIdServiceAsync,
} from "../services/messageService";
import { InternalServerError, NotFoundError } from "../errors/indexError";
import { Types, UpdateQuery } from "mongoose";

export const createMessageAsync = async (req: Request, res: Response) => {
  try {
    const {
      message,
      chat,
      user,
    }: { message: string; chat: Types.ObjectId; user: Types.ObjectId } =
      req.body;

    if (!message || !chat || !user) {
      return res.status(400).json({ message: "Missing data", success: false });
    }

    const messageModel: Partial<IMessage> = { message, chat, user };
    createMessageServiceAsync(messageModel);

    res
      .status(201)
      .json({ message: "Message created successfully", success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to create message",
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const deleteMessageAsync = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const message = await deleteMessageByIdServiceAsync(
      new Types.ObjectId(id[0]),
    );
    if (!message.acknowledged) {
      throw new NotFoundError("Message not found", ErrorCode.NOT_FOUND);
    }
    res.status(204).json({});
  } catch (error) {
    throw new InternalServerError(
      `Failed to delete message with id: ${id}`,
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const getMessagesByChatIdAsync = async (req: Request, res: Response) => {
  const chatId = req.params.chatId;
  try {
    const messages = await findMessagesByChatIdServiceAsync(
      new Types.ObjectId(chatId[0]),
    );
    if (messages.length == 0) {
      throw new NotFoundError("Chats not found", ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ messages, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch chats with user id: ${chatId}`,
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const updateMessageAsync = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { message }: { message: string } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Missing data", success: false });
    }

    const messageModel: UpdateQuery<IMessage> = { message };
    updateMessageByIdServiceAsync(new Types.ObjectId(id[0]), messageModel);

    res
      .status(200)
      .json({ message: "Message updated successfully", success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to update message",
      ErrorCode.INTERNAL_SERVER,
    );
  }
};
