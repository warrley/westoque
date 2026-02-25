import { and, eq, ilike, isNull, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { categories, NewProduct, products } from "../db/schema";
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

export const listProduct  = async (offset: number, limit: number, name?: string) => {
    console.log(name)
    const condition = name 
        ? and(
            isNull(products.deletedAt),
            ilike(products.name, `%${name}%`)
        )
        : isNull(products.deletedAt);

    const productList = await db
        .select(
            {
                id: products.id,
                name: products.name,
                categoryId: categories.id,
                categoryName: categories.name,
                unitPrice: products.unitPrice,
                unitType: products.unitType,
                quantity: products.quantity,
                minimumQuantity: products.minimumQuantity,
                maximumQuantity: products.maximumQuantity,
                createdAt: products.createdAt,
                updatedAt: products.updatedAt,
            }
        )
        .from(products)
        .leftJoin(categories, eq(products.categoryId, categories.id))
        .where(condition)
        .offset((offset-1)*limit)
        .limit(limit)

    return productList;
};