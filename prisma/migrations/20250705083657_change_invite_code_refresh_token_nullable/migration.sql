/*
  Warnings:

  - Added the required column `updated_at` to the `couple` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `couple_invite_code_key` ON `couple`;

-- AlterTable
ALTER TABLE `couple` ADD COLUMN `updated_at` DATETIME(3) NOT NULL,
    MODIFY `invite_code` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `token` MODIFY `refresh_token` TEXT NULL;
