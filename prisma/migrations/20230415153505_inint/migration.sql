-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(191) NOT NULL,
    `lastName` VARCHAR(191) NOT NULL,
    `middleName` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `alternateNumber` VARCHAR(191) NULL,
    `nationality` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `cardType` VARCHAR(191) NULL,
    `cardNumber` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('ADMIN', 'USER', 'SHOP_OWNER') NOT NULL,
    `level` ENUM('LEVEL_ONE', 'LEVEL_TWO', 'LEVEL_THREE', 'SUPER_USER') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Shop` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `alternateNumber` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `whatsappNumber` VARCHAR(191) NULL,
    `instagramHandle` VARCHAR(191) NULL,
    `facebookHandle` VARCHAR(191) NULL,
    `openingTime` VARCHAR(191) NOT NULL,
    `closingTime` VARCHAR(191) NOT NULL,
    `ownerId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Shop_ownerId_key`(`ownerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Branch` (
    `id` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `shopId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Image` (
    `id` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `secure_url` VARCHAR(191) NOT NULL,
    `productId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` LONGTEXT NOT NULL,
    `price` DOUBLE NOT NULL,
    `discountPercentage` DOUBLE NOT NULL DEFAULT 0,
    `stock` INTEGER NOT NULL DEFAULT 0,
    `brand` VARCHAR(191) NOT NULL,
    `category` ENUM('FOOD', 'FASHION_AND_WEARS', 'GROCERY_AND_GENERAL', 'HEALTH_AND_WELLNESS', 'HOME_AND_ELECTRICAL_APPLIANCES', 'PERSONAL_SERVICES', 'PRINTING_AND_STATIONERY', 'TECH') NOT NULL,
    `shopId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Shop` ADD CONSTRAINT `Shop_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Branch` ADD CONSTRAINT `Branch_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Image` ADD CONSTRAINT `Image_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_shopId_fkey` FOREIGN KEY (`shopId`) REFERENCES `Shop`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
