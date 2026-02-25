import { Request, Response } from "express";
import { IRole } from "../../interfaces/roleInterface";
import RoleModel from "../../models/roleModel";
import { ErrorCode } from "../../errors/customError";
import { createRoleService, getRoleByNameService } from "../../services/roleServices";
import { InternalServerError } from "../../errors/indexError";

export const createRole = async (req: Request, res: Response) => {
    try {
        const { name }: { name: string } = req.body;

        if(!name){
            return res.status(400).json({ message: "Missing data", success: false });
        }

        const existingRole = await getRoleByNameService(name);
        if (existingRole) {
            return res.status(400).json({ message: "Role already exists", success: false });
        }

       const role : Partial<IRole>= {name} 
        createRoleService(role)

        res.status(201).json({ message: "Role created successfully", success: true });
    } catch (error) {
        throw new InternalServerError("Failed to create role", ErrorCode.INTERNAL_SERVER);
    }
};