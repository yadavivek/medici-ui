FROM node:18 AS build
WORKDIR /
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

# Use a lightweight Node.js image to serve the app
FROM nginx:alpine

# Copy the React build output to the Nginx HTML directory
COPY build /usr/share/nginx/html


# Expose the default Nginx port
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]