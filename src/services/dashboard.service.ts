import { and, eq, gte, isNull, lte, sql } from "drizzle-orm";
import { db } from "../db/connection";
import { moves, products } from "../db/schema";
import { DateRangeInput } from "../validators/dashboard.validator";

export const getInvetoryValue = async() => {
    const result = await db
        .select({
            totalValue: sql<number>`SUM(${products.quantity} * ${products.unitPrice})`
        })
        .from(products)
        .where(isNull(products.deletedAt))

    if(!result[0].totalValue) return 0;
    return result[0].totalValue;
};

export const getMovesSummary = async (range: DateRangeInput) => {
    const conditions = [];

    if(range.startDate) conditions.push(gte(moves.createdAt, new Date(range.startDate)));
    
    if(range.endDate) {
        const endDate = new Date(range.endDate);
        endDate.setUTCHours(23, 59, 59, 999);
        conditions.push(lte(moves.createdAt, new Date (range.endDate)));
    };
    
    const result = await db 
    .select({
        type: moves.type,
        totalValue: sql<number>`SUM(${moves.quantity} * ${moves.unitPrice})`,
        count: sql<number>`COUNT(*)`
    })
    .from(moves)
    .where(and(...conditions))
    .groupBy(moves.type)
    
    const summary = {
        in: { value: 0, count: 0 },
        out: { value: 0, count: 0 }
    };
    
    result.forEach(row => {
        summary[row.type] = {
            value: row.totalValue,
            count: row.count
        };
    });
        
    return summary;
};

export const getMovesGraph = async (range: DateRangeInput) => {
    const conditions = [eq(moves.type, "out")];

    if(range.startDate) conditions.push(gte(moves.createdAt, new Date(range.startDate)));
    
    if(range.endDate) {
        const endDate = new Date(range.endDate);
        endDate.setUTCHours(23, 59, 59, 999);
        conditions.push(lte(moves.createdAt, new Date (range.endDate)));
    };

    const dateFormatted = sql<string>`TO_CHAR(${moves.createdAt}, 'YYYY-MM-DD')`;

    const result = await db
        .select({
            totalValue: sql<number>`SUM(${products.quantity} * ${products.unitPrice})`
        })
        .from(moves)
        .where(and(...conditions))
        .groupBy(dateFormatted)
        .orderBy(dateFormatted)
    
    return result;
};

export const getLowStockProducts = async () => {
    const results = await db
        .select()
        .from(products)
        .where(and(
            isNull(products.deletedAt),
            sql`${products.quantity} <= (${products.minimumQuantity}*1.1)`
        ))
        .orderBy(products.quantity)
    
    return results
};