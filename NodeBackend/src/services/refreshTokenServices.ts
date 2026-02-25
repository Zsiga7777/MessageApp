import { QueryFilter, QueryOptions, Types, UpdateQuery } from "mongoose";
import {IRefreshToken} from "../interfaces/refreshTokenInterface";
import refreshTokenModel from "../models/refreshTokenModel";

export async function findTokenById(id: Types.ObjectId) {
    return await refreshTokenModel.findById(id);
}

export async function findToken(
    query: QueryFilter<IRefreshToken>,
    options: QueryOptions = { lean: true }
): Promise<IRefreshToken | null> {
    return await refreshTokenModel.findOne(query, {}, options);
}

export async function createToken(tokenData: Partial<IRefreshToken>) {
    try {
        const result = await refreshTokenModel.create(tokenData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function deleteTokenById(id: Types.ObjectId) {
    return await refreshTokenModel.deleteOne({ _id: id });
}

export async function updateTokenById(
    id: Types.ObjectId,
    update: UpdateQuery<IRefreshToken>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await refreshTokenModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}