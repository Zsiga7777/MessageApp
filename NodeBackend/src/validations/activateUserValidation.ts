import { object, string, TypeOf } from "zod";
export const activateUserSchema = object({
  body: object({
    email: string({ error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    OTPCode: string({ error: "Should have OTPCode" }).length(6, {
      message: "OTP code should be 6 characters",
    }),
  }),
});
export type activateUserInput = TypeOf<typeof activateUserSchema>["body"];
