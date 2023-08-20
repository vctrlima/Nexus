/*
  Warnings:

  - You are about to drop the column `listId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_listId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "listId";

-- CreateTable
CREATE TABLE "_ListToPost" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ListToPost_AB_unique" ON "_ListToPost"("A", "B");

-- CreateIndex
CREATE INDEX "_ListToPost_B_index" ON "_ListToPost"("B");

-- AddForeignKey
ALTER TABLE "_ListToPost" ADD CONSTRAINT "_ListToPost_A_fkey" FOREIGN KEY ("A") REFERENCES "List"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ListToPost" ADD CONSTRAINT "_ListToPost_B_fkey" FOREIGN KEY ("B") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;
