import z, { optional } from "zod";

const unitTypeEnum = z.enum(["kg", "g", "l", "ml", "un"]);
export const createProductValidator = z.object({
    name: z.string("Name is required").min(1).max(255),
    categoryId: z.uuid("Invalid category id format"),
    unitPrice: z.number("Unit price is required").int().min(0),
    unitType: unitTypeEnum,
    quantity: z.coerce.number().min(0).default(0).transform(String),
    minimumQuantity: z.coerce.number("Minimum quantity is required").min(0).default(0).transform(String),
    maximumQuantity: z.coerce.number("Maximum quantity is required").min(0).default(0).transform(String),
}).refine((data) => parseFloat(data.maximumQuantity) >= parseFloat(data.minimumQuantity), {
    message: "Maximum quantity must be greater or equals than minimum quantity",
    path: ["maximumQuantity"]
});

export const listProductValidator = z.object({
    name: z.string("Name is required").min(2).optional(),
    offset: z.coerce.number().int().min(0).optional().default(1),
    limit: z.coerce.number().int().min(1).optional().default(10)
});

export const getProductValidator = z.object({
    id: z.uuid()
});