import { Types, UpdateQuery } from "mongoose";
import { Request, Response } from "express";
import { IChat } from "../interfaces/chatInterface";
import { createChatService, deleteChatByIdService, getChatsByUserService, getChatWithUsersService, updateChatByIdService } from "../services/chatServices";
import { InternalServerError, NotFoundError } from "../errors/indexError";
import { ErrorCode } from "../errors/customError";

export const createChat = async (req: Request, res: Response) => {
    try {
        const { name, userIds }: { name: string, userIds : Types.ObjectId[] } = req.body;

        if(!name || userIds.length == 0){
            return res.status(400).json({ message: "Missing data", success: false });
        }

       const chat : Partial<IChat>= {name, users : userIds} 
        createChatService(chat)

        res.status(201).json({ message: "Chat created successfully", success: true });
    } catch (error) {
        throw new InternalServerError("Failed to create role", ErrorCode.INTERNAL_SERVER);
    }
};

export const deleteChat = async (req: Request, res: Response) => {
    const id  = req.params.id;
    try {
        const role = await deleteChatByIdService(new Types.ObjectId(id[0]));
        if (!role.acknowledged) {
            throw new NotFoundError('Chat not found', ErrorCode.NOT_FOUND);
        }
        res.status(204).json({ });
    } catch (error) {
        throw new InternalServerError(`Failed to delete chat with id: ${id}`, ErrorCode.INTERNAL_SERVER);
    }
};

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

export const updateChat = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { name, userIds }: { name: string, userIds : Types.ObjectId[] } = req.body;

        if (!name || userIds.length == 0) {
            return res.status(400).json({ message: "Missing data", success: false });
        }

       const chat : UpdateQuery<IChat>= {name, users : userIds} 
        updateChatByIdService(new Types.ObjectId(id[0]), chat)

        res.status(200).json({ message: "Chat updated successfully", success: true });
    } catch (error) {
        throw new InternalServerError("Failed to update chat", ErrorCode.INTERNAL_SERVER);
    }
};