import { ObjectId, QueryOptions, UpdateQuery } from "mongoose";
import chatModel from "../models/chatModel";
import { IChat } from "../interfaces/chatInterface";

export async function findChatsByUser(userId: ObjectId) {
    return await chatModel.find({ users: userId });
}

export async function findChatWithUsers(chatId: ObjectId) {
    return (await chatModel.findOne({ _id: chatId })).populated("users").exec();
}

export async function createChat(chatData: Partial<IChat>) {
    try {
        const result = await chatModel.create(chatData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function updateChatById(
    id: string,
    update: UpdateQuery<IChat>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await chatModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
export async function deleteChatById(id: string) {
    return await chatModel.deleteOne({ _id: id });
}