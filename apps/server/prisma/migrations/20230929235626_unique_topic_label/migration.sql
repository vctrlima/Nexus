/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Topic_label_key" ON "Topic"("label");
