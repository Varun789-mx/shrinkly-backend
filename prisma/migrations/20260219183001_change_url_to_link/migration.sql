/*
  Warnings:

  - You are about to drop the `Url` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Url" DROP CONSTRAINT "Url_id_fkey";

-- DropTable
DROP TABLE "Url";

-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "original_url" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL,
    "timeStamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
