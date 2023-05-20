-- CreateTable
CREATE TABLE `Veiculo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `placa` VARCHAR(7) NOT NULL,
    `rastreado` BOOLEAN NOT NULL,
    `comprimento` DOUBLE NOT NULL,
    `largura` DOUBLE NOT NULL,
    `altura` DOUBLE NOT NULL,
    `cubagem` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
