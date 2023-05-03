/*
  Warnings:

  - You are about to drop the column `shopId` on the `Product` table. All the data in the column will be lost.
  - Added the required column `shop_id` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `Product_shopId_fkey`;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `shopId`,
    ADD COLUMN `shop_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
