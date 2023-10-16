FROM node:18.17.1-alpine

# Create a working directory
WORKDIR /app

# Copy the application files
COPY . .

# Install the dependencies
RUN npm install

# Build the application
RUN npm run build

# Start the application
CMD ["npm", "start"]
