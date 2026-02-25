import { Request, Response } from "express";
import { deleteChatByIdService } from "../../services/chatServices";
import { Types } from "mongoose";
import { InternalServerError, NotFoundError } from "../../errors/indexError";
import { ErrorCode } from "../../errors/customError";

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