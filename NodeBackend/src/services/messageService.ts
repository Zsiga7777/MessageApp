import { Types, QueryOptions, UpdateQuery } from "mongoose";
import messageModel from "../models/messageModel";
import { IMessage } from "../interfaces/messageInterface";

export async function findMessagesByChat(chatId: Types.ObjectId) {
    return await messageModel.find({ chat: chatId });
}

export async function createMessage(chatData: Partial<IMessage>) {
    try {
        const result = await messageModel.create(chatData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function updateMessageById(
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
export async function deleteMessageById(id: Types.ObjectId) {
    return await messageModel.deleteOne({ _id: id });
}