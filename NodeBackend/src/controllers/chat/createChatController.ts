import { Types } from "mongoose";
import { Request, Response } from "express";
import { IChat } from "../../interfaces/chatInterface";
import { createChatService } from "../../services/chatServices";
import { InternalServerError } from "../../errors/indexError";
import { ErrorCode } from "../../errors/customError";

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