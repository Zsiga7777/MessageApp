import { Request, Response } from "express";
import {
  deleteUserByIdServiceAsync,
  getAllUsersServiceAsync,
  getUserByEmailServiceAsync,
  updateUserByIdServiceAsync,
} from "../services/userServices";
import { Types, UpdateQuery } from "mongoose";
import { InternalServerError, NotFoundError } from "../errors/indexError";
import { ErrorCode } from "../errors/customError";
import { IUser } from "../interfaces/userInterface";

export const deleteUserAsync = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await deleteUserByIdServiceAsync(new Types.ObjectId(id[0]));
    if (!user.acknowledged) {
      throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
    }
    res.status(204).json({});
  } catch (error) {
    throw new InternalServerError(
      `Failed to delete user with id: ${id}`,
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const getAllUsersAsync = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsersServiceAsync();
    if (!users) {
      throw new NotFoundError("Users not found", ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ users, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch users`,
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const getUserByEmailAsync = async (req: Request, res: Response) => {
  const email = req.params.email;
  try {
    const user = await getUserByEmailServiceAsync(email[0]);
    if (!user) {
      throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    throw new InternalServerError(
      `Failed to fetch user with email: ${email}`,
      ErrorCode.INTERNAL_SERVER,
    );
  }
};

export const updateUserAsync = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { name, email, age }: { name: string; email: string; age: number } =
      req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ message: "Missing data", success: false });
    }

    const existingUser = await getUserByEmailServiceAsync(email);
    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "User with this email already exists",
          success: false,
        });
    }

    const user: UpdateQuery<IUser> = { name, email, age };
    const result = await updateUserByIdServiceAsync(
      new Types.ObjectId(id[0]),
      user,
    );

    if (!result.success) {
      throw new NotFoundError("User not found", ErrorCode.NOT_FOUND);
    }

    res
      .status(200)
      .json({ message: "User updated successfully", success: true });
  } catch (error) {
    throw new InternalServerError(
      "Failed to update user",
      ErrorCode.INTERNAL_SERVER,
    );
  }
};
