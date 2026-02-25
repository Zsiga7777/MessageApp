import { Types, QueryFilter, QueryOptions, UpdateQuery } from "mongoose";
import {IRole} from "../interfaces/roleInterface";
import RoleModel from "../models/roleModel";

export async function getAllRolesService() {
    return await RoleModel.find();
}

export async function getRoleByNameService(name:string) {
    return await RoleModel.findOne({name: name});
}

export async function createRoleService(roleData: Partial<IRole>) {
    try {
        const result = await RoleModel.create(roleData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}

export async function deleteRoleByIdService(id: Types.ObjectId) {
    return await RoleModel.deleteOne({ _id: id });
}

export async function updateRoleByIdService(
    id: Types.ObjectId,
    update: UpdateQuery<IRole>,
    options: QueryOptions = { new: true }
) {
    try {
        const result = await RoleModel.findByIdAndUpdate(id, update, options);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}