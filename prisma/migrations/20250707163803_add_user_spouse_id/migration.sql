/*
  Warnings:

  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `task_id` on the `task` table. All the data in the column will be lost.
  - Added the required column `schedule_id` to the `task` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `task` DROP PRIMARY KEY,
    DROP COLUMN `task_id`,
    ADD COLUMN `schedule_id` BIGINT NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`schedule_id`);

-- AlterTable
ALTER TABLE `user` ADD COLUMN `spouse_id` BIGINT NULL;
