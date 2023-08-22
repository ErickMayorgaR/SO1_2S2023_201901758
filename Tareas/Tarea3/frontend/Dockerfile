# Usamos la imagen base de Node.js
FROM node:14

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de código fuente al contenedor
COPY . .

# Instalamos las dependencias
RUN npm install

# Construimos la aplicación
RUN npm run build

# Expone el puerto en el que el servidor de desarrollo escucha
EXPOSE 3000

# Comando para ejecutar el servidor de desarrollo
CMD ["npm", "start"]
