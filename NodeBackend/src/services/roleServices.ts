import { QueryFilter, QueryOptions, UpdateQuery } from "mongoose";
import {IRole} from "../interfaces/roleInterface";
import RoleModel from "../models/roleModel";

export async function getAllRolesService() {
    return await RoleModel.find();
}

export async function createRole(roleData: Partial<IRole>) {
    try {
        const result = await RoleModel.create(roleData);
        return { data: result, success: true };
    } catch (error) {
        return { data: null, success: false, error };
    }
}
export async function deleteRoleById(id: string) {
    return await RoleModel.deleteOne({ id: id });
}

export async function updateRoleById(
    id: string,
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