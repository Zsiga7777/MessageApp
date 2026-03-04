import { number, object, string, TypeOf } from "zod";
export const registerUserSchema = object({
  body: object({
    name: string({ error: "Should have name" })
      .min(1, { message: "name should have at least 1 character" })
      .max(20, { message: "name should have at most 20 characters" }),
    email: string({ error: "Should have email" }).email({
      message: "Invalid email address",
    }),
    password: string({ error: "Should have password" }).min(6, {
      message: "Password should have at least 6 characters",
    }),
    age: number({ error: "Should have age" })
      .min(18, { message: "You must be at least 18 years old!" })
      .max(110, { message: "You must be under 110 years old!" }),
    role: string({ error: "Should role" })
      .min(1, { message: "role should have at least 1 character" })
      .max(20, { message: "Role should have at most 20 characters" }),
  }),
});
export type registerUserInput = TypeOf<typeof registerUserSchema>["body"];
