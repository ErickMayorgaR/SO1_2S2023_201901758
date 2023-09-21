
CREATE DATABASE SO1Proyecto1;

USE SO1Proyecto1;

-- Crear la tabla "ram"
CREATE TABLE RAM (
    idRAM INT AUTO_INCREMENT PRIMARY KEY,
    porcentaje DOUBLE,
    fecha TIMESTAMP
);

-- Crear la tabla "CPU"
CREATE TABLE CPU (
    idCPU INT AUTO_INCREMENT PRIMARY KEY,
    porcentaje DOUBLE,
    fecha TIMESTAMP
);
