# Usamos la imagen base de MySQL
FROM mysql:latest

# Variables de entorno para configurar la base de datos
ENV MYSQL_ROOT_PASSWORD=password
ENV MYSQL_DATABASE=SO1T3

# Copiamos los archivos SQL para inicializar la base de datos si es necesario
COPY database/init.sql /docker-entrypoint-initdb.d/
