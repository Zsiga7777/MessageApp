import { Request, Response } from "express";
import NotFoundError from "../../errors/notFoundError";
import InternalServerError from "../../errors/internalServerError";
import { ErrorCode } from "../../errors/customError";
import {getAllRolesService, findRoleById} from "../../services/roleServices"

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await getAllRolesService();
        res.status(200).json({ roles, success: true });
    } catch (error) {
        throw new InternalServerError("Failed to fetch roles", ErrorCode.INTERNAL_SERVER);
    }
};

export const getRoleById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const role = await findRoleById(id[0]);
        if (!role) {
            throw new NotFoundError('Role not found', ErrorCode.NOT_FOUND);
        }
        res.status(200).json({ role, success: true });
    } catch (error) {
        throw new InternalServerError(`Failed to fetch role with ID: ${id}`, ErrorCode.INTERNAL_SERVER);
    }
};