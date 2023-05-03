/*
  Warnings:

  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `orderId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `shopId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `shopName` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `discountPercentage` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `alternateNumber` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `closingTime` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `facebookHandle` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `instagramHandle` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `mapDirection` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `openingTime` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `plainPassword` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `shopCode` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `whatsappNumber` on the `Shop` table. All the data in the column will be lost.
  - You are about to drop the column `alternateNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cardNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `cardType` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `middleName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shop_id]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shop_id` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Image` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_name` to the `OrderItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `closing_time` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `map_description` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `opening_time` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plain_password` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shop_code` to the `Shop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_productId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_shopId_fkey`;

-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Order` DROP FOREIGN KEY `Order_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_orderId_fkey`;

-- AlterTable
ALTER TABLE `Image` DROP COLUMN `productId`,
    DROP COLUMN `shopId`,
    DROP COLUMN `userId`,
    ADD COLUMN `product_id` VARCHAR(191) NULL,
    ADD COLUMN `shop_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Order` DROP COLUMN `orderId`,
    DROP COLUMN `userId`,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `OrderItem` DROP COLUMN `orderId`,
    DROP COLUMN `productId`,
    DROP COLUMN `shopId`,
    DROP COLUMN `shopName`,
    ADD COLUMN `order_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `product_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `shop_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `shop_name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` DROP COLUMN `discountPercentage`,
    ADD COLUMN `discount_percentage` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `Shop` DROP COLUMN `alternateNumber`,
    DROP COLUMN `closingTime`,
    DROP COLUMN `facebookHandle`,
    DROP COLUMN `instagramHandle`,
    DROP COLUMN `mapDirection`,
    DROP COLUMN `openingTime`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `plainPassword`,
    DROP COLUMN `shopCode`,
    DROP COLUMN `whatsappNumber`,
    ADD COLUMN `alternate_number` VARCHAR(191) NULL,
    ADD COLUMN `closing_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `facebook_number` VARCHAR(191) NULL,
    ADD COLUMN `instagram_number` VARCHAR(191) NULL,
    ADD COLUMN `map_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `opening_time` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `plain_password` VARCHAR(191) NOT NULL,
    ADD COLUMN `shop_code` VARCHAR(191) NOT NULL,
    ADD COLUMN `whatsapp_number` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `alternateNumber`,
    DROP COLUMN `cardNumber`,
    DROP COLUMN `cardType`,
    DROP COLUMN `createdAt`,
    DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `middleName`,
    DROP COLUMN `phoneNumber`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `alternate_number` VARCHAR(191) NULL,
    ADD COLUMN `card_number` VARCHAR(191) NULL,
    ADD COLUMN `card_type` VARCHAR(191) NULL,
    ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `first_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `last_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `middle_name` VARCHAR(191) NULL,
    ADD COLUMN `phone_number` VARCHAR(191) NOT NULL,
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Image_user_id_key` ON `Image`(`user_id`);

-- CreateIndex
CREATE UNIQUE INDEX `Image_shop_id_key` ON `Image`(`shop_id`);

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_shop_id_fkey` FOREIGN KEY (`shop_id`) REFERENCES `Shop`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
