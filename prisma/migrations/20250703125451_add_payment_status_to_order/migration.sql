-- AlterTable
ALTER TABLE `initiated_orders` ADD COLUMN `paymentStatus` ENUM('PENDING', 'PAID', 'FAILED') NOT NULL DEFAULT 'PENDING';
