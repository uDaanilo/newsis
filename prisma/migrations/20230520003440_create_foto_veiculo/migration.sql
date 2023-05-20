-- CreateTable
CREATE TABLE `FotoVeiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `veiculo_id` INTEGER NOT NULL,
    `picture` LONGBLOB NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FotoVeiculo` ADD CONSTRAINT `FotoVeiculo_veiculo_id_fkey` FOREIGN KEY (`veiculo_id`) REFERENCES `Veiculo`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
