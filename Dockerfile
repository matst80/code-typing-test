FROM node:18-alpine as build-stage

WORKDIR /app

# Install dependencies
COPY client/package*.json ./
RUN npm ci

# Build
COPY client/. .
RUN npm run build

FROM node:18-alpine

# Create app directory

COPY --from=build-stage /app/dist /usr/src/app/build

WORKDIR /usr/src/app
COPY server/. .

RUN npm ci

EXPOSE 3030
CMD [ "node", "index.js" ]