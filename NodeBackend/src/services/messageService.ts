import { Types, QueryOptions, UpdateQuery } from "mongoose";
import messageModel from "../models/messageModel";
import { IMessage } from "../interfaces/messageInterface";

export async function findMessagesByChatIdService(chatId: Types.ObjectId) {
    return await messageModel.find({ chat: chatId });
}

export async function createMessageService(chatData: Partial<IMessage>) {
    try {
        const result = await messageModel.create(chatData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function updateMessageByIdService(
    id: Types.ObjectId,
    update: UpdateQuery<IMessage>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await messageModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
export async function deleteMessageByIdService(id: Types.ObjectId) {
    return await messageModel.deleteOne({ _id: id });
}