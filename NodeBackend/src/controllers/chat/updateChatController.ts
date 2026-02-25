import { Request, Response } from "express";
import { Types, UpdateQuery } from "mongoose";
import { ErrorCode } from "../../errors/customError";
import { InternalServerError } from "../../errors/indexError";
import { IChat } from "../../interfaces/chatInterface";
import { updateChatByIdService } from "../../services/chatServices";

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