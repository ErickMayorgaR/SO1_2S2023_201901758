FROM node:18.17.1-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /my-app

# Creamos el directorio de proyecto en la raíz del contenedor
RUN mkdir /my-data

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