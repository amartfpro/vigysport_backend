
# Usa una imagen de Node.js como base
FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración y dependencias
COPY package.json package-lock.json ./
# Instala las dependencias
RUN npm install

# Copia el código fuente
COPY . .

# Copia el código fuente
EXPOSE 3001

# Comando para iniciar el servicio
CMD ["npm", "run", "start"]
