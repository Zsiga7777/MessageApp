import { ObjectId, QueryOptions, UpdateQuery } from "mongoose";
import messageModel from "../model/messageModel";
import { IMessage } from "../interfaces/messageInterface";

export async function findMessagesByChat(chatId: ObjectId) {
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
    id: string,
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
export async function deleteMessageById(id: string) {
    return await messageModel.deleteOne({ _id: id });
}