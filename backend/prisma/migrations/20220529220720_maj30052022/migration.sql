/*
  Warnings:

  - You are about to drop the column `bio` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `picture` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `bio`,
    DROP COLUMN `picture`,
    ADD COLUMN `disabled` BOOLEAN NOT NULL DEFAULT false;
