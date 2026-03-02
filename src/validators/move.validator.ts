import z from "zod";

const moveTypeEnum = z.enum(["in", "out"]);
export const addMoveValidator = z.object({
    productId: z.uuid("Invalid format product id"),
    type: moveTypeEnum,
    quantity: z.coerce.number().positive("Quantity must be positive").transform(String)
});