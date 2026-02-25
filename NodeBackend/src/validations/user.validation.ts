import { object, string, TypeOf } from "zod";
export const createUserSchema = object({
    body: object({
        email: string({ error: "Email is required" }).email("Invalid email format"),
        password: string({ error: "Password is required" }).min(6, "Password must be at least 6 characters"),
        name: string({ error: "Name is required" }),
        role: string({ error: "Role is required" }),
    }),
});
export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];