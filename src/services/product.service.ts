import { db } from "../db/connection";
import { NewProduct, products } from "../db/schema";
import { AppError } from "../utils/apperror";
import * as categoryService from "./category.service";

export const createProduct = async (data: NewProduct) => {
    if(!await categoryService.getCategory(data.categoryId)) throw new AppError("Category not found", 404);
    
    const result = await db
        .insert(products)
        .values(data)
        .returning()
    
    if(!result[0]) throw new AppError("Error creating the product", 400);
    return result[0];
};