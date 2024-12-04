# Stage 1: Build the React app
FROM node:lts-alpine as build

WORKDIR /usr/src/app

# Copy package.json and lock files
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies (including dev dependencies for building the app)
RUN npm install --silent

# Copy the rest of the app
COPY . .

# Build the React app for production
RUN npm run build

# Stage 2: Serve the React app with a lightweight server
FROM nginx:alpine

# Copy the build folder from the previous stage to nginx's public directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the default port for nginx
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
