import z from "zod"

export const createCategorySchema = z.object({
    name: z.string().min(1, "Name must be at least 5 characters")
});