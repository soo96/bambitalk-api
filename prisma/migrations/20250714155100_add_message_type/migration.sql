/*
  Warnings:

  - You are about to drop the column `isRead` on the `message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `message` DROP COLUMN `isRead`,
    ADD COLUMN `is_read` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `type` ENUM('TEXT', 'IMAGE', 'VIDEO') NOT NULL DEFAULT 'TEXT';
