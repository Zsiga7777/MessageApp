import { Request, Response } from "express";
import { IRole } from "../interfaces/roleInterface";
import { ErrorCode } from "../errors/customError";
import {
  createRoleServiceAsync,
  deleteRoleByIdServiceAsync,
  getAllRolesServiceAsync,
  getRoleByNameServiceAsync,
  updateRoleByIdServiceAsync,
} from "../services/roleServices";
import { InternalServerError, NotFoundError } from "../errors/indexError";
import { Types, UpdateQuery } from "mongoose";

export const createRoleAsync = async (req: Request, res: Response) => {
  try {
    const { name }: { name: string } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Missing data", success: false });
    }

    const existingRole = await getRoleByNameServiceAsync(name);
    if (existingRole) {
      return res
        .status(400)
        .json({ message: "Role already exists", success: false });
    }

    const role: Partial<IRole> = { name };
    createRoleServiceAsync(role);

    res
      .status(201)
      .json({ message: "Role created successfully", success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to create role",
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const deleteRoleAsync = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const role = await deleteRoleByIdServiceAsync(new Types.ObjectId(id[0]));
    if (!role.acknowledged) {
      throw new NotFoundError("Role not found", ErrorCode.NOT_FOUND);
    }
    res.status(204).json({});
  } catch (error) {
    throw new InternalServerError(
      `Failed to delete role with id: ${id}`,
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const getAllRolesAsync = async (req: Request, res: Response) => {
  try {
    const roles = await getAllRolesServiceAsync();
    res.status(200).json({ roles, success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to fetch roles",
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const getRoleByNameAsync = async (req: Request, res: Response) => {
  const name = req.params.name;
  try {
    const role = await getRoleByNameServiceAsync(name[0]);
    if (!role) {
      throw new NotFoundError("Role not found", ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ role, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch role with name: ${name}`,
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const updateRoleAsync = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name }: { name: string } = req.body;

    const existingRole = await getRoleByNameServiceAsync(name);
    if (existingRole) {
      return res
        .status(400)
        .json({ message: "Role already exists", success: false });
    }

    const role: UpdateQuery<IRole> = { name };
    updateRoleByIdServiceAsync(new Types.ObjectId(id[0]), role);

    res
      .status(200)
      .json({ message: "Role updated successfully", success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to update role",
      ErrorCode.INTERNAL_SERVER,
    );
  }
};
