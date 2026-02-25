import { Request, Response } from "express";
import { getChatsByUserService, getChatWithUsersService } from "../../services/chatServices";
import { InternalServerError, NotFoundError } from "../../errors/indexError";
import { ErrorCode } from "../../errors/customError";
import { Types } from "mongoose";

export const getChatsByUserId =async (req: Request, res: Response) =>  {
    const userId  = req.params.userId;
    try {
        const chats = await getChatsByUserService(new Types.ObjectId(userId[0]));
        if (chats.length == 0) {
            throw new NotFoundError('Chats not found', ErrorCode.NOT_FOUND);
        }
        res.status(200).json({ chats, success: true });
    } catch (error) {
        throw new InternalServerError(`Failed to fetch chats with user id: ${userId}`, ErrorCode.INTERNAL_SERVER);
    }
}

export const getChatWithUsersByChatId =async (req: Request, res: Response) =>  {
    const chatId  = req.params.chatId;
    try {
        const chat = await getChatWithUsersService(new Types.ObjectId(chatId[0]));
        if (!chat) {
            throw new NotFoundError('Chat not found', ErrorCode.NOT_FOUND);
        }
        res.status(200).json({ chat, success: true });
    } catch (error) {
        throw new InternalServerError(`Failed to fetch chat with chat id: ${chatId}`, ErrorCode.INTERNAL_SERVER);
    }
}