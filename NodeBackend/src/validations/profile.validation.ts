import { object, string, number, Schema } from "zod";
export const createProfileSchema = object({
    body: object({
        age: number().min(0, { message: "Age cannot be negative" }),
        userId: string({ error: "User ID is required" }),
    }),
});