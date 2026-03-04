import { object, string, TypeOf } from "zod";
export const registerUserSchema = object({
    body: object({
        name: string({ error: "Should have name" }).min(1, { message: 'name should have at least 1 character' }).max(20, { message: 'First name should have at most 20 characters' }),
        email: string({ error: "Should have email" }).email({ message: 'Invalid email address' }),
        password: string({ error: "Should have password" }).min(6, { message: 'Password should have at least 6 characters' }),
        confirmPassword: string({ error: "Should have confirm password" }).min(6, { message: 'confirmPassword should have at least 6 characters' }),
    }).refine(data => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    }),
});
export type registerUserInput = TypeOf<typeof registerUserSchema>["body"];