import { integer, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { products } from "./products";
import { users } from "./users";

export const moveTypeEnum = pgEnum("type", ["in", "out"]);

export const moves = pgTable("moves", {
    id: uuid().primaryKey().defaultRandom(),
    productId: uuid("product_id").notNull().references(() => products.id),
    userID: uuid("user_id").notNull().references(() => users.id),
    type: moveTypeEnum().notNull(),
    unitPrice: integer("unit_price").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type Move = typeof moves.$inferSelect;
export type NewMove = typeof moves.$inferInsert;