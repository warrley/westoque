import z from "zod";

export const createUserValidator = z.object({
    name: z.string().min(2, "Name is required").max(255),
    email: z.string("Invalid e-mail format"),
    password: z.string("Password is required").min(6, "Password must be at least 6 caracters")
});