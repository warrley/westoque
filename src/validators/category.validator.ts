import z from "zod"

export const createCategoryValidator = z.object({
    name: z.string().min(1, "Name must be at least 5 characters")
});

export const listCategoriesValidator = z.object({
    includeProductCount: z.coerce.boolean().optional().default(false)
});