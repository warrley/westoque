import z from "zod"

export const createCategoryValidator = z.object({
    name: z.string().min(1, "Name must be at least 5 characters")
});

export const listCategoriesValidator = z.object({
    includeProductCount: z.coerce.boolean().optional().default(false)
});

export const getCategoryValidator = z.object({
    id: z.uuid()
});

export const updateCategoryValidator = z.object({
    name: z.string().min(1, "Name is required").max(255)
});