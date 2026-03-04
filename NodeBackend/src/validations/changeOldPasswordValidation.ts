import { object, string, TypeOf } from "zod";
export const changeOldPasswordSchema = object({
    body: object({
        oldPassword: string({ error: "Password is required" }).min(6, "OldPassword must be at least 6 characters"),
        newPassword: string({ error: "Password is required" }).min(6, "NewPassword must be at least 6 characters"),
    }),
});
export type changeOldPasswordInput = TypeOf<typeof changeOldPasswordSchema>["body"];