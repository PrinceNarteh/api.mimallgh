/*
  Warnings:

  - You are about to drop the column `name` on the `OrderItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone_number]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productName` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `name`,
    ADD COLUMN `productName` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_phone_number_key` ON `User`(`phone_number`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);
