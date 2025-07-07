/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `message` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[couple_id]` on the table `Chat` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `deleted_at`;

-- CreateIndex
CREATE UNIQUE INDEX `Chat_couple_id_key` ON `Chat`(`couple_id`);
