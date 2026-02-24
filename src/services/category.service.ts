import { eq, isNull, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { categories, Category, NewCategory, products } from "../db/schema";
import { AppError } from "../utils/apperror";

export const createCategory = async (data: NewCategory) => {
    const result = await db.insert(categories).values(data).returning();
    return result[0];
};

export const listCategories = async (includeProductCount: boolean) => {
    if(includeProductCount) {
        const categoriesWithCount = await db
            .select({
                id: categories.id,
                name: categories.name,
                createdAt: categories.createdAt,
                productCount: sql<number>`count(${products.id})::int`
            })
            .from(categories)
            .leftJoin(products, eq(categories.id, products.categoryId))
            .where(isNull(categories.deletedAt))
            .groupBy(categories.id);
        
        return categoriesWithCount;
    };
    
    const categoriesList = await db
        .select()
        .from(categories)
        .where(isNull(categories.deletedAt));

    return categoriesList;
};

export const getCategory = async (uuid: string) => {
    const result = await db
    .select()
    .from(categories)
    .where(eq(categories.id, uuid))
    
    const category = result[0];
    if(!category || category.deletedAt) throw new AppError("Category not found", 404);
    return category;
};

export const updateCategory = async (id: string, data: Partial<NewCategory>) => {
    const dataUpdated =  { ...data, updatedAt: new Date() };
    const result = await db
        .update(categories)
        .set(dataUpdated)
        .where(eq(categories.id, id))
        .returning()

    const category = result[0];
    if(!category || category.deletedAt) throw new AppError("Category not found", 404);
    
    return category;
};