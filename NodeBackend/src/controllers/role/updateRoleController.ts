import { Request, Response } from "express";
import { IRole } from "../../interfaces/roleInterface";
import { ErrorCode } from "../../errors/customError";
import { getRoleByNameService, updateRoleByIdService } from "../../services/roleServices";
import { InternalServerError } from "../../errors/indexError";
import { UpdateQuery, Types } from "mongoose";

export const updateRole = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const { name }: { name: string } = req.body;

        const existingRole = await getRoleByNameService(name);
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists", success: false });
        }

       const role : UpdateQuery<IRole>= {name} 
        updateRoleByIdService(new Types.ObjectId(id[0]), role)

        res.status(200).json({ message: "Role updated successfully", success: true });
    } catch (error) {
        throw new InternalServerError("Failed to update role", ErrorCode.INTERNAL_SERVER);
    }
};