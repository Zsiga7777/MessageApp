import { object, string, TypeOf } from "zod";
export const forgotPasswordSchema = object({
    body: object({
        email: string({ error: "Should have email" }).email({ message: 'Invalid email address' }),
    }),
});
export type forgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];