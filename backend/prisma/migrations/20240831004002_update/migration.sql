/*
  Warnings:

  - You are about to alter the column `status` on the `leavetype` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(4))`.

*/
-- AlterTable
ALTER TABLE `leavetype` MODIFY `status` ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active';
