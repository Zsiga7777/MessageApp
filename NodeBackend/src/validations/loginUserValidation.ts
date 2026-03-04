import { object, string, TypeOf } from "zod";
export const loginUserSchema = object({
  body: object({
    email: string({ error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    password: string({ error: "Should have password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
  }),
});
export type loginUserInput = TypeOf<typeof loginUserSchema>["body"];
