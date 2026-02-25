import { Request, Response } from "express";
import { ErrorCode } from "../../errors/customError";
import {getAllRolesService, getRoleByNameService, } from "../../services/roleServices"
import { InternalServerError, NotFoundError } from "../../errors/indexError";

export const getAllRoles = async (req: Request, res: Response) => {
    try {
        const roles = await getAllRolesService();
        res.status(200).json({ roles, success: true });
    } catch (error) {
        throw new InternalServerError("Failed to fetch roles", ErrorCode.INTERNAL_SERVER);
    }
};

export const getRoleByName = async (req: Request, res: Response) => {
    const  name  = req.params.name;
    try {
        const role = await getRoleByNameService(name[0]);
        if (!role) {
            throw new NotFoundError('Role not found', ErrorCode.NOT_FOUND);
        }
        res.status(200).json({ role, success: true });
    } catch (error) {
        throw new InternalServerError(`Failed to fetch role with name: ${name}`, ErrorCode.INTERNAL_SERVER);
    }
};