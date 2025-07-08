/*
  Warnings:

  - You are about to drop the column `last_message` on the `chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `chat` DROP COLUMN `last_message`,
    ADD COLUMN `last_message_id` BIGINT NULL;
