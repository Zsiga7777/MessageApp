import { QueryFilter, QueryOptions, Types, UpdateQuery } from "mongoose";
import { IUser } from "../interfaces/userInterface";
import UserModel from "../models/userModel";

export async function getAllUsersServiceAsync() {
  return await UserModel.find();
}

export const getUserByIdServiceAsync = async (userId: Types.ObjectId) => {
  return await UserModel.findById(userId).populate("role").exec();
};

export const getUserByIdWithQueryOptionsServiceAsync = async (
  query: QueryFilter<IUser>,
  options: QueryOptions = { lean: true },
) => {
  return await UserModel.findById(query, {}, options).populate("role").exec();
};

export async function getUserByEmailServiceAsync(email: string) {
  return await UserModel.findOne({ email: email }).populate("role").exec();
}

export async function getUserByEmailWithQueryOptionsServiceAsync(
  query: QueryFilter<IUser>,
  options: QueryOptions = { lean: true },
) {
  return await UserModel.findOne(query, {}, options).populate("role").exec();
}

export async function createUserServiceAsync(userData: Partial<IUser>) {
  try {
    const result = await UserModel.create(userData);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}

export async function updateUserByIdServiceAsync(
  id: Types.ObjectId,
  update: UpdateQuery<IUser>,
  options: QueryOptions = { new: true },
) {
  try {
    const result = await UserModel.findByIdAndUpdate(id, update, options);
    return { data: result, success: true };
  } catch (error) {
    return { data: null, success: false, error };
  }
}
export async function deleteUserByIdServiceAsync(id: Types.ObjectId) {
  return await UserModel.deleteOne({ _id: id });
}
