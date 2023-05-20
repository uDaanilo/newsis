/*
  Warnings:

  - You are about to drop the column `picture` on the `FotoVeiculo` table. All the data in the column will be lost.
  - Added the required column `foto` to the `FotoVeiculo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `FotoVeiculo` DROP COLUMN `picture`,
    ADD COLUMN `foto` LONGBLOB NOT NULL;
