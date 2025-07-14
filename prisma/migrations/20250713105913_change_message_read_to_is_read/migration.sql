/*
  Warnings:

  - You are about to drop the column `read` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `read`,
    ADD COLUMN `isRead` BOOLEAN NOT NULL DEFAULT false;
