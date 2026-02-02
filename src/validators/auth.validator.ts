import z from "zod";

export const authLoginValidator = z.object({
    email: z.email("Invalid e-mail format"),
    password: z.string("Password is required").min(6, "Password must be at least 6 caracters")
});