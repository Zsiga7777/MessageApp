import { Request, Response } from "express";
import { deleteRoleByIdService } from "../../services/roleServices";
import { InternalServerError, NotFoundError } from "../../errors/indexError";
import { ErrorCode } from "../../errors/customError";
import {Types} from "mongoose";

export const deleteRole = async (req: Request, res: Response) => {
    const id  = req.params.id;
    try {
        const role = await deleteRoleByIdService(new Types.ObjectId(id[0]));
        if (!role.acknowledged) {
            throw new NotFoundError('Role not found', ErrorCode.NOT_FOUND);
        }
        res.status(204).json({ });
    } catch (error) {
        throw new InternalServerError(`Failed to delete role with id: ${id}`, ErrorCode.INTERNAL_SERVER);
    }
};