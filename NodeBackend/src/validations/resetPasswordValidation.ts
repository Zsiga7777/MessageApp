import { object, string, TypeOf } from "zod";
export const resetPasswordSchema = object({
  body: object({
    email: string({ error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    password: string({ error: "Should have password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
    passwordResetCode: string({
      error: "Should have password reset code",
    }).length(6, { message: "password reset code should be 6 characters" }),
  }),
});
export type resetPasswordInput = TypeOf<typeof resetPasswordSchema>["body"];
