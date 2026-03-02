import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { moves, NewMove, products } from "../db/schema";
import { AppError } from "../utils/apperror";

export const addMove = async (data: Omit<NewMove, "unitPrice">) => {
    return await db.transaction(async tx => {
        const productResult = await tx
            .select({
                quantity: products.quantity,
                unitPrice: products.unitPrice
            })
            .from(products)
            .where(eq(products.id, data.productId))
            .for("update");

        if(!productResult[0]) throw new AppError("Product not found", 404);

        const currentQuantity = parseFloat(productResult[0].quantity);
        const moveQuantity = parseFloat(data.quantity);
        if(data.type === "out" && currentQuantity < moveQuantity) throw new AppError(`Insufficient stoque. Avaliable: ${currentQuantity}, solicited: ${moveQuantity}`, 400);

        const unitPrice = productResult[0].unitPrice
        const result = await tx
            .insert(moves)
            .values({ ...data, unitPrice })
            .returning()
        if(!result[0]) throw new AppError("Error adding a move", 400);

        const newQuantity = data.type === "in" ? currentQuantity + moveQuantity : currentQuantity - moveQuantity;
        await tx 
            .update(products)
            .set({ quantity: newQuantity.toString(), updatedAt: new Date() })
            .where(eq(products.id, data.productId));

        return result[0];
    });
};