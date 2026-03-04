import { object, string, boolean, array, Schema } from "zod";
export const createRoleSchema = object({
    body: object({
        name: string({ error: "Name is required" })
    }),
});