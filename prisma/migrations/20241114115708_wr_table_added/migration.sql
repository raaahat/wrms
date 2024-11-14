/*
  Warnings:

  - The values [placed,pending,ongoing,done,U/O,notSolved,Follow-Up] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "WrType" AS ENUM ('ELECTRICAL', 'MECHANICAL');

-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PLACED', 'PENDING', 'ONGOING', 'DONE', 'UNDER_OBSERVATION', 'NOT_SOLVED', 'FOLLOW_UP');
ALTER TABLE "WorkRequest" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
COMMIT;

-- CreateTable
CREATE TABLE "WorkRequest" (
    "id" TEXT NOT NULL,
    "wrNo" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "WrType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PLACED',
    "remarks" TEXT,
    "mode" "Mode" NOT NULL DEFAULT 'NORMAL',
    "runningHour" TEXT,
    "referredFromId" TEXT,
    "creatorId" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WorkRequest_wrNo_key" ON "WorkRequest"("wrNo");

-- AddForeignKey
ALTER TABLE "WorkRequest" ADD CONSTRAINT "WorkRequest_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkRequest" ADD CONSTRAINT "WorkRequest_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "Area"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkRequest" ADD CONSTRAINT "WorkRequest_referredFromId_fkey" FOREIGN KEY ("referredFromId") REFERENCES "WorkRequest"("id") ON DELETE SET NULL ON UPDATE CASCADE;
