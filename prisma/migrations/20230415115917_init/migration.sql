/*
  Warnings:

  - Added the required column `email` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Shop` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Shop` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `password` VARCHAR(191) NOT NULL;
