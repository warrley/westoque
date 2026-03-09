ALTER TABLE "moves"
ALTER COLUMN "quantity"
SET DATA TYPE integer
USING quantity::integer;