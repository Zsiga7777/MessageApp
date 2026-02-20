import { QueryFilter, QueryOptions, UpdateQuery } from "mongoose";
import {IRefreshToken} from "../interfaces/refreshTokenInterface";
import refreshTokenModel from "../model/refreshTokenModel";

export async function findTokenById(id: string) {
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

export async function deleteTokenById(id: string) {
    return await refreshTokenModel.deleteOne({ _id: id });
}

export async function updateTokenById(
    id: string,
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