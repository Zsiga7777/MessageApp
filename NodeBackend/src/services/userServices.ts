import {QueryFilter, QueryOptions, Schema, UpdateQuery } from "mongoose";
import { IUser } from "../interfaces/userInterface";
import UserModel from "../model/userModel";

export async function findAllUsers() {
    return await UserModel.find()
}

export const findUser = async (userId: string) => {
    return await UserModel.findById(userId)
        .populate('role')
        .exec();
};

export async function findUserByEmail(email: string) {
    return await UserModel.findOne({ email: email }).populate("role").exec();
}

export async function createUser(userData: Partial<IUser>) {
    try {
        const result = await UserModel.create(userData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function updateUserById(
    id: string,
    update: UpdateQuery<IUser>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await UserModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
export async function deleteUserById(id: string) {
    return await UserModel.deleteOne({ _id: id });
}