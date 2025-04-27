# client/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .
RUN npm install --legacy-peer-deps

COPY . .

# Build the production version
RUN npm run build

# Run the production build
CMD ["npm", "run", "start"]