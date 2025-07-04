/*
  Warnings:

  - A unique constraint covering the columns `[kakao_id]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `user_kakao_id_key` ON `user`(`kakao_id`);
