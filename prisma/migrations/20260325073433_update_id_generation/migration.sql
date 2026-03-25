-- AlterTable
ALTER TABLE "article" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();

-- AlterTable
ALTER TABLE "cart" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
