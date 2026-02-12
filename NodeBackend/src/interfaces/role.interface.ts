import mongoose, { Document, ObjectId, Schema } from "mongoose";
export interface IRole {
  _id?:ObjectId,
  name?: string;
  permissions: [string];
  grantAll?: boolean
}
export enum RoleInterface {
  ADMIN = 'ADMIN',
  USER = 'USER'
}