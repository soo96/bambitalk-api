/*
  Warnings:

  - You are about to drop the column `spouse_id` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `spouse_id`,
    MODIFY `kakao_id` BIGINT NULL;
