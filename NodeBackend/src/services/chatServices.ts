import { Types, QueryOptions, UpdateQuery } from "mongoose";
import chatModel from "../models/chatModel";
import { IChat } from "../interfaces/chatInterface";

export async function getChatsByUserService(userId: Types.ObjectId) {
    return await chatModel.find({ users: userId });
}

export async function getChatWithUsersService(chatId: Types.ObjectId) {
    return (await chatModel.findOne({ _id: chatId })).populated("users").exec();
}

export async function createChatService(chatData: Partial<IChat>) {
    try {
        const result = await chatModel.create(chatData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function updateChatByIdService(
    _id: Types.ObjectId,
    update: UpdateQuery<IChat>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await chatModel.findByIdAndUpdate(_id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
export async function deleteChatByIdService(id: Types.ObjectId) {
    return await chatModel.deleteOne({ _id: id });
}