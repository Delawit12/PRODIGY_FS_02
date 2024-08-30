/*
  Warnings:

  - You are about to alter the column `status` on the `department` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `department` MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
